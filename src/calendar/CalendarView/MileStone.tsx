import MileStoneCard from "@/calendar/MileStoneCard";
import Tooltip from "@/calendar/Tooltip";
import { BriefEvent } from "@/calendar/const";
import { getTimelineStatus } from "@/calendar/helpers";
import { useRef, useState } from "react";

function MileStone({ event }: { event: BriefEvent }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<DOMRect | undefined>(
    undefined
  );
  const itemRef = useRef<HTMLDivElement>(null);
  const status = getTimelineStatus(event.status);

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
      <div onClick={(e) => e.stopPropagation()}>
        <div
          ref={itemRef}
          className={`event ${status}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="event__title"> {event.milestone}</div>
        </div>
      </div>
      {showTooltip && (
        <Tooltip position={tooltipPosition}>
          <MileStoneCard event={event} _status={status} />
        </Tooltip>
      )}
    </>
  );
}

export default MileStone;
