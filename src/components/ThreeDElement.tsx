import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ThreeDOrbitalRings() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ rotateY, scale }}
        className="relative size-[500px] md:size-[700px]"
      >
        <div
          className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[oklch(0.62_0.2_230/0.08)]"
          style={{ transformStyle: "preserve-3d", transform: "translate(-50%, -50%) rotateX(65deg)" }}
        >
          <div className="absolute inset-0 rounded-full border border-[oklch(0.62_0.2_230/0.04)] animate-rotate-ring" />
          <div className="absolute inset-[15%] rounded-full border border-[oklch(0.62_0.2_230/0.06)] animate-rotate-ring-reverse" />
          <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-sm" />
        </div>
      </motion.div>
    </div>
  );
}
