import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ThreeDOrbitalRings() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 1.1, 0.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.7, 0.7, 0.3]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ rotateY, scale, opacity }}
        className="relative size-[500px] md:size-[800px]"
      >
        {/* Outer ring */}
        <div
          className="absolute left-1/2 top-1/2 size-[90%] -translate-x-1/2 -translate-y-1/2"
          style={{ transformStyle: "preserve-3d", perspective: "600px" }}
        >
          <div className="absolute inset-0 rounded-full border border-[oklch(0.62_0.2_230/0.06)] animate-rotate-ring" />
          <div className="absolute inset-[8%] rounded-full border border-[oklch(0.62_0.2_230/0.04)] animate-rotate-ring-reverse" />
          <div className="absolute inset-[25%] rounded-full border border-[oklch(0.62_0.2_230/0.03)] animate-rotate-ring" style={{ animationDuration: "25s" }} />
        </div>

        {/* Inner orbital dots */}
        <div className="absolute left-1/2 top-1/2 size-1/3 -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const r = 50;
            return (
              <motion.div
                key={i}
                className="absolute size-1.5 rounded-full bg-primary/30"
                style={{
                  left: `calc(50% + ${r * Math.cos(angle)}% )`,
                  top: `calc(50% + ${r * Math.sin(angle)}% )`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* Outer glow dots */}
        <div className="absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const r = 50;
            return (
              <motion.div
                key={i}
                className="absolute size-1 rounded-full bg-primary/15"
                style={{
                  left: `calc(50% + ${r * Math.cos(angle)}% )`,
                  top: `calc(50% + ${r * Math.sin(angle)}% )`,
                }}
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-xl" />
      </motion.div>
    </div>
  );
}
