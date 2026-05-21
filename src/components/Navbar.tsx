import { motion } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-1/2 top-3 z-40 w-[min(92%,1080px)] -translate-x-1/2"
    >
      <nav className="glass flex items-center justify-between rounded-2xl px-5 py-2.5">
        <a href="/" className="flex items-center gap-2.5">
          <Logo className="size-8" />
          <span className="text-base font-semibold tracking-tight">Reflect</span>
        </a>
        <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">{l.label}</a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          Get Started
          <span className="inline-block">→</span>
        </a>
      </nav>
    </motion.header>
  );
}
