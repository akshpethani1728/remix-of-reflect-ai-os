import { motion } from "framer-motion";
import { Star, MapPin, Phone, Check, Navigation } from "lucide-react";
import { StaggerItem } from "./Reveal";

export function RealVisuals() {
  return (
    <section className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/3 -z-10 size-[400px] rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.04),transparent_65%)] blur-3xl"
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
            Real Results
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            What it looks like in action
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            From Google rankings to instant replies — this is what your customers see.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <GBPPreview />
          <ReviewCard />
          <WhatsAppCard />
        </div>
      </div>
    </section>
  );
}

function CardFrame({ children, label, className = "", delay = 0 }: { children: React.ReactNode; label: string; className?: string; delay?: number }) {
  return (
    <StaggerItem i={delay}>
      <div className={`group rounded-2xl border border-border bg-card/30 p-5 transition-all duration-500 hover:border-primary/30 hover:bg-card/50 hover:shadow-[0_0_40px_-20px_oklch(0.62_0.2_230/0.12)] ${className}`}>
        <div className="mb-4 flex items-center justify-between text-[9px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-primary" />
            {label}
          </span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Live
          </span>
        </div>
        {children}
      </div>
    </StaggerItem>
  );
}

function GBPPreview() {
  return (
    <CardFrame label="Google Business Profile" delay={0} className="lg:col-span-2">
      <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="flex items-start gap-3.5">
            <div className="flex size-13 items-center justify-center rounded-xl bg-primary/15 text-lg font-semibold text-primary">
              B
            </div>
            <div>
              <div className="text-sm font-medium">Bloom Salon & Spa</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5 text-[oklch(0.72_0.18_70)]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-2.5 fill-current" />)}
                </span>
                4.9 · 312 reviews · Hair Salon
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">
                <span className="font-medium text-[oklch(0.6_0.2_145)]">Open</span> · Closes 9 pm · Bandra West
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[
              { icon: <Navigation className="size-3.5" />, label: "Directions" },
              { icon: <Phone className="size-3.5" />, label: "Call" },
              { icon: <MapPin className="size-3.5" />, label: "Map" },
              { icon: <Star className="size-3.5" />, label: "Review" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-background/40 py-2.5 text-[9px] text-muted-foreground transition-colors hover:bg-card hover:text-foreground cursor-default"
              >
                <span className="text-primary/70">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Local Ranking</span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[9px] font-medium text-primary">
              ▲ +14 positions
            </span>
          </div>
          <div className="mt-3 flex items-end gap-4">
            <div>
              <span className="text-3xl font-semibold tracking-tight">#1</span>
              <span className="ml-1.5 text-[9px] text-muted-foreground">"salon near me"</span>
            </div>
            <div className="ml-auto flex h-12 items-end gap-0.5">
              {[18, 26, 22, 36, 30, 48, 44, 58, 64].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="w-1.5 rounded-sm bg-primary/50"
                />
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { value: "3.4×", label: "Profile views" },
              { value: "+218%", label: "Calls / wk" },
              { value: "+162%", label: "Direction taps" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-lg bg-card/60 py-2 text-center">
                <div className="text-xs font-semibold">{value}</div>
                <div className="text-[8px] uppercase tracking-wider text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardFrame>
  );
}

function ReviewCard() {
  return (
    <CardFrame label="Google Reviews" delay={0.1}>
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
          A
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium">Aarav Mehta</div>
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <span className="size-1 rounded-full bg-[oklch(0.72_0.18_70)]" />
            Local Guide · 2 days ago
          </div>
        </div>
      </div>
      <div className="mt-2 flex text-[oklch(0.72_0.18_70)]">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground/80">
        Honestly the best service in the area. Super quick response on WhatsApp, professional staff, and very easy to find on Google. Highly recommend!
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[9px] text-muted-foreground">
        <Check className="size-2.5 text-primary" />
        Auto-requested via Reflect review link
      </div>
    </CardFrame>
  );
}

function WhatsAppCard() {
  return (
    <CardFrame label="WhatsApp Auto-Reply" delay={0.2}>
      <div className="rounded-xl bg-[#0f1f1f] p-3">
        <div className="mb-2 flex items-center gap-2 border-b border-border/40 pb-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-[9px] font-semibold text-primary">
            B
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium">Bloom Salon</div>
            <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
              <span className="size-1 rounded-full bg-[oklch(0.6_0.2_145)]" />
              Online
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <WABubble side="left">Hi, do you have an appointment today at 5 pm?</WABubble>
          <WABubble side="right" auto>Hi Riya! Yes, 5 pm is available. Should I confirm?</WABubble>
          <WABubble side="left">Yes please, confirm it.</WABubble>
          <WABubble side="right" auto>Booked! See you at 5 pm.</WABubble>
        </div>
      </div>
      <div className="mt-2 text-center text-[9px] uppercase tracking-wider text-muted-foreground">
        Auto-replied in 0.8s · No staff needed
      </div>
    </CardFrame>
  );
}

function WABubble({ side, children, auto }: { side: "left" | "right"; children: React.ReactNode; auto?: boolean }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[10px] leading-relaxed ${
        isRight ? "rounded-br-sm bg-primary/20" : "rounded-bl-sm bg-background/60"
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
