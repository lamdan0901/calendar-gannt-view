import { NotAllowedIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { useRef } from "react";
import { useDatePicker } from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { FieldButton } from "./Button";
import { Calendar } from "./Calendar";
import { DateField, StyledField } from "./DateField";

export interface DatePickerProps extends DatePickerStateOptions<CalendarDate> {
  error?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  placeholder?: string;
  containerProps?: BoxProps;
  minW?: string;
}

export function DatePicker({
  error,
  size = "lg",
  showLabel = true,
  placeholder,
  containerProps,
  minW,
  ...props
}: DatePickerProps) {
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: true,
  });
  const ref = useRef(null);
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(props, state, ref);

  const handleClear = () => {
    state.setValue(null as any);
    state.setOpen(false);
  };

  const handleSelectToday = () => {
    state.setValue(today(getLocalTimeZone()));
    state.setOpen(false);
  };

  return (
    <Box
      position="relative"
      display="inline-flex"
      flexDirection="column"
      w="full"
      {...containerProps}
    >
      {showLabel && <FormLabel {...labelProps}>{props.label}</FormLabel>}
      <InputGroup {...groupProps} ref={ref} width="auto">
        <StyledField
          minW={minW ?? (size === "sm" ? "200px" : "250px")}
          w="full"
          aria-invalid={!!error}
          h={size === "sm" ? "40px" : "50px"}
        >
          <DateField
            {...fieldProps}
            disabled={props.isDisabled}
            placeholder={placeholder}
          />
          {state.validationState === "invalid" && (
            <NotAllowedIcon color="red.600" position="absolute" right="12" />
          )}
          <FieldButton
            isDisabled={props.isDisabled}
            {...buttonProps}
            cProps={{ pointerEvents: state.isOpen ? "none" : undefined }}
          >
            <CalendarIcon boxSize="5" />
          </FieldButton>
        </StyledField>
      </InputGroup>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
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
        <PopoverContent maxW="fit-content">
          <PopoverBody p={3}>
            <Calendar {...calendarProps} />
            <ButtonGroup
              mt={2}
              size="sm"
              variant="ghost"
              display="flex"
              justifyContent="space-between"
            >
              <Button fontWeight={500} onClick={handleClear}>
                Clear
              </Button>
              <Button fontWeight={500} onClick={handleSelectToday}>
                Today
              </Button>
            </ButtonGroup>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
