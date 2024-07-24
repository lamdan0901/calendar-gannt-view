import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent, MIN_NUM_OF_DAYS__WEEK } from "@/calendar/const";
import { MilestoneList } from "@/calendar/GanttView/WeeklyMilestones";
import { endOfWeek, startOfWeek } from "@/calendar/helpers";

export function WeekView({
  timelineGroups,
  startDate,
  endDate,
}: {
  timelineGroups: Record<string, BriefEvent[]>;
  startDate: Date;
  endDate: Date;
}) {
  const getWeeks = () => {
    const days: dayjs.Dayjs[] = [];
    let startDateOfView = dayjs(startOfWeek(startDate));
    let endDateOfView = dayjs(endOfWeek(endDate));

    const startEndDiff = endDateOfView.diff(startDateOfView, "day");
    if (startEndDiff < MIN_NUM_OF_DAYS__WEEK) {
      endDateOfView = dayjs(endDate)
        .add(MIN_NUM_OF_DAYS__WEEK - startEndDiff, "day")
        .endOf("week");
    }

    while (startDateOfView.isSameOrBefore(endDateOfView, "day")) {
      days.push(startDateOfView);
      startDateOfView = startDateOfView.add(1, "day");
    }

    // Calculate days in weeks and months
    const months: Record<string, { month: number; monthWidth: number }> = {};
    const weeks: string[] = [];
    for (let i = 0; i < days.length; i += daysPerWeek) {
      const dateString = days[i].toDate().toDateString();
      const startDayOfWeek = dateString.slice(4, 10); //ex. 'Jul 16'
      const monthYear = dateString.slice(4, 7) + dateString.slice(10); //ex. 'Jul 2024'

      if (!months[monthYear]) {
        months[monthYear] = { month: days[i].month(), monthWidth: 0 };
      }
      weeks.push(startDayOfWeek);
    }
    // =======================================

    // Handle the case where the first and/or last weeks are also in different months
    const firstMonth = dayjs(startDate).month();
    const lastMonth = dayjs(endDate).month();

    if (firstMonth !== lastMonth && days.length > 0) {
      const hasFirstM = Object.values(months).some(
        (m) => m.month === firstMonth
      );
      const hasLastM = Object.values(months).some((m) => m.month === lastMonth);

      if (!hasFirstM) {
        const dateString = days[0].toDate().toDateString();
        const monthYear = dateString.slice(4, 7) + dateString.slice(10);
        months[monthYear] = { month: firstMonth, monthWidth: 0 };
      }
      if (!hasLastM) {
        const dateString = days.at(-1)?.toDate().toDateString() ?? "";
        const monthYear = dateString.slice(4, 7) + dateString.slice(10);
        months[monthYear] = { month: lastMonth, monthWidth: 0 };
      }
    }
    // =======================================

    // Calculate months's width
    Object.values(months).forEach((month) => {
      const numOfDays = days.filter((d) => d.month() === month.month).length;
      month.monthWidth = numOfDays * dayWidth;
    });

    return { months, weeks };
  };

  const weekWidth = 155;
  const daysPerWeek = 7;
  const dayWidth = weekWidth / daysPerWeek;

  const { months, weeks } = getWeeks();
  const groups = Object.values(timelineGroups);

  // the diffs between the start of the week and the startDate of first timeline of each brief
  const startDayOfWeek = startOfWeek(startDate);
  const initialTimelineMarginLefts: Record<number, number> = {};
  groups.forEach((timelines, i) => {
    const createdAt = new Date(timelines[0].project.createdAt);
    createdAt.setHours(0, 0, 0, 0);

    initialTimelineMarginLefts[i] = Math.abs(
      dayjs(createdAt).diff(startDayOfWeek, "day")
    );
  });

  return (
    <Box pl="8px" h={"calc(100vh - 187px)"} overflow={"auto"}>
      <Box
        borderLeft={"1px solid #CCCED2"}
        w={"fit-content"}
        borderTop={"1px solid #CCCED2"}
        display={"flex"}
      >
        {Object.keys(months ?? {}).map((monthYear) => (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            flexShrink={0}
            w={`${months?.[monthYear].monthWidth}px`}
            key={monthYear}
            borderRight={"1px solid #CCCED2"}
          >
            <Box textAlign={"center"} py={"4px"}>
              {monthYear}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        w={"fit-content"}
        display={"flex"}
        borderLeft={"1px solid #CCCED2"}
        borderBlock={"1px solid #CCCED2"}
        alignItems={"center"}
      >
        {weeks?.map((w) => (
          <Box
            key={w}
            flexShrink={0}
            textAlign={"center"}
            width={`${weekWidth}px`}
            borderRight="1px solid #CCCED2"
          >
            {w}
          </Box>
        ))}
      </Box>

      {groups.map((timelines, i) => (
        <MilestoneList
          key={i}
          timelines={timelines}
          weeks={weeks ?? []}
          dayWidth={dayWidth}
          weekWidth={weekWidth}
          initialTimelineMarginLeft={initialTimelineMarginLefts[i]}
        />
      ))}
    </Box>
  );
}
