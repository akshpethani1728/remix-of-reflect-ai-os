import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
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
        className="pointer-events-none absolute left-1/2 top-32 -z-10 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.65_0.18_230/0.08),transparent_65%)] blur-3xl"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Pricing
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Simple plans, serious growth
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Transparent pricing. Cancel anytime.
          </p>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <div className="relative inline-flex items-center rounded-full border border-border bg-card p-0.5 text-sm">
            <button
              onClick={() => setYearly(false)}
              className={`relative z-10 rounded-full px-4 py-1.5 text-xs transition-colors ${!yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative z-10 rounded-full px-4 py-1.5 text-xs transition-colors ${yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Yearly
              <span className="ml-1 text-[9px] opacity-70">Save ~5%</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-3">
          {plans.map((p, i) => (
            <PlanCard key={p.name} plan={p} yearly={yearly} i={i} onSelect={setSelectedPlan} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-xs text-muted-foreground">
          All plans include onboarding within 7 days and dedicated WhatsApp support.
        </p>
      </div>

      {selectedPlan && (
        <PaymentModal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          plan={selectedPlan}
          yearly={yearly}
        />
      )}
    </section>
  );
}

function PlanCard({ plan, yearly, i, onSelect }: { plan: Plan; yearly: boolean; i: number; onSelect: (plan: Plan) => void }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const period = yearly ? "/year" : "/mo";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.08 }}
      className={`group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
        plan.featured
          ? "border-primary/40 bg-gradient-to-b from-primary/5 to-card"
          : "border-border bg-card/50 hover:border-primary/20"
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-full bg-primary px-4 py-1 text-[9px] font-medium uppercase tracking-wider text-primary-foreground">
          Most Popular
        </div>
      )}

      <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
        {plan.name}
      </div>
      <p className="text-xs text-muted-foreground">{plan.tagline}</p>

      <div className="mt-4 flex items-baseline gap-0.5">
        <span className="text-3xl font-semibold">₹{price.toLocaleString("en-IN")}</span>
        <span className="text-xs text-muted-foreground">{period}</span>
      </div>

      <button
        onClick={() => onSelect(plan)}
        className={`mt-4 w-full rounded-lg py-2.5 text-xs font-medium transition-all ${
          plan.featured
            ? "bg-primary text-primary-foreground hover:brightness-110"
            : "border border-border text-foreground hover:bg-card"
        }`}
      >
        {plan.featured ? "Start with Pro" : `Choose ${plan.name}`}
      </button>

      <div className="my-4 h-px bg-border" />

      <ul className="space-y-2.5">
        {plan.features.map((f, idx) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-2.5" />
            </span>
            <span className="text-xs text-foreground/80">{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
