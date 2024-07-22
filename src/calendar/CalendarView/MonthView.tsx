import { Box } from "@chakra-ui/react";
import { clone } from "lodash";
import { BriefEvent, daysArray } from "@/calendar/const";
import MileStone from "@/calendar/CalendarView/MileStone";
import { useState } from "react";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  formatDate,
  getDay,
  startOfMonth,
  startOfWeek,
} from "../helpers";

interface DateInMonthProps {
  day: Date;
  isToday: boolean;
  dayEvents?: BriefEvent[];
  isCurrentMonth: boolean;
  onClick: () => void;
}

const DateInMonth = ({
  day,
  isToday,
  dayEvents = [],
  isCurrentMonth,
  onClick,
}: DateInMonthProps) => {
  const [showAll, setShowAll] = useState(false);
  const shouldShowMore = dayEvents.length > 4;

  return (
    <div
      onClick={onClick}
      className={`day ${isCurrentMonth ? "" : "not-current-month"} ${
        shouldShowMore ? " with-show__more" : ""
      }`}
    >
      <div className={`day__number ${isToday ? "today" : ""}`}>
        <span>{day.getDate()}</span>
      </div>
      <Box position={"relative"}>
        <Box overflowX={"hidden"} maxH={"145px"}>
          {dayEvents.slice(0, showAll ? dayEvents.length : 4).map((event) => (
            <MileStone key={event.id} event={event} />
          ))}
        </Box>
        {shouldShowMore && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAll(!showAll);
            }}
            className="toggle-events"
          >
            {showAll ? "View less" : `+ ${dayEvents.length - 4} More`}
          </button>
        )}
      </Box>
    </div>
  );
};

interface MonthViewProps {
  date: Date;
  events?: BriefEvent[] | null;
  onDateClick: (date: Date) => void;
}

const MonthView = ({ date, events, onDateClick }: MonthViewProps) => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  const currentMonth = date.getMonth();
  const today = formatDate(new Date());
  const currentDay = getDay(new Date());

  const days = [];
  let day = start;

  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const renderDay = (day: Date) => {
    const dayEvents = clone(events)?.filter(
      (event) => formatDate(new Date(event.dueDate)) === formatDate(day)
    );
    const isCurrentMonth = day.getMonth() === currentMonth;
    const isToday = formatDate(day) === today;

    return (
      <DateInMonth
        key={day.toString()}
        day={day}
        isToday={isToday}
        dayEvents={dayEvents}
        isCurrentMonth={isCurrentMonth}
        onClick={() => {
          onDateClick(day);
        }}
      />
    );
  };

  return (
    <Box mb={8}>
      <div className="week__list">
        <div className="week__list-content">
          {daysArray.map((day) => (
            <div
              key={day}
              className={`${currentDay === day ? "today" : ""} week__list-day`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="month-view">
        {weeks.map((week, i) => (
          <div key={i} className="week">
            {week.map((day) => renderDay(day))}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default MonthView;
