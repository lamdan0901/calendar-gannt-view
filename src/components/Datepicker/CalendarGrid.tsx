import { useCalendarGrid } from "react-aria";
import { getWeeksInMonth, endOfMonth } from "@internationalized/date";
import { CalendarCell } from "./CalendarCell";
import { chakra } from "@chakra-ui/react";
import { CalendarState, RangeCalendarState } from "react-stately";
import { range } from "lodash";
import { LOCALE } from "@/constants/common";
import dayjs from "dayjs";

export function CalendarGrid({
  state,
  offset = {},
}: {
  state: CalendarState | RangeCalendarState;
  offset?: any;
}) {
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  const { gridProps, headerProps } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state
  );

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, LOCALE);
  const weekDays = dayjs.weekdaysMin();

  return (
    <chakra.table {...gridProps}>
      <chakra.thead {...headerProps}>
        <chakra.tr _hover={{}}>
          {weekDays.map((day, index) => (
            <chakra.td
              key={index}
              textAlign="center"
              color="gray.500"
              fontSize="sm"
            >
              {day.split("")[0]}
            </chakra.td>
          ))}
        </chakra.tr>
      </chakra.thead>
      <chakra.tbody>
        {range(0, weeksInMonth).map((weekIndex) => (
          <chakra.tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    currentMonth={startDate}
                  />
                ) : (
                  <chakra.td key={i} m={0} w={8} maxW={8} />
                )
              )}
          </chakra.tr>
        ))}
      </chakra.tbody>
    </chakra.table>
  );
}
