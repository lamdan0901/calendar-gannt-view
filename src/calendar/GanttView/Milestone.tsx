import { Box } from "@chakra-ui/react";
import MileStoneCard from "@/calendar/MileStoneCard";
import Tooltip from "@/calendar/Tooltip";
import { BriefEvent } from "@/calendar/const";
import { getTimelineStatus } from "@/calendar/helpers";
import { useRef, useState } from "react";

function MileStone({ timeline }: { timeline: BriefEvent }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<DOMRect | undefined>(
    undefined
  );
  const itemRef = useRef<HTMLDivElement>(null);
  const status = getTimelineStatus(timeline.status);

  const handleMouseEnter = () => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPosition(rect);
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <Box
        ml={`${timeline.marginLeft}px !important`}
        key={timeline.id}
        position={"relative"}
        w={"auto"}
        height={"28px"}
        overflow={"hidden"}
      >
        <Box
          width={`${timeline.width}px`}
          position={"absolute"}
          className={`event ${status}`}
          height={"28px"}
          left={0}
          top={0}
          mt={0}
        ></Box>
        <Box
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "100%",
          }}
          position={"absolute"}
          className={`timeline ${status} text`}
          pl={"8px"}
          left={0}
          top={"2px"}
        >
          {timeline.milestone}
        </Box>

        <Box
          width={`${timeline.width}px`}
          position={"absolute"}
          className={`event`}
          bg={"transparent"}
          height={"28px"}
          ref={itemRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          left={0}
          top={0}
          mt={0}
        ></Box>
      </Box>

      {showTooltip && (
        <Tooltip position={tooltipPosition}>
          <MileStoneCard event={timeline} _status={status} />
        </Tooltip>
      )}
    </>
  );
}

export default MileStone;
