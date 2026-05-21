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
    desc: "Turn comments & DMs into bookings.",
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

function Card({ title, desc, icon, i }: { title: string; desc: string; icon: ReactNode; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="group rounded-2xl border border-border bg-card/50 p-5 transition-all hover:border-primary/30 hover:bg-card"
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-medium">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Services
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Everything you need to grow
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Six services, one goal: more customers for your business.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <Card key={s.title} {...s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
