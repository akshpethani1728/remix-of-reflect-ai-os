import { motion } from "framer-motion";
import { Search, MessageCircle, Camera, PhoneCall, Star, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

const services = [
  {
    title: "Google Business Profile",
    desc: "Rank higher on Google Maps & local search.",
    icon: <Search className="size-5" />,
  },
  {
    title: "WhatsApp Automation",
    desc: "Reply to customers automatically, 24/7.",
    icon: <MessageCircle className="size-5" />,
  },
  {
    title: "Instagram DM Automation",
    desc: "Turn comments & DMs into bookings instantly.",
    icon: <Camera className="size-5" />,
  },
  {
    title: "AI Voice Call Agent",
    desc: "Never miss a call — AI answers like a receptionist.",
    icon: <PhoneCall className="size-5" />,
  },
  {
    title: "Review Management",
    desc: "Auto-request Google reviews from happy customers.",
    icon: <Star className="size-5" />,
  },
  {
    title: "Google Ads Management",
    desc: "Paid campaigns that bring ready-to-buy customers.",
    icon: <BarChart3 className="size-5" />,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

function Card({ title, desc, icon }: { title: string; desc: string; icon: ReactNode }) {
  return (
    <motion.div
      variants={item}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 transition-all duration-500 hover:border-primary/30 hover:bg-card/60 hover:shadow-[0_0_40px_-20px_oklch(0.62_0.2_230/0.15)]"
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.62 0.2 230 / 0.06), transparent 40%)" }}
      />
      <motion.div
        whileHover={{ scale: 1.1, rotate: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary"
      >
        {icon}
      </motion.div>
      <h3 className="mt-5 text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="mt-4 flex items-center gap-1 text-[10px] font-medium text-primary/0 transition-all group-hover:text-primary"
      >
        Learn more
        <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/4 -z-10 size-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.035),transparent_65%)] blur-3xl"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Everything you need to grow
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Six services, one goal: more customers for your business.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => <Card key={s.title} {...s} />)}
        </motion.div>
      </div>
    </section>
  );
}
