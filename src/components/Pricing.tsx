import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { SectionDivider, SectionHeader } from "./Services";
import { PaymentModal, PaymentSuccess } from "./PaymentButton";

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  features: string[];
  featured?: boolean;
};

interface UserData {
  name: string;
  email: string;
  phone: string;
}

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
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  // Demo user data - in production, get this from form
  const userData: UserData = {
    name: "Demo User",
    email: "demo@example.com",
    phone: "919999999999",
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handlePaymentSuccess = (id: string) => {
    setPaymentId(id);
    setPaymentSuccess(true);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
    if (paymentSuccess) {
      setPaymentSuccess(false);
      setPaymentId("");
    }
  };

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
            <PlanCard key={p.name} plan={p} yearly={yearly} i={i} onSelect={handlePlanSelect} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-md text-center text-xs text-muted-foreground">
          All plans include onboarding within 7 days and a dedicated WhatsApp support line.
        </p>
      </div>

      {/* Payment Modal */}
      {selectedPlan && !paymentSuccess && (
        <PaymentModal
          isOpen={!!selectedPlan}
          onClose={handleCloseModal}
          plan={selectedPlan}
          userData={userData}
        />
      )}

      {/* Payment Success */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong m-4 max-w-md rounded-3xl p-8"
          >
            <PaymentSuccess paymentId={paymentId} planName={selectedPlan?.name || ""} />
            <button
              onClick={handleCloseModal}
              className="mt-6 w-full rounded-full bg-foreground px-6 py-3 text-center text-sm font-medium text-background"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}

function PlanCard({ plan, yearly, i, onSelect }: { plan: Plan; yearly: boolean; i: number; onSelect: (plan: Plan) => void }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const period = yearly ? "/year" : "/mo";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      whileHover={{ y: -12, scale: 1.02 }}
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 ${
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
          <motion.div
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 0 oklch(0.68 0.16 162/0.4)", "0 0 20px 5px oklch(0.68 0.16 162/0)", "0 0 0 0 oklch(0.68 0.16 162/0.4)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-background"
          >
            Most Popular
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.65_0.25_285/0.22),transparent_65%)]" />
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        {plan.name}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: i * 0.1 + 0.1 }}
        className="mt-2 text-sm text-muted-foreground"
      >
        {plan.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 + 0.15 }}
        className="mt-6 flex items-baseline gap-1"
      >
        <motion.span
          className="font-display text-5xl font-semibold text-gradient"
          whileHover={{ scale: 1.05 }}
        >
          ₹{price.toLocaleString("en-IN")}
        </motion.span>
        <span className="text-sm text-muted-foreground">{period}</span>
      </motion.div>

      <motion.button
        onClick={() => onSelect(plan)}
        whileHover={{ scale: 1.03, boxShadow: "0 10px 40px -15px oklch(0.68 0.16 162/0.5)" }}
        whileTap={{ scale: 0.98 }}
        className={`mt-7 w-full rounded-full px-5 py-3 text-center text-sm font-medium transition-all ${
          plan.featured
            ? "bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/30"
            : "bg-foreground text-background"
        }`}
      >
        {plan.featured ? "Start with Pro" : `Choose ${plan.name.toLowerCase()}`}
      </motion.button>

      <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <ul className="space-y-3 text-sm">
        {plan.features.map((f, idx) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.2 + idx * 0.05 }}
            className="flex items-start gap-3"
          >
            <motion.span
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
            >
              <Check className="size-3" />
            </motion.span>
            <span className="text-foreground/90">{f}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
