import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent, MIN_NUM_OF_DAYS__MONTH } from "@/calendar/const";
import { MilestoneListForYear } from "@/calendar/GanttView/MonthlyMilestoneList";
import { endOfMonth, startOfMonth } from "@/calendar/helpers";
import { useEffect, useRef, useState } from "react";

export function MonthView({
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

  const getMonths = () => {
    const days: dayjs.Dayjs[] = [];
    let startDateOfView = dayjs(startOfMonth(startDate));
    let endDateOfView = dayjs(endOfMonth(endDate));

    const startEndDiff = endDateOfView.diff(startDateOfView, "day");
    if (startEndDiff < MIN_NUM_OF_DAYS__MONTH) {
      endDateOfView = dayjs(endDate)
        .add(MIN_NUM_OF_DAYS__MONTH - startEndDiff, "day")
        .endOf("week");
    }

    while (startDateOfView.isSameOrBefore(endDateOfView, "day")) {
      days.push(startDateOfView);
      startDateOfView = startDateOfView.add(1, "day");
    }

    return days.reduce((acc: Record<string, string[]>, day) => {
      const year = day.year();
      const month = day.format("MMM YYYY");

      if (!acc[year]) acc[year] = [];
      else if (!acc[year].includes(month)) {
        acc[year].push(month);
      }

      return acc;
    }, {});
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current?.clientWidth ?? 0);
    }
  }, [timelineGroups]);

  const groupedMonths = getMonths();
  const years = Object.keys(groupedMonths);
  const groups = Object.values(timelineGroups);

  // the diffs between the startDate of the first month and the startDate of first timeline of each brief
  const startDayOfQuarter = dayjs(startDate).startOf("month");
  const initialTimelineMarginLefts: Record<number, number> = {};

  groups.forEach((timelines, i) => {
    const createdAt = new Date(timelines[0].project.createdAt);
    createdAt.setHours(0, 0, 0, 0);

    initialTimelineMarginLefts[i] = Math.abs(
      startDayOfQuarter.diff(createdAt, "day")
    );
  });

  const monthWidth = 186;
  const months = Object.values(groupedMonths).flat();
  const firstM = dayjs(months[0], "MMM YYYY").startOf("month");
  const lastM = dayjs(months.at(-1), "MMM YYYY").endOf("month");
  const numOfDays = lastM.diff(firstM, "day");

  return (
    <Box h={"calc(100vh - 187px)"} pl={"4px"} overflow={"auto"}>
      <Box
        w={"fit-content"}
        ref={containerRef}
        borderLeft={"1px solid #CCCED2"}
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
              {groupedMonths[y]?.map((month, i) => (
                <Box
                  key={month}
                  flexShrink={0}
                  textAlign={"center"}
                  width={`${monthWidth}px`}
                  borderLeft={i !== 0 ? "1px solid #CCCED2" : undefined}
                >
                  {month}
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
          monthWidth={monthWidth}
          numOfDays={numOfDays}
          numOfMonths={months.length}
          initialTimelineMarginLeft={initialTimelineMarginLefts[i]}
        />
      ))}
    </Box>
  );
}
