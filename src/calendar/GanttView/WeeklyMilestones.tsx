import { Divider, Stack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent } from "@/calendar/const";
import MileStone from "@/calendar/GanttView/Milestone";

interface MilestoneListProps {
  timelines: BriefEvent[];
  weeks: string[];
  dayWidth: number;
  weekWidth: number;
  initialTimelineMarginLeft: number;
}

export function MilestoneList({
  timelines,
  weeks,
  dayWidth,
  weekWidth = 0,
  initialTimelineMarginLeft,
}: MilestoneListProps) {
  const borderWidth = 1;
  const amountOfWeeks = weeks.length;
  let accTimelineWidth = initialTimelineMarginLeft * dayWidth;
  const timelinesHavingStartDateEqualToDueDate: BriefEvent[] = [];

  const calculatedTimelines = timelines?.map((t) => {
    const dueDate = new Date(t.dueDate).setHours(0, 0, 0, 0);
    const startDate = new Date(t.startDate).setHours(0, 0, 0, 0);
    if (t.dueDate === t.startDate) {
      timelinesHavingStartDateEqualToDueDate.push(t);
    }

    const marginLeft = accTimelineWidth;
    const width = dayjs(dueDate).diff(dayjs(startDate), "day") * dayWidth;
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
      w={`${weekWidth * amountOfWeeks}px`}
      pl={`${dayWidth / 2}px`}
      py={"8px"}
      position={"relative"}
      borderLeft={"1px solid #CCCED2"}
      borderBottom={"1px solid #0000001c"}
    >
      {calculatedTimelines?.map((timeline) => (
        <MileStone key={timeline.id} timeline={timeline} />
      ))}
      {weeks?.map((w, i) => (
        <Divider
          orientation="vertical"
          style={{
            position: "absolute",
            margin: 0,
            top: 0,
            zIndex: -1,
            left: weekWidth * (i + 1) - borderWidth,
          }}
          key={w}
        />
      ))}
    </Stack>
  );
}
