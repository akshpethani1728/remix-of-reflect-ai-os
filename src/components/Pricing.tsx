import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { SectionDivider, SectionHeader } from "./Services";

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "BASIC",
    tagline: "Get found & start replying automatically.",
    monthly: 799,
    yearly: 9100,
    features: [
      "Improve Google Business Profile",
      "Weekly 2 Profile Updates",
      "Increase 5 Star Reviews With Review Link",
      "Weekly 2 Social Media Posts",
      "Automatic Instagram DM Reply Bot",
      "Automatic WhatsApp Reply Bot",
    ],
  },
  {
    name: "PRO",
    tagline: "Everything in Basic, plus a real lead engine.",
    monthly: 1699,
    yearly: 18500,
    featured: true,
    features: [
      "Business Website For Leads Generation",
      "Complete WhatsApp Business Setup",
      "WhatsApp Catalogue Setup & Management",
      "Festival Posts Or Videos",
    ],
  },
  {
    name: "MAX",
    tagline: "Everything in Pro, plus AI calls & ads.",
    monthly: 3499,
    yearly: 32500,
    features: [
      "AI Call Voice Agent",
      "Google Ads Management",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-32">
      <SectionDivider />
      {/* spotlight */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-32 -z-10 size-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.65_0.25_285/0.25),transparent_70%)] blur-3xl" />

      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Pricing"
          title={<>Simple plans, <span className="text-neon">serious growth</span></>}
          subtitle="Transparent monthly or yearly pricing. Cancel anytime."
        />

        {/* toggle */}
        <div className="mt-10 flex justify-center">
          <div className="glass relative inline-flex items-center rounded-full p-1 text-sm">
            <button
              onClick={() => setYearly(false)}
              className={`relative z-10 rounded-full px-5 py-1.5 transition-colors ${!yearly ? "text-background" : "text-muted-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative z-10 rounded-full px-5 py-1.5 transition-colors ${yearly ? "text-background" : "text-muted-foreground"}`}
            >
              Yearly <span className="ml-1 text-[10px] opacity-80">save ~5%</span>
            </button>
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute inset-y-1 w-[110px] rounded-full bg-gradient-to-r from-primary to-accent"
              style={{ left: yearly ? "calc(100% - 175px)" : 4, width: yearly ? 171 : 102 }}
            />
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <PlanCard key={p.name} plan={p} yearly={yearly} i={i} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-xs text-muted-foreground">
          All plans include onboarding within 7 days and a dedicated WhatsApp support line.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan, yearly, i }: { plan: Plan; yearly: boolean; i: number }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const period = yearly ? "/year" : "/mo";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      whileHover={{ y: -8, scale: 1.01 }}
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`group relative overflow-hidden rounded-3xl p-8 transition-shadow ${
        plan.featured
          ? "glass-strong border-primary/40"
          : "glass glow-border"
      }`}
      style={
        plan.featured
          ? { boxShadow: "0 0 80px -10px oklch(0.65 0.25 285 / 0.45)" }
          : undefined
      }
    >
      {/* spotlight follow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), oklch(0.82 0.18 215 / 0.18), transparent 55%)",
        }}
      />

      {plan.featured && (
        <>
          <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-background">
            Most Popular
          </div>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.65_0.25_285/0.22),transparent_65%)]" />
        </>
      )}

      <div className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {plan.name}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{plan.tagline}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-5xl font-semibold text-gradient">
          ₹{price.toLocaleString("en-IN")}
        </span>
        <span className="text-sm text-muted-foreground">{period}</span>
      </div>

      <a
        href="#contact"
        className={`mt-7 block rounded-full px-5 py-3 text-center text-sm font-medium transition-transform hover:scale-[1.02] ${
          plan.featured
            ? "bg-gradient-to-r from-primary to-accent text-background"
            : "bg-foreground text-background"
        }`}
      >
        {plan.featured ? "Start with Pro" : `Choose ${plan.name.toLowerCase()}`}
      </a>

      <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <ul className="space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="size-3" />
            </span>
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
