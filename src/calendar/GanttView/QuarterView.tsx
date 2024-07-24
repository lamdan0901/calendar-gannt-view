import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent, MIN_NUM_OF_DAYS__QUARTER } from "@/calendar/const";
import { MilestoneListForYear } from "@/calendar/GanttView/MonthlyMilestoneList";
import {
  endOfMonth,
  getFirstDayOfQuarter,
  getLastDayOfQuarter,
  startOfMonth,
} from "@/calendar/helpers";
import { useEffect, useRef, useState } from "react";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

export function QuarterView({
  timelineGroups,
  startDate,
  endDate,
}: {
  timelineGroups: Record<string, BriefEvent[]>;
  startDate: Date;
  endDate: Date;
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getQuarters = () => {
    const days: dayjs.Dayjs[] = [];
    let startDateOfView = dayjs(startOfMonth(startDate));
    let endDateOfView = dayjs(endOfMonth(endDate));

    const startEndDiff = endDateOfView.diff(startDateOfView, "day");
    if (startEndDiff < MIN_NUM_OF_DAYS__QUARTER) {
      endDateOfView = dayjs(endDate)
        .add(MIN_NUM_OF_DAYS__QUARTER - startEndDiff, "day")
        .endOf("week");
    }

    while (startDateOfView.isSameOrBefore(endDateOfView, "day")) {
      days.push(startDateOfView);
      startDateOfView = startDateOfView.add(1, "day");
    }

    return days.reduce((acc: Record<string, string[]>, day) => {
      const year = day.year();
      const quarter = `Q${day.quarter()}`;

      if (!acc[year]) acc[year] = [];
      else if (!acc[year].includes(quarter)) {
        acc[year].push(quarter);
      }

      return acc;
    }, {});
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current?.clientWidth ?? 0);
    }
  }, [timelineGroups]);

  const groupedQuarters = getQuarters();
  const years = Object.keys(groupedQuarters);
  const groups = Object.values(timelineGroups);

  // the diffs between the startDate of the first Quarter and the first Timeline of each brief
  const startDayOfQuarter = dayjs(startDate).startOf("quarter");
  const initialTimelineMarginLefts: Record<number, number> = {};

  groups.forEach((timelines, i) => {
    const createdAt = new Date(timelines[0].project.createdAt);
    createdAt.setHours(0, 0, 0, 0);

    initialTimelineMarginLefts[i] = Math.abs(
      startDayOfQuarter.diff(createdAt, "day")
    );
  });

  const quarterWidth = 265;
  const quarters = Object.values(groupedQuarters).flat();
  const firstQ = getFirstDayOfQuarter(years[0], Number(quarters[0].slice(1)));
  const lastQ = getLastDayOfQuarter(
    years.at(-1),
    Number(quarters.at(-1)?.slice(1))
  );
  const numOfDays = lastQ.diff(firstQ, "day");

  return (
    <Box h={"calc(100vh - 187px)"} pl={"6px"} overflow={"auto"}>
      <Box
        w={"fit-content"}
        borderLeft={"1px solid #CCCED2"}
        ref={containerRef}
        borderBlock={"1px solid #CCCED2"}
        display={"flex"}
      >
        {years?.map((y) => (
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            flexShrink={0}
            key={y}
            borderRight={"1px solid #CCCED2"}
          >
            <Box pt={"8px"}>{y}</Box>
            <Box
              borderTop={"1px solid #CCCED2"}
              display={"flex"}
              alignItems={"center"}
              mt={"8px"}
            >
              {groupedQuarters[y]?.map((q, i) => (
                <Box
                  key={q + i}
                  flexShrink={0}
                  textAlign={"center"}
                  width={`${quarterWidth}px`}
                  borderLeft={i !== 0 ? "1px solid #CCCED2" : undefined}
                >
                  {q}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {groups.map((timelines, i) => (
        <MilestoneListForYear
          key={i}
          timelines={timelines}
          containerWidth={containerWidth}
          monthWidth={quarterWidth}
          numOfDays={numOfDays}
          numOfMonths={quarters.length}
          initialTimelineMarginLeft={initialTimelineMarginLefts[i]}
        />
      ))}
    </Box>
  );
}
