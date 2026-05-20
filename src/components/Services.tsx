import { motion } from "framer-motion";
import { PhoneCall, Star } from "lucide-react";
import type { ReactNode } from "react";
import { GBPIcon, WhatsAppIcon, InstagramIcon, GoogleIcon } from "./BrandIcons";

const services = [
  {
    title: "Google Business Profile",
    desc: "Rank higher on Google Maps & local search. Show up first when customers nearby search.",
    icon: <GBPIcon className="size-7" />,
    featured: true,
    badge: "Most popular",
  },
  {
    title: "WhatsApp Automation",
    desc: "Reply to every customer in seconds, 24/7 — even when you're closed.",
    icon: <WhatsAppIcon className="size-7" />,
  },
  {
    title: "Instagram DM Automation",
    desc: "Turn comments & DMs into booked appointments automatically.",
    icon: <InstagramIcon className="size-7" />,
  },
  {
    title: "AI Voice Call Agent",
    desc: "Never miss a call. Our AI answers, books, and follows up like a real receptionist.",
    icon: <PhoneCall className="size-6 text-primary" />,
  },
  {
    title: "Review Management",
    desc: "Auto-request Google reviews from happy customers. Build a 4.9★ reputation.",
    icon: <Star className="size-6 fill-[oklch(0.72_0.18_70)] text-[oklch(0.72_0.18_70)]" />,
  },
  {
    title: "Google Search Visibility",
    desc: "Get found by ready-to-buy customers searching in your area.",
    icon: <GoogleIcon className="size-7" />,
  },
];

function Card({ title, desc, icon, i, featured, badge }: { title: string; desc: string; icon: ReactNode; i: number; featured?: boolean; badge?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-3xl glass glow-border p-6 transition-shadow hover:shadow-[0_0_40px_-10px_oklch(0.7_0.18_162/0.45)] ${
        featured ? "ring-1 ring-primary/40" : ""
      }`}
    >
      {badge && (
        <span className="absolute right-4 top-4 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-medium text-primary">
          {badge}
        </span>
      )}
      <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 shadow-inner">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <SectionDivider />
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="What we do"
          title={<>Everything your business needs to <span className="text-neon">be found &amp; grow</span></>}
          subtitle="Five services, one simple goal: more customers."
        />
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <Card key={s.title} {...s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
        <span className="size-1 rounded-full bg-primary" /> {eyebrow}
      </div>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gradient md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-[80%] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
  );
}
