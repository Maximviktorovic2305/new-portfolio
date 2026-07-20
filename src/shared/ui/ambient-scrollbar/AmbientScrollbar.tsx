import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

interface ScrollMetrics {
  height: number;
  scrollable: boolean;
  top: number;
}

const initialMetrics: ScrollMetrics = { height: 0, scrollable: false, top: 0 };

export function AmbientScrollbar() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [isVisible, setIsVisible] = useState(false);
  const metricsRef = useRef(metrics);
  const hideTimerRef = useRef<number | undefined>(undefined);
  const dragRef = useRef<{ clientY: number; scrollY: number } | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current !== undefined) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = undefined;
    }
  }, []);

  const showTemporarily = useCallback(() => {
    clearHideTimer();
    setIsVisible(true);
    hideTimerRef.current = window.setTimeout(() => setIsVisible(false), 900);
  }, [clearHideTimer]);

  const updateMetrics = useCallback(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollRange = Math.max(documentHeight - viewportHeight, 0);
    const height = Math.max(42, (viewportHeight / Math.max(documentHeight, 1)) * viewportHeight);
    const availableTrack = Math.max(viewportHeight - height, 0);
    const top = scrollRange > 0 ? (window.scrollY / scrollRange) * availableTrack : 0;
    const next = { height, scrollable: scrollRange > 0, top };
    metricsRef.current = next;
    setMetrics(next);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      updateMetrics();
      showTemporarily();
    };
    const initialFrame = window.requestAnimationFrame(updateMetrics);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMetrics, { passive: true });
    return () => {
      clearHideTimer();
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMetrics);
      document.documentElement.classList.remove("ambient-scrollbar-dragging");
    };
  }, [clearHideTimer, showTemporarily, updateMetrics]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    clearHideTimer();
    setIsVisible(true);
    dragRef.current = { clientY: event.clientY, scrollY: window.scrollY };
    event.currentTarget.setPointerCapture(event.pointerId);
    document.documentElement.classList.add("ambient-scrollbar-dragging");
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollRange = Math.max(documentHeight - viewportHeight, 0);
    const availableTrack = Math.max(viewportHeight - metricsRef.current.height, 1);
    const delta = event.clientY - dragRef.current.clientY;
    window.scrollTo({ top: dragRef.current.scrollY + (delta / availableTrack) * scrollRange });
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    document.documentElement.classList.remove("ambient-scrollbar-dragging");
    showTemporarily();
  };

  return (
    <div
      aria-hidden="true"
      className={`ambient-scrollbar${isVisible && metrics.scrollable ? " ambient-scrollbar--visible" : ""}`}
      onPointerEnter={() => {
        clearHideTimer();
        setIsVisible(true);
      }}
      onPointerLeave={showTemporarily}
    >
      <div
        className="ambient-scrollbar__thumb"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerCancel={handlePointerUp}
        onPointerUp={handlePointerUp}
        style={{ height: metrics.height, transform: `translateY(${metrics.top}px)` }}
      />
    </div>
  );
}
