import {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

const Tooltip = ({
  children,
  position,
}: {
  children: ReactNode;
  position: DOMRect | undefined;
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const leftPadding = 25;
  const rightPadding = 15;
  const topPadding = 15;
  const bottomPadding = 50;

  const calculatePosition = useCallback(() => {
    if (!tooltipRef.current || !position) return;

    const { top, left, width } = position;
    const scrollY = window.scrollY || window.pageYOffset;
    const tooltipHeight = tooltipRef.current.offsetHeight;
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;

    // Initial position
    let tooltipTop = top + scrollY - tooltipHeight - topPadding;
    let tooltipLeft = left + width / 2 - tooltipWidth / 2;

    // Prevent tooltip from overflowing the left or right side of the viewport
    if (tooltipLeft + tooltipWidth > viewportWidth) {
      tooltipLeft = viewportWidth - tooltipWidth - leftPadding;
    } else if (tooltipLeft < rightPadding) {
      tooltipLeft = rightPadding;
    }

    // Prevent tooltip from overflowing the top side of the viewport
    if (tooltipTop < scrollY) {
      tooltipTop += tooltipHeight + bottomPadding;
    }

    setCoords({
      top: tooltipTop,
      left: tooltipLeft,
    });
  }, [position]);

  useLayoutEffect(() => {
    calculatePosition();
  }, [calculatePosition]);

  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        zIndex: 1000,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default Tooltip;
