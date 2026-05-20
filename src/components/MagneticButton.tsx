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
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base = "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium overflow-hidden transition-all";
  const styles = variant === "primary"
    ? "bg-foreground text-background glow-shadow hover:shadow-[0_0_40px_-10px_oklch(0.68_0.16_162/0.6)]"
    : "glass text-foreground glow-border hover:shadow-[0_0_30px_-10px_oklch(0.68_0.16_162/0.4)]";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`${base} ${styles} ${className}`}
    >
      {/* Glow effect */}
      <motion.span
        className="absolute inset-0 -z-10 rounded-full bg-primary/50 blur-lg opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:translate-y-0" />
          {/* Shine effect */}
          <motion.span
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </>
      )}
    </motion.a>
  );
}
