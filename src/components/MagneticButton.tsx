import { motion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
};

export function MagneticButton({ children, variant = "primary", href = "#", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base = "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium overflow-hidden";
  const styles = variant === "primary"
    ? "bg-foreground text-background glow-shadow"
    : "glass text-foreground glow-border";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:translate-y-0" />
      )}
    </motion.a>
  );
}
