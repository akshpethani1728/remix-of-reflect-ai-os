import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });
  const isHovering = useRef(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onHoverStart = () => { isHovering.current = true; };
    const onHoverEnd = () => { isHovering.current = false; };

    window.addEventListener("pointermove", move);

    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onHoverStart);
      el.addEventListener("mouseleave", onHoverEnd);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onHoverStart);
        el.removeEventListener("mouseleave", onHoverEnd);
        el.addEventListener("mouseenter", onHoverStart);
        el.addEventListener("mouseleave", onHoverEnd);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", move);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <div className="size-2 rounded-full bg-primary/70 mix-blend-difference" />
      </div>
    </motion.div>
  );
}
