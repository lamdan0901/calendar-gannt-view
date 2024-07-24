import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent, MIN_NUM_OF_DAYS__DAY } from "@/calendar/const";
import { MilestoneList } from "@/calendar/GanttView/WeeklyMilestones";
import { endOfWeek, getShortDay, startOfWeek } from "@/calendar/helpers";

export function DayView({
  timelineGroups,
  startDate,
  endDate,
}: {
  timelineGroups: Record<string, BriefEvent[]>;
  startDate: Date;
  endDate: Date;
}) {
  const getDays = () => {
    const days: dayjs.Dayjs[] = [];
    let startDateOfView = dayjs(startOfWeek(startDate));
    let endDateOfView = dayjs(endOfWeek(endDate));

    const startEndDiff = endDateOfView.diff(startDateOfView, "day");
    if (startEndDiff < MIN_NUM_OF_DAYS__DAY) {
      endDateOfView = dayjs(endDate)
        .add(MIN_NUM_OF_DAYS__DAY - startEndDiff, "day")
        .endOf("week");
    }
    if (endDateOfView.day() === 6) {
      endDateOfView = endDateOfView.add(1, "day");
    }

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

  const groupedDays = getDays();
  const weeks = Object.keys(groupedDays);
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

  const borderWidth = 1;
  const dayWidth = 33;
  const daysPerWeek = 7;
  const weekWidth = dayWidth * daysPerWeek + borderWidth;

  return (
    <Box h={"calc(100vh - 187px)"} pl="14px" overflow={"auto"}>
      <Box
        w={"fit-content"}
        borderLeft={"1px solid #CCCED2"}
        borderBlock={"1px solid #CCCED2"}
        display={"flex"}
      >
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

      {groups.map((timelines, i) => (
        <MilestoneList
          key={i}
          timelines={timelines}
          weeks={weeks}
          dayWidth={dayWidth}
          weekWidth={weekWidth}
          initialTimelineMarginLeft={initialTimelineMarginLefts[i]}
        />
      ))}
    </Box>
  );
}
