import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed left-1/2 top-3 z-40 w-[min(92%,1080px)] -translate-x-1/2"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "oklch(0.11 0.01 260 / 0.7)"
            : "oklch(1 0 0 / 0.04)",
          backdropFilter: scrolled ? "blur(32px) saturate(140%)" : "blur(24px) saturate(120%)",
          borderColor: scrolled
            ? "oklch(1 0 0 / 0.08)"
            : "oklch(1 0 0 / 0.06)",
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between rounded-2xl border px-5 py-2.5"
      >
        <a href="/" className="flex items-center gap-2.5">
          <Logo className="size-8" />
          <span className="text-base font-semibold tracking-tight">Reflect</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-foreground relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground transition-all"
        >
          <span className="relative z-10">Get Started</span>
          <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          <motion.div
            className="absolute inset-0 bg-white/15"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.4 }}
          />
        </a>
      </motion.nav>
    </motion.header>
  );
}
