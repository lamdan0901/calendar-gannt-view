import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent } from "@/calendar/const";
import { MilestoneList } from "@/calendar/GanttView/WeeklyMilestones";
import { endOfWeek, getShortDay, startOfWeek } from "@/calendar/helpers";

export function DayView({
  timelines,
  startDate,
  endDate,
}: {
  timelines?: BriefEvent[];
  startDate: Date;
  endDate: Date;
}) {
  const getDays = () => {
    if (!timelines || timelines.length === 0) return {};

    const days: dayjs.Dayjs[] = [];
    let startDateOfView = dayjs(startOfWeek(startDate));
    let endDateOfView = dayjs(endOfWeek(endDate));

    while (startDateOfView.isSameOrBefore(endDateOfView, "day")) {
      days.push(startDateOfView);
      startDateOfView = startDateOfView.add(1, "day");
    }

    const groupedDays: Record<string, dayjs.Dayjs[]> = {};
    for (let i = 0; i < days.length; i += 7) {
      const startDayOfWeek = days[i].toDate().toDateString().slice(4); //ex. 'Jul 16 2024'
      groupedDays[startDayOfWeek] = days.slice(i, i + 7);
    }

    return groupedDays;
  };

  if (!timelines || timelines.length === 0) return null;

  const groupedDays = getDays();
  const weeks = Object.keys(groupedDays);

  // the diff between the start of the week and the startDate of first timeline
  const startDayOfWeek = dayjs(startOfWeek(startDate));
  const initialTimelineMarginLeft = dayjs(startDate).diff(
    startDayOfWeek,
    "day"
  );

  const borderWidth = 1;
  const dayWidth = 36;
  const daysPerWeek = 7;
  const weekWidth = dayWidth * daysPerWeek + borderWidth;

  return (
    <Box h={"calc(100vh - 311px)"} overflow={"auto"}>
      <Box w={"fit-content"} borderBlock={"1px solid #CCCED2"} display={"flex"}>
        {weeks?.map((w) => (
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            flexShrink={0}
            w={`${weekWidth}px`}
            key={w}
            borderRight={"1px solid #CCCED2"}
          >
            <Box pt={"8px"}>{w}</Box>
            <Box
              borderTop={"1px solid #CCCED2"}
              display={"flex"}
              alignItems={"center"}
              mt={"8px"}
            >
              {groupedDays[w]?.map((day, i) => (
                <Box
                  key={day.toISOString()}
                  flexShrink={0}
                  textAlign={"center"}
                  width={`${dayWidth}px`}
                  bgColor={
                    day.day() === 0
                      ? "#FFF4EB"
                      : day.day() === 6
                      ? "#E8F7FF"
                      : undefined
                  }
                  borderLeft={i !== 0 ? "1px solid #CCCED2" : undefined}
                >
                  {getShortDay(day.toDate())}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <MilestoneList
        timelines={timelines}
        weeks={weeks}
        dayWidth={dayWidth}
        weekWidth={weekWidth}
        initialTimelineMarginLeft={initialTimelineMarginLeft}
      />
    </Box>
  );
}
