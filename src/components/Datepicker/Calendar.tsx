import { useCalendarState } from 'react-stately';
import { useCalendar } from 'react-aria';
import { createCalendar } from '@internationalized/date';
import { CalendarButton } from './Button';
import { CalendarGrid } from './CalendarGrid';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Heading } from '@chakra-ui/react';
import { LOCALE } from '@/constants/common';
import dayjs from 'dayjs';

export function Calendar(props: any) {
  const state = useCalendarState({
    ...props,
    locale: LOCALE,
    createCalendar,
  });

  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
  );
  const month = dayjs(state.visibleRange.start.toString()).format('MMMM YYYY');

  return (
    <div {...calendarProps}>
      <Box display="flex" alignItems="center" paddingBottom="4">
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon w={6} h={6} />
        </CalendarButton>
        <Heading as="h2" size="sm" flex="1" textAlign="center" fontWeight={500}>
          {month}
        </Heading>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon w={6} h={6} />
        </CalendarButton>
      </Box>
      <CalendarGrid state={state} />
    </div>
  );
}
