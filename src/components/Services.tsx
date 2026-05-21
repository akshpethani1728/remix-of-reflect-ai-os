import { motion } from "framer-motion";
import { Search, MessageCircle, Camera, PhoneCall, Star, BarChart3, Zap, Clock, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

type Tier = "core" | "scale";

interface Service {
  title: string;
  desc: string;
  icon: ReactNode;
  badge: string;
  tier: Tier;
  accent: string;
  stat: { label: string; value: string };
}

const services: Service[] = [
  {
    title: "Google Business Profile",
    desc: "Rank higher on Google Maps & local search with optimized listings, posts, and photo management.",
    icon: <Search className="size-5" />,
    badge: "Most Popular",
    tier: "core",
    accent: "from-blue-500/20 to-blue-600/5",
    stat: { label: "Avg. ranking jump", value: "#1 → #3" },
  },
  {
    title: "WhatsApp Automation",
    desc: "Reply to customer messages automatically 24/7 with smart AI that books appointments and answers FAQs.",
    icon: <MessageCircle className="size-5" />,
    badge: "24/7 Auto",
    tier: "core",
    accent: "from-emerald-500/20 to-emerald-600/5",
    stat: { label: "Avg. reply time", value: "< 2 sec" },
  },
  {
    title: "Instagram DM Automation",
    desc: "Turn comments & DMs into bookings instantly with automated responses and follow-ups.",
    icon: <Camera className="size-5" />,
    badge: "Auto DM",
    tier: "core",
    accent: "from-pink-500/20 to-pink-600/5",
    stat: { label: "Conversion rate", value: "3.2x" },
  },
  {
    title: "AI Voice Call Agent",
    desc: "Never miss a call again. Our AI answers like a receptionist, takes bookings, and transfers calls.",
    icon: <PhoneCall className="size-5" />,
    badge: "New",
    tier: "scale",
    accent: "from-purple-500/20 to-purple-600/5",
    stat: { label: "Calls answered", value: "97%" },
  },
  {
    title: "Review Management",
    desc: "Auto-request Google reviews from happy customers via WhatsApp & SMS and respond to all reviews.",
    icon: <Star className="size-5" />,
    badge: "Auto Request",
    tier: "scale",
    accent: "from-amber-500/20 to-amber-600/5",
    stat: { label: "New reviews/mo", value: "+28" },
  },
  {
    title: "Google Ads Management",
    desc: "Targeted paid campaigns that bring ready-to-buy customers searching for services like yours.",
    icon: <BarChart3 className="size-5" />,
    badge: "ROI Focused",
    tier: "scale",
    accent: "from-cyan-500/20 to-cyan-600/5",
    stat: { label: "Avg. ROAS", value: "4.5x" },
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const badgeColorMap: Record<string, string> = {
  "from-blue-500/20 to-blue-600/5": "bg-blue-500/10 text-blue-400",
  "from-emerald-500/20 to-emerald-600/5": "bg-emerald-500/10 text-emerald-400",
  "from-pink-500/20 to-pink-600/5": "bg-pink-500/10 text-pink-400",
  "from-purple-500/20 to-purple-600/5": "bg-purple-500/10 text-purple-400",
  "from-amber-500/20 to-amber-600/5": "bg-amber-500/10 text-amber-400",
  "from-cyan-500/20 to-cyan-600/5": "bg-cyan-500/10 text-cyan-400",
};

const statIconColor: Record<string, string> = {
  "from-blue-500/20 to-blue-600/5": "text-blue-400",
  "from-emerald-500/20 to-emerald-600/5": "text-emerald-400",
  "from-pink-500/20 to-pink-600/5": "text-pink-400",
  "from-purple-500/20 to-purple-600/5": "text-purple-400",
  "from-amber-500/20 to-amber-600/5": "text-amber-400",
  "from-cyan-500/20 to-cyan-600/5": "text-cyan-400",
};

function Card({ title, desc, icon, badge, accent, stat }: Service) {
  const badgeColor = badgeColorMap[accent] || "bg-primary/10 text-primary";
  const iconColor = statIconColor[accent] || "text-primary";

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/20 p-6 transition-all duration-500 hover:border-primary/20 hover:bg-card/40 hover:shadow-[0_0_50px_-12px_oklch(0.62_0.2_230/0.12)]"
    >
      <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent}`} />

      <div className="flex items-start justify-between">
        <motion.div
          whileHover={{ scale: 1.12, rotate: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 14 }}
          className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-foreground`}
        >
          {icon}
        </motion.div>
        <span className={`rounded-full px-2.5 py-0.5 text-[8px] font-medium uppercase tracking-wider ${badgeColor}`}>
          {badge}
        </span>
      </div>

      <h3 className="mt-5 text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-background/40 px-3.5 py-2">
        <TrendingUp className={`size-3.5 ${iconColor}`} />
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs font-semibold text-foreground">{stat.value}</span>
          <span className="text-[9px] text-muted-foreground">{stat.label}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-0 -z-10 size-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.035),transparent_65%)] blur-3xl"
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

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <Zap className="size-4 text-primary" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Core Growth Engine</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.filter((s) => s.tier === "core").map((s) => <Card key={s.title} {...s} />)}
          </motion.div>

          <div className="mb-8 mt-12 flex items-center gap-3">
            <TrendingUp className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Scale & Amplify</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.filter((s) => s.tier === "scale").map((s) => <Card key={s.title} {...s} />)}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-14 max-w-3xl text-center"
        >
          <div className="grid grid-cols-3 gap-8 rounded-2xl border border-border bg-card/20 px-8 py-6">
            {[
              { icon: <Clock className="size-4 text-primary" />, value: "7 Day", label: "Setup Time" },
              { icon: <MessageCircle className="size-4 text-primary" />, value: "15,000+", label: "Auto-Replies Sent" },
              { icon: <Star className="size-4 text-primary" />, value: "4.9★", label: "Avg Client Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="mb-1 flex justify-center">{s.icon}</div>
                <div className="text-lg font-semibold tracking-tight text-foreground">{s.value}</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
