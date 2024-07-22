import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent } from "@/calendar/const";
import { MilestoneListForYear } from "@/calendar/GanttView/MonthlyMilestoneList";
import { endOfMonth, startOfMonth } from "@/calendar/helpers";
import { useEffect, useRef, useState } from "react";

export function MonthView({
  timelines,
  startDate,
  endDate,
}: {
  timelines?: BriefEvent[];
  startDate: Date;
  endDate: Date;
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getMonths = () => {
    if (!timelines || timelines.length === 0) return {};

    const days: dayjs.Dayjs[] = [];
    let startDateOfView = dayjs(startOfMonth(startDate));
    let endDateOfView = dayjs(endOfMonth(endDate));

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
  }, [timelines]);

  if (!timelines || timelines.length === 0) return null;

  const groupedMonths = getMonths();
  const years = Object.keys(groupedMonths);

  // the diff between the startDate of the first month and the startDate of first timeline
  const initialTimelineMarginLeft = dayjs(startDate).diff(
    startOfMonth(startDate),
    "day"
  );

  const monthWidth = 180;
  let startDateOfView = dayjs(startOfMonth(startDate));
  let endDateOfView = dayjs(endOfMonth(endDate));
  const numOfDays = endDateOfView.diff(startDateOfView, "day");
  const numOfMonths = Object.values(groupedMonths).flat().length;

  return (
    <Box h={"calc(100vh - 311px)"} overflow={"auto"}>
      <Box
        w={"fit-content"}
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

      <MilestoneListForYear
        timelines={timelines}
        containerWidth={containerWidth}
        monthWidth={monthWidth}
        numOfDays={numOfDays}
        numOfMonths={numOfMonths}
        initialTimelineMarginLeft={initialTimelineMarginLeft}
      />
    </Box>
  );
}
