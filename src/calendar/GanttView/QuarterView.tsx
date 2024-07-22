import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BriefEvent } from "@/calendar/const";
import { MilestoneListForYear } from "@/calendar/GanttView/MonthlyMilestoneList";
import { endOfMonth, startOfMonth } from "@/calendar/helpers";
import { useEffect, useRef, useState } from "react";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

export function QuarterView({
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

  const getQuarters = () => {
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
  }, [timelines]);

  if (!timelines || timelines.length === 0) return null;

  const groupedQuarters = getQuarters();
  const years = Object.keys(groupedQuarters);

  // the diff between the startDates of the first Quarter and the first Timeline
  const initialTimelineMarginLeft = dayjs(startDate).diff(
    dayjs(startDate).startOf("quarter").toDate(),
    "day"
  );

  const quarterWidth = 260;
  let startDateOfView = dayjs(startDate).startOf("quarter");
  let endDateOfView = dayjs(endDate).endOf("quarter");
  const numOfDays = endDateOfView.diff(startDateOfView, "day");
  const numOfQuarters = Object.values(groupedQuarters).flat().length;

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

      <MilestoneListForYear
        timelines={timelines}
        containerWidth={containerWidth}
        monthWidth={quarterWidth}
        numOfDays={numOfDays}
        numOfMonths={numOfQuarters}
        initialTimelineMarginLeft={initialTimelineMarginLeft}
      />
    </Box>
  );
}
