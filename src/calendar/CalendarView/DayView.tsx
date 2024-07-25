import { Button } from "@chakra-ui/react";
import { clone } from "lodash";
import MileStoneCard from "@/calendar/MileStoneCard";
import { BriefEvent } from "@/calendar/const";
import { useEffect, useMemo, useState } from "react";
import { formatDate, getDay } from "../helpers";

interface DayViewProps {
  date: Date;
  events?: BriefEvent[] | null;
}

const DayView = ({ date, events }: DayViewProps) => {
  const dateAndDay = getDay(date) + " " + date.getDate();
  const dayEvents = useMemo(
    () =>
      events?.filter(
        (event) => formatDate(new Date(event.dueDate)) === formatDate(date)
      ),
    [date, events]
  );

  const [shouldShowAll, setShouldShowAll] = useState(false);

  const milestones = clone(dayEvents)?.reduce((acc, event) => {
    if (!acc[event.projectId]) {
      acc[event.projectId] = [];
    }
    acc[event.projectId].push(event);
    return acc;
  }, {} as Record<string, BriefEvent[]>);

  const milestonesLength = Object.values(milestones ?? {}).length;
  const shouldHaveShowMore = milestonesLength > 3;

  // When dates are changed, reset show all state
  useEffect(() => {
    setShouldShowAll(false);
  }, [date]);

  return (
    <div className="day-view">
      <h2 className="day-view__heading">{dateAndDay}</h2>
      {Object.keys(milestones ?? {})
        .slice(0, shouldShowAll ? milestonesLength : 3)
        .map((projectId) => (
          <div key={projectId} className="day-view__content">
            {milestones?.[projectId].slice(0, 5).map((event) => (
              <MileStoneCard
                key={event.id}
                width="357px"
                height="196px"
                event={event}
                sx={{
                  cursor: "pointer",
                }}
              />
            ))}
            <Button
              sx={{
                position: "absolute",
                bottom: "-10px",
                left: "20px",
              }}
              variant={"link"}
            >
              View project plan
            </Button>
          </div>
        ))}

      <Button
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "16px",
          visibility: shouldHaveShowMore ? "visible" : "hidden",
        }}
        onClick={() => {
          setShouldShowAll(!shouldShowAll);
        }}
        variant={"link"}
      >
        {shouldShowAll ? "View less" : `+${milestonesLength - 3} More`}
      </Button>
    </div>
  );
};

export default DayView;
