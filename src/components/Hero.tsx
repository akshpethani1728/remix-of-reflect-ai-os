import { motion } from "framer-motion";
import { MapPin, Star, Check } from "lucide-react";
import { Hero3D } from "./Hero3D";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.07),transparent_65%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/4 -z-10 size-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.04),transparent_65%)] blur-3xl"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Visibility Through Automation
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-5xl text-center text-[clamp(2.8rem,7vw,5rem)] font-semibold leading-[1.05] tracking-tight"
        >
          Get More Customers
          <br />
          <span className="text-primary">From Google</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          We help local businesses improve visibility, automate customer replies, and grow online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#pricing"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            <span className="relative z-10">See Plans</span>
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            <motion.div
              className="absolute inset-0 bg-white/15"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.4 }}
            />
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-card"
          >
            Free Audit
          </a>
        </motion.div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_70px_-25px_oklch(0.62_0.2_230/0.2)]">
                <GBPShowcase />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-4"
            >
              <div className="overflow-hidden rounded-2xl border border-border transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_50px_-20px_oklch(0.62_0.2_230/0.15)]">
                <WhatsAppShowcase />
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-card/30 p-4 transition-all duration-500 hover:border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&auto=format"
                      alt="Team member"
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3 fill-[oklch(0.72_0.18_70)] text-[oklch(0.72_0.18_70)]" />
                      ))}
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      "Reflect transformed how we manage our online presence. Bookings tripled in 2 months."
                    </p>
                    <p className="mt-1 text-[10px] font-medium text-foreground">— Ananya R., Bloom Salon</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground"
        >
          {[
            { icon: <Star className="size-3.5 fill-current text-[oklch(0.72_0.18_70)]" />, text: "4.9 Average Rating" },
            { icon: <Check className="size-3.5 text-primary" />, text: "480+ Businesses" },
            { icon: <Check className="size-3.5 text-primary" />, text: "7 Day Setup" },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              {icon}
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GBPShowcase() {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 border-b border-border px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[oklch(0.65_0.2_25)]" />
          <span className="size-2 rounded-full bg-[oklch(0.6_0.15_50)]" />
          <span className="size-2 rounded-full bg-[oklch(0.6_0.15_130)]" />
        </div>
        <span className="text-[10px] text-muted-foreground">Google Maps — Bloom Salon</span>
      </div>
      <div className="p-5">
        <div className="relative h-52 overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg,#0f1f1f 0%,#1a2f2f 50%,#0f1f1f 100%)" }}>
          <div className="absolute inset-0 opacity-[0.12]" style={{
            backgroundImage: "repeating-linear-gradient(45deg,transparent 0 22px,rgba(255,255,255,0.02) 22px 23px),repeating-linear-gradient(-45deg,transparent 0 30px,rgba(255,255,255,0.015) 30px 31px)",
          }} />
          <div className="absolute left-0 right-0 top-[55%] h-[3px] bg-border/40" />
          <div className="absolute bottom-0 top-0 left-[38%] w-[3px] bg-border/40" />
          <motion.div
            animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[38%] top-[55%] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
              <MapPin className="size-5 fill-current text-primary-foreground" />
            </div>
            <div className="absolute left-1/2 top-full size-16 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full bg-primary/15 blur-md" />
          </motion.div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Bloom Salon & Spa</div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              0.4 km · <span className="text-[oklch(0.6_0.2_145)]">Open</span> · 4.9★
            </div>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary">
            #1 in area
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["Directions", "Call", "Website", "Share"].map((label) => (
            <div key={label} className="rounded-lg border border-border bg-background/50 py-2.5 text-center text-[9px] text-muted-foreground transition-colors hover:bg-card hover:text-foreground cursor-default">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatsAppShowcase() {
  return (
    <div>
      <div className="flex items-center gap-3 border-b border-border px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[oklch(0.65_0.2_25)]" />
          <span className="size-2 rounded-full bg-[oklch(0.6_0.15_50)]" />
          <span className="size-2 rounded-full bg-[oklch(0.6_0.15_130)]" />
        </div>
        <span className="text-[10px] text-muted-foreground">WhatsApp — Auto-Reply</span>
      </div>
      <div className="p-5">
        <div className="rounded-xl bg-[#0e1d1d] p-3">
          <div className="mb-3 flex items-center gap-2.5 border-b border-border/40 pb-2.5">
            <div className="flex size-7 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">B</div>
            <div className="flex-1">
              <div className="text-xs font-medium">Bloom Salon</div>
              <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-[oklch(0.6_0.2_145)]" />
                Online
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <ChatBubble side="left">Hi, do you have an appointment today at 5 pm?</ChatBubble>
            <ChatBubble side="right" auto>Hi Riya! Yes, 5 pm is available with Anjali. Should I confirm?</ChatBubble>
            <ChatBubble side="left">Yes please, confirm it.</ChatBubble>
            <ChatBubble side="right" auto>Booked! See you at 5 pm. 😊</ChatBubble>
          </div>
        </div>
        <div className="mt-2 text-center text-[9px] uppercase tracking-wider text-muted-foreground">
          Auto-replied in under 1 second
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ side, children, auto }: { side: "left" | "right"; children: React.ReactNode; auto?: boolean }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${
        isRight ? "rounded-br-sm bg-primary/20 text-foreground" : "rounded-bl-sm bg-background/80 text-foreground/90"
      }`}>
        <div>{children}</div>
        {auto && (
          <div className="mt-0.5 flex items-center justify-end gap-1">
            <span className="rounded-sm bg-primary/10 px-1 text-[6px] uppercase tracking-wider text-primary">Auto</span>
          </div>
        )}
      </div>
    </div>
  );
}
