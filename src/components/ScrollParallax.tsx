import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function ParallaxUp({ children, speed = 0.15, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 80, speed * -80]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxRotate({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <motion.div ref={ref} style={{ rotateX: rotate }} className={`[perspective:800px] ${className}`}>
      {children}
    </motion.div>
  );
}
