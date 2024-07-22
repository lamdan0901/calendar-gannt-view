import { Box, BoxProps } from "@chakra-ui/react";
import { OwnerIcon } from "@/components/icons/OwnerIcon";
import { TaskDoneIcon } from "@/components/icons/TaskDoneIcon";
import { BriefEvent } from "@/calendar/const";
import { getTimelineStatus } from "@/calendar/helpers";

interface MileStoneCardProps extends BoxProps {
  event: BriefEvent;
  width?: string;
  height?: string;
  _status?: "not__started" | "final" | "complete" | "draft";
  index?: number;
}

function MileStoneCard({
  event,
  width = "397px",
  height = "178px",
  _status,
  index = 0,
  ...props
}: MileStoneCardProps) {
  const status = _status ?? getTimelineStatus(event.status);

  return (
    <Box
      width={width}
      height={height}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick?.(e);
      }}
      className={`milestone-card`}
      {...props}
    >
      <Box py={4} borderBottom={"1px solid #A6A9B0"}>
        <b>{event.project.name}</b>
      </Box>
      <Box mt={2} w={"100%"} h={"28px"} className={`event ${status}`}>
        <div style={{ lineHeight: "28px" }} className="event__title">
          {event.milestone}
        </div>
      </Box>
      <Box display={"flex"} alignItems={"center"} mt={2}>
        <TaskDoneIcon />
        <span>
          {event.owner.firstName} {event.owner.lastName}
        </span>
      </Box>
      <Box display={"flex"} alignItems={"center"} mt={2}>
        <OwnerIcon /> {event.progress}% Completed
      </Box>
    </Box>
  );
}

export default MileStoneCard;
