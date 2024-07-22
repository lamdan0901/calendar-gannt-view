import { NotAllowedIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  FormLabel,
  HStack,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import {
  endOfMonth,
  endOfWeek,
  getLocalTimeZone,
  isSameDay,
  startOfMonth,
  startOfWeek,
  today as iToday,
} from "@internationalized/date";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { LOCALE } from "@/constants/common";
import { useRef, useState } from "react";
import { useDateRangePicker } from "react-aria";
import {
  DateRangePickerStateOptions,
  useDateRangePickerState,
} from "react-stately";
import { FieldButton } from "./Button";
import { DateField, StyledField } from "./DateField";
import { RangeCalendar } from "./RangeCalendar";

interface DateRangePickerProps extends DateRangePickerStateOptions {
  size?: "md" | "lg";
  showLabel?: boolean;
}

export function DateRangePicker({
  size,
  showLabel = true,
  ...props
}: DateRangePickerProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const state = useDateRangePickerState({
    ...props,
    shouldCloseOnSelect: true,
  });
  const ref = useRef(null);
  const {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref);

  const today = iToday(getLocalTimeZone());

  const ranges = [
    {
      label: "Today",
      start: today,
      end: today,
    },
    {
      label: "Yesterday",
      start: today.subtract({ days: 1 }),
      end: today.subtract({ days: 1 }),
    },
    {
      label: "This Week",
      start: startOfWeek(today, LOCALE),
      end: endOfWeek(today, LOCALE),
    },
    {
      label: "Last Week",
      start: startOfWeek(today.subtract({ weeks: 1 }), LOCALE),
      end: endOfWeek(today.subtract({ weeks: 1 }), LOCALE),
    },
    {
      label: "This Month",
      start: startOfMonth(today),
      end: endOfMonth(today),
    },
    {
      label: "Last Month",
      start: startOfMonth(today.subtract({ months: 1 })),
      end: endOfMonth(today.subtract({ months: 1 })),
    },
  ];

  const handleClear = () => {
    state.setValue({ start: null as any, end: null as any });
    state.setOpen(false);
  };

  const getActiveRangeStyle = (item: (typeof ranges)[0]): ButtonProps => {
    try {
      return isSameDay(item?.start, state.value?.start) &&
        isSameDay(item?.end, state.value?.end)
        ? { bg: "orange.100" }
        : {};
    } catch (error) {
      return {};
    }
  };

  return (
    <Box position="relative" display="inline-flex" flexDirection="column">
      {showLabel && <FormLabel {...labelProps}>{props.label}</FormLabel>}
      <InputGroup
        {...groupProps}
        ref={ref}
        width="auto"
        onBlur={() => setIsInputFocused(false)}
        onFocus={() => setIsInputFocused(true)}
        display="inline-flex"
        position="relative"
      >
        <StyledField minW="255px" h={size === "md" ? "40px" : "50px"}>
          <DateField {...startFieldProps} />
          {(state.dateRange || isInputFocused || state.isOpen) && (
            <Box as="span" aria-hidden="true" paddingX="1.5" color="#6D6D6D">
              –
            </Box>
          )}
          <DateField {...endFieldProps} />
          {!state.dateRange && !isInputFocused && !state.isOpen && (
            <Box
              style={{
                position: "absolute",
                left: "16px",
                backgroundColor: "white",
                color: "#6D6D6D",
                pointerEvents: "none",
                width: "80%",
              }}
            >
              Created Date
            </Box>
          )}
          <Spacer />
          {state.validationState === "invalid" && (
            <NotAllowedIcon color="red.600" position="absolute" right="12" />
          )}
          <FieldButton
            {...buttonProps}
            cProps={{ pointerEvents: state.isOpen ? "none" : undefined }}
          >
            <CalendarIcon boxSize="5" />
          </FieldButton>
        </StyledField>
      </InputGroup>
      <Popover
        isLazy
        returnFocusOnClose={false}
        isOpen={state.isOpen}
        onClose={() => state.setOpen(false)}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <Box />
        </PopoverTrigger>
        <PopoverContent minW="max-content">
          <PopoverBody p={3}>
            <HStack spacing={0}>
              <VStack
                borderRightWidth="1px"
                pr={3}
                mr={3}
                alignItems="flex-start"
              >
                <ButtonGroup
                  variant="ghost"
                  size="sm"
                  colorScheme="gray"
                  color="gray.900"
                >
                  <VStack alignItems="stretch" spacing={0.5}>
                    {ranges.map((item) => (
                      <Button
                        key={item.label}
                        fontWeight={400}
                        justifyContent="flex-start"
                        onClick={() => {
                          state.setValue({
                            start: item.start,
                            end: item.end,
                          });
                          state.setOpen(false);
                        }}
                        colorScheme="orange"
                        color="gray.900"
                        {...getActiveRangeStyle(item)}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </VStack>
                </ButtonGroup>
                <Spacer />
                <Button
                  mt={2}
                  size="sm"
                  variant="ghost"
                  display="flex"
                  justifyContent="space-between"
                  onClick={handleClear}
                  fontWeight={500}
                  w="full"
                >
                  Clear
                </Button>
              </VStack>
              <RangeCalendar {...calendarProps} />
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
