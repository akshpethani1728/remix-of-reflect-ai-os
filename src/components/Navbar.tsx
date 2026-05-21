import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
            ? "oklch(0.09 0.01 260 / 0.75)"
            : "oklch(1 0 0 / 0.035)",
          backdropFilter: scrolled ? "blur(36px) saturate(150%)" : "blur(24px) saturate(120%)",
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
                className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group relative hidden overflow-hidden rounded-full bg-primary px-5 py-2 text-xs font-medium text-primary-foreground transition-all md:inline-flex items-center gap-1.5"
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
          <button
            onClick={() => setOpen(!open)}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-2 overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-2xl md:hidden"
          >
            <div className="p-4">
              <ul className="space-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground"
              >
                Get Started
                <span>→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
