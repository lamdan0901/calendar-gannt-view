import { Divider, Stack } from "@chakra-ui/react";
import { BriefEvent } from "@/calendar/const";
import MileStone from "@/calendar/GanttView/Milestone";
import dayjs from "dayjs";

interface MilestoneListProps {
  timelines: BriefEvent[];
  initialTimelineMarginLeft: number;
  containerWidth: number;
  numOfDays: number;
  numOfMonths: number;
  monthWidth: number;
}

export function MilestoneListForYear({
  timelines,
  initialTimelineMarginLeft,
  containerWidth,
  monthWidth,
  numOfDays,
  numOfMonths,
}: MilestoneListProps) {
  const dayWidthPadding = 0.25;
  const dayWidth = containerWidth / numOfDays;
  let accTimelineWidth = initialTimelineMarginLeft * dayWidth;
  const timelinesHavingStartDateEqualToDueDate: BriefEvent[] = [];

  const calculatedTimelines = timelines?.map((t) => {
    const dueDate = new Date(t.dueDate).setHours(0, 0, 0, 0);
    const startDate = new Date(t.startDate).setHours(0, 0, 0, 0);
    if (t.dueDate === t.startDate) {
      timelinesHavingStartDateEqualToDueDate.push(t);
    }

    const marginLeft = accTimelineWidth;
    const width =
      dayjs(dueDate).diff(dayjs(startDate), "day") * dayWidth - dayWidthPadding;
    accTimelineWidth += width;

    return {
      ...t,
      width,
      marginLeft,
    };
  });

  timelinesHavingStartDateEqualToDueDate.forEach((tl) => {
    const timelinesHavingTheSameStartDate = calculatedTimelines.filter(
      (t) => t.startDate === tl.startDate
    );
    const commonWidth = Math.max(
      ...timelinesHavingTheSameStartDate.map((t) => t.width)
    );
    timelinesHavingTheSameStartDate.forEach((t) => {
      t.width = commonWidth;
    });
  });

  return (
    <Stack
      w={`${containerWidth}px`}
      pl={`${dayWidth / 2}px`}
      py={"8px"}
      borderLeft={"1px solid #CCCED2"}
      position={"relative"}
      borderBottom={"1px solid #0000001c"}
    >
      {calculatedTimelines?.map((timeline) => (
        <MileStone key={timeline.id} timeline={timeline} />
      ))}
      {Array.from({ length: numOfMonths }).map((_, i) => (
        <Divider
          orientation="vertical"
          style={{
            position: "absolute",
            margin: 0,
            top: 0,
            zIndex: -1,
            left: monthWidth * (i + 1),
          }}
          key={i}
        />
      ))}
    </Stack>
  );
}
