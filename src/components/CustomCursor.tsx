import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);
  const hover = useMotionValue(0);

  const springX = useSpring(cx, { stiffness: 150, damping: 20, mass: 0.3 });
  const springY = useSpring(cy, { stiffness: 150, damping: 20, mass: 0.3 });
  const springHover = useSpring(hover, { stiffness: 200, damping: 25 });

  const ringScale = useTransform(springHover, [0, 1], [0.4, 1]);
  const ringOpacity = useTransform(springHover, [0, 1], [0.6, 0.2]);

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

    const els = "a, button, [data-cursor], input, textarea, select, label";

    const attach = () => {
      document.querySelectorAll(els).forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    attach();

    window.addEventListener("pointermove", onMove);

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    cleanupRef.current = () => {
      window.removeEventListener("pointermove", onMove);
      document.querySelectorAll(els).forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      observer.disconnect();
    };
  }, [cx, cy, dotX, dotY, hover]);

  useEffect(() => {
    setup();
    return () => cleanupRef.current?.();
  }, [setup]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 size-10 rounded-full border border-primary"
          style={{
            scale: ringScale,
            opacity: ringOpacity,
          }}
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
