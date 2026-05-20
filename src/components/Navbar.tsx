import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-40 w-[min(96%,1100px)] -translate-x-1/2"
    >
      <nav className="glass-strong flex items-center justify-between rounded-2xl px-4 py-2.5 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="size-7" />
          <span className="font-display text-lg font-semibold tracking-tight">Reflect</span>
        </Link>
        <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">{l.label}</a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-transform hover:scale-[1.03]"
        >
          Get Started
          <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </nav>
    </motion.header>
  );
}
