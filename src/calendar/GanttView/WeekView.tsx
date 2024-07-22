import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent } from "@/calendar/const";
import { MilestoneList } from "@/calendar/GanttView/WeeklyMilestones";
import { endOfWeek, startOfWeek } from "@/calendar/helpers";

export function WeekView({
  timelines,
  startDate,
  endDate,
}: {
  timelines?: BriefEvent[];
  startDate: Date;
  endDate: Date;
}) {
  const getWeeks = () => {
    if (!timelines || timelines.length === 0) return {};

    const days: dayjs.Dayjs[] = [];
    let startDateOfView = dayjs(startOfWeek(startDate));
    let endDateOfView = dayjs(endOfWeek(endDate));

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
        const dateString = days[days.length - 1]?.toDate().toDateString() ?? "";
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

  if (!timelines || timelines.length === 0) return null;

  const weekWidth = 154;
  const daysPerWeek = 7;
  const dayWidth = weekWidth / daysPerWeek;

  const { months, weeks } = getWeeks();

  // the diff between the start of the week and the startDate of first timeline
  const startDayOfWeek = dayjs(startOfWeek(startDate));
  const initialTimelineMarginLeft = dayjs(startDate).diff(
    startDayOfWeek,
    "day"
  );

  return (
    <Box h={"calc(100vh - 311px)"} overflow={"auto"}>
      <Box w={"fit-content"} borderTop={"1px solid #CCCED2"} display={"flex"}>
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
            <Box py={"4px"}>{monthYear}</Box>
          </Box>
        ))}
      </Box>
      <Box
        w={"fit-content"}
        display={"flex"}
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

      <MilestoneList
        timelines={timelines}
        weeks={weeks ?? []}
        dayWidth={dayWidth}
        weekWidth={weekWidth}
        initialTimelineMarginLeft={initialTimelineMarginLeft}
      />
    </Box>
  );
}
