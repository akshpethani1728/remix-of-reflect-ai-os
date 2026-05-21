import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { PaymentModal } from "./PaymentButton";

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
    name: "Basic",
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
    name: "Pro",
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
    name: "Max",
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
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <section id="pricing" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 -z-10 size-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.06),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/2 -z-10 size-[400px] rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.04),transparent_65%)] blur-3xl"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Pricing
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Simple plans, serious growth
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Transparent pricing. Cancel anytime.
          </p>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <div className="relative inline-flex items-center rounded-full border border-border bg-card p-0.5 text-sm">
            <button
              onClick={() => setYearly(false)}
              className={`relative z-10 rounded-full px-5 py-1.5 text-xs transition-all duration-300 ${
                !yearly
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_oklch(0.62_0.2_230/0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative z-10 rounded-full px-5 py-1.5 text-xs transition-all duration-300 ${
                yearly
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_oklch(0.62_0.2_230/0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-1 text-[9px] opacity-60">Save ~5%</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <TiltCard key={p.name} intensity={8}>
              <PlanCard plan={p} yearly={yearly} i={i} onSelect={setSelectedPlan} />
            </TiltCard>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-xs text-muted-foreground">
          All plans include onboarding within 7 days and dedicated WhatsApp support.
        </p>
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <PaymentModal
            isOpen={!!selectedPlan}
            onClose={() => setSelectedPlan(null)}
            plan={selectedPlan}
            yearly={yearly}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function PlanCard({ plan, yearly, i, onSelect }: { plan: Plan; yearly: boolean; i: number; onSelect: (plan: Plan) => void }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const period = yearly ? "/year" : "/mo";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-500 [transform-style:preserve-3d] ${
        plan.featured
          ? "border-primary/40 bg-gradient-to-b from-primary/[0.06] to-card/80 shadow-[0_0_40px_-15px_oklch(0.62_0.2_230/0.2)]"
          : "border-border bg-card/40 hover:border-primary/30 hover:shadow-[0_0_30px_-15px_oklch(0.62_0.2_230/0.1)]"
      }`}
    >
      {plan.featured && (
        <>
          <div className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(ellipse_at_top,oklch(0.62_0.2_230/0.12),transparent_65%)]" />
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 oklch(0.62 0.2 230/0.3)", "0 0 20px 4px oklch(0.62 0.2 230/0)", "0 0 0 0 oklch(0.62 0.2 230/0.3)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-full bg-primary px-5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-primary-foreground"
          >
            Most Popular
          </motion.div>
        </>
      )}

      <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {plan.name}
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">{plan.tagline}</p>

      <div className="mt-5 flex items-baseline gap-0.5">
        <span className="text-4xl font-semibold tracking-tight">₹{price.toLocaleString("en-IN")}</span>
        <span className="text-xs text-muted-foreground">{period}</span>
      </div>

      <button
        onClick={() => onSelect(plan)}
        className={`relative mt-5 w-full overflow-hidden rounded-xl py-3 text-xs font-medium transition-all duration-300 ${
          plan.featured
            ? "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_25px_-8px_oklch(0.62_0.2_230/0.4)]"
            : "border border-border text-foreground hover:bg-card"
        }`}
      >
        {plan.featured ? "Start with Pro" : `Choose ${plan.name}`}
      </button>

      <div className="my-5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <ul className="space-y-3">
        {plan.features.map((f, idx) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 + idx * 0.03 }}
            className="flex items-start gap-2.5"
          >
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="size-2.5" />
            </span>
            <span className="text-xs text-foreground/80">{f}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
