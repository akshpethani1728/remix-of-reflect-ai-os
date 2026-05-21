import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);
  const hover = useMotionValue(0);
  const click = useMotionValue(0);

  const springX = useSpring(cx, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(cy, { stiffness: 120, damping: 18, mass: 0.5 });
  const springHover = useSpring(hover, { stiffness: 150, damping: 15 });

  const cleanupRef = useRef<(() => void) | null>(null);

  const setup = useCallback(() => {
    const onMove = (e: PointerEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const enter = () => hover.set(1);
    const leave = () => hover.set(0);
    const down = () => click.set(1);
    const up = () => click.set(0);

    const els = "a, button, [data-cursor], input, textarea, select";

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.querySelectorAll(els).forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll(els).forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    cleanupRef.current = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      observer.disconnect();
    };
  }, [cx, cy, dotX, dotY, hover, click]);

  useEffect(() => {
    setup();
    return () => cleanupRef.current?.();
  }, [setup]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          width: springHover.get() ? 48 : 0,
          height: springHover.get() ? 48 : 0,
        } as any}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 size-12 rounded-full border border-primary/40"
          style={{
            scale: springHover.get() ? 1 : 0.3,
            opacity: springHover.get() ? 0.15 : 1,
          } as any}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: dotX, y: dotY }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="size-[3px] rounded-full bg-primary" />
        </div>
      </motion.div>
    </>
  );
}
