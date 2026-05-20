import { motion } from "framer-motion";
import { SectionDivider, SectionHeader } from "./Services";

const nodes = [
  { id: "gbp", label: "Google Profile", x: 18, y: 28 },
  { id: "wa", label: "WhatsApp", x: 82, y: 24 },
  { id: "ig", label: "Instagram", x: 12, y: 70 },
  { id: "voice", label: "AI Voice", x: 86, y: 72 },
  { id: "rev", label: "Reviews", x: 50, y: 12 },
  { id: "leads", label: "Leads CRM", x: 50, y: 88 },
];
const core = { x: 50, y: 50 };

export function SystemVisual() {
  return (
    <section id="system" className="relative py-32">
      <SectionDivider />
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="The Reflect Engine"
          title={<>A sci-fi control center <span className="text-neon">for your storefront</span></>}
          subtitle="Every channel, every conversation, every lead — orchestrated by one autonomous core."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto mt-16 aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl glass-strong glow-shadow"
        >
          {/* grid bg */}
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.25_240/0.3),transparent_60%)]" />

          {/* svg lines */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.85 0.2 210)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="oklch(0.65 0.25 285)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {nodes.map((n, i) => (
              <motion.line
                key={n.id}
                x1={n.x} y1={n.y} x2={core.x} y2={core.y}
                stroke="url(#line)" strokeWidth="0.2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
              />
            ))}
            {/* traveling pulses */}
            {nodes.map((n, i) => (
              <circle key={"p" + n.id} r="0.5" fill="oklch(0.85 0.2 210)">
                <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite"
                  path={`M${n.x},${n.y} L${core.x},${core.y}`} />
              </circle>
            ))}
          </svg>

          {/* core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative size-32 md:size-40">
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-primary/40" />
              <div className="absolute inset-2 animate-spin-slow rounded-full border border-accent/40" style={{ animationDirection: "reverse" }} />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary to-accent blur-sm animate-pulse-glow" />
              <div className="absolute inset-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-xl">
                <div className="text-center">
                  <div className="font-display text-xs font-semibold text-primary">REFLECT</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">core</div>
                </div>
              </div>
            </div>
          </div>

          {/* nodes */}
          {nodes.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="glass rounded-xl px-3 py-1.5 text-xs whitespace-nowrap">
                <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_oklch(0.82_0.18_215)]" />
                {n.label}
              </div>
            </motion.div>
          ))}

          {/* corner stats */}
          <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="text-foreground">SYSTEM ONLINE</div>
            <div>latency 12ms · 6 channels</div>
          </div>
          <div className="absolute right-4 top-4 glass rounded-lg px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="text-primary">+218 leads today</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
