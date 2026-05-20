import { motion } from "framer-motion";
import { SectionDivider, SectionHeader } from "./Services";

const steps = [
  { n: "01", t: "Capture", d: "We map every digital surface where your customers search, scroll and call." },
  { n: "02", t: "Automate", d: "AI agents take over replies, bookings and follow-ups across all channels." },
  { n: "03", t: "Convert", d: "Smart routing turns conversations into qualified, booked customers." },
  { n: "04", t: "Compound", d: "Reviews, rankings and retention loops snowball your visibility month over month." },
];

export function WhyReflect() {
  return (
    <section id="why" className="relative py-32">
      <SectionDivider />
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Why Reflect"
          title={<>Engineered for <span className="text-neon">unfair growth</span></>}
          subtitle="A four-stage automation loop that runs forever, learns continuously, and never sleeps."
        />

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
          <div className="space-y-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col gap-6 md:flex-row md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="md:w-1/2">
                  <div className="glass glow-border rounded-3xl p-7">
                    <div className="font-display text-5xl font-semibold text-neon">{s.n}</div>
                    <h3 className="mt-3 text-2xl font-semibold">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </div>
                <div className="relative hidden size-4 shrink-0 rounded-full bg-primary shadow-[0_0_20px_oklch(0.82_0.18_215)] md:block" />
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
