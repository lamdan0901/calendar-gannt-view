import { useRef } from "react";
import { useRangeCalendarState } from "react-stately";
import { useRangeCalendar } from "react-aria";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./Button";
import { CalendarGrid } from "./CalendarGrid";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";
import { LOCALE } from "@/constants/common";
import dayjs from "dayjs";

export function RangeCalendar(props: any) {
  const state = useRangeCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale: LOCALE,
    createCalendar,
  });

  const ref = useRef(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(
    props,
    state,
    ref
  );
  const startMonth = dayjs(state.visibleRange.start.toString()).format(
    "MMMM YYYY"
  );
  const endMonth = dayjs(state.visibleRange.end.toString()).format("MMMM YYYY");

  return (
    <div {...calendarProps} ref={ref}>
      <Box display="flex" alignItems="center" paddingBottom="4">
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon w={6} h={6} />
        </CalendarButton>
        <Heading as="h2" size="sm" flex="1" textAlign="center" fontWeight={500}>
          {`${startMonth} - ${endMonth}`}
        </Heading>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon w={6} h={6} />
        </CalendarButton>
      </Box>
      <Box display="flex" gap="4">
        <Box>
          <CalendarGrid state={state} />
        </Box>
        <Box>
          <CalendarGrid state={state} offset={{ months: 1 }} />
        </Box>
      </Box>
    </div>
  );
}
