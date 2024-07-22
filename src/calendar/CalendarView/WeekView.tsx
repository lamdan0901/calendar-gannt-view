import { Box } from "@chakra-ui/react";
import MileStone from "@/calendar/CalendarView/MileStone";
import { BriefEvent, daysArray } from "@/calendar/const";
import { addDays, formatDate, getDay, startOfWeek } from "../helpers";

interface DateInWeekProps {
  day: Date;
  isToday: boolean;
  dayEvents?: BriefEvent[];
  onClick: () => void;
}

const DateInWeek = ({
  day,
  isToday,
  dayEvents = [],
  onClick,
}: DateInWeekProps) => {
  return (
    <div className="day in-week" onClick={onClick}>
      <div className={`day__number ${isToday ? "today" : ""}`}>
        <span>{day.getDate()}</span>
      </div>
      <Box position={"relative"}>
        {dayEvents.map((event) => (
          <MileStone key={event.id} event={event} />
        ))}
      </Box>
    </div>
  );
};

interface WeekViewProps {
  date: Date;
  events?: BriefEvent[] | null;
  onDateClick: (date: Date) => void;
}

const WeekView = ({ date, events, onDateClick }: WeekViewProps) => {
  const start = startOfWeek(date);
  const today = formatDate(new Date());
  const currentDay = getDay(new Date());

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(start, i));
  }

  const renderDay = (day: Date) => {
    const dayEvents = events?.filter(
      (event) => formatDate(new Date(event.dueDate)) === formatDate(day)
    );
    const isToday = formatDate(day) === today;

    return (
      <DateInWeek
        key={day.toString()}
        day={day}
        isToday={isToday}
        dayEvents={dayEvents}
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
      <div className="week-view">{days.map((day) => renderDay(day))}</div>
    </Box>
  );
};

export default WeekView;
