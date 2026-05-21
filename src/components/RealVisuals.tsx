import { motion } from "framer-motion";
import { Star, MapPin, Phone, Check, Navigation } from "lucide-react";

export function RealVisuals() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Real Results
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            What it looks like in action
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From Google rankings to instant replies — this is what your customers see.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <GBPPreview />
          <GoogleReviewCard />
          <WhatsAppCard />
        </div>
      </div>
    </section>
  );
}

function CardFrame({ children, label, className = "" }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border border-border bg-card/50 p-5 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className="flex items-center gap-1">
          <span className="size-1 rounded-full bg-primary" />
          Active
        </span>
      </div>
      {children}
    </motion.div>
  );
}

function GBPPreview() {
  return (
    <CardFrame label="Google Business Profile" className="lg:col-span-2">
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/20 text-base font-semibold text-primary">
              B
            </div>
            <div>
              <div className="text-sm font-medium">Bloom Salon & Spa</div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5 text-[oklch(0.72_0.18_70)]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-2.5 fill-current" />)}
                </span>
                4.9 · 312 reviews
              </div>
              <div className="text-[10px] text-muted-foreground">Open · Closes 9 pm · Bandra West</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              { icon: <Navigation className="size-3.5" />, label: "Directions" },
              { icon: <Phone className="size-3.5" />, label: "Call" },
              { icon: <MapPin className="size-3.5" />, label: "Map" },
              { icon: <Star className="size-3.5" />, label: "Review" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-lg border border-border bg-background/50 py-2 text-[9px] text-muted-foreground"
              >
                <span className="text-primary/80">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Local Ranking</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">
              ▲ +14 positions
            </span>
          </div>
          <div className="mt-2 flex items-end gap-3">
            <div>
              <span className="text-2xl font-semibold">#1</span>
              <span className="ml-1 text-[9px] text-muted-foreground">"salon near me"</span>
            </div>
            <div className="ml-auto flex h-10 items-end gap-0.5">
              {[18, 26, 22, 36, 30, 48, 44, 58, 64].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-sm bg-primary/50"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { value: "3.4×", label: "Profile views" },
              { value: "+218%", label: "Calls / wk" },
              { value: "+162%", label: "Direction taps" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-lg bg-card py-1.5 text-center">
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

function GoogleReviewCard() {
  return (
    <CardFrame label="Google Reviews">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
          A
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium">Aarav Mehta</div>
          <div className="text-[9px] text-muted-foreground">Local Guide · 2 days ago</div>
        </div>
      </div>
      <div className="mt-2 flex text-[oklch(0.72_0.18_70)]">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground/80">
        Honestly the best service in the area. Super quick response on WhatsApp, professional staff, and very easy to find on Google. Highly recommend!
      </p>
      <div className="mt-2 flex items-center gap-1.5 text-[9px] text-muted-foreground">
        <Check className="size-2.5 text-primary" />
        Auto-requested via Reflect review link
      </div>
    </CardFrame>
  );
}

function WhatsAppCard() {
  return (
    <CardFrame label="WhatsApp Auto-Reply">
      <div className="rounded-xl bg-[#1a2a2a] p-3">
        <div className="mb-2 flex items-center gap-2 border-b border-border/50 pb-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-[9px] font-semibold text-primary">
            B
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-medium">Bloom Salon</div>
            <div className="text-[8px] text-muted-foreground">Online</div>
          </div>
        </div>
        <div className="space-y-1.5">
          <Bubble side="left">Hi, do you have an appointment today at 5 pm?</Bubble>
          <Bubble side="right" auto>Hi Riya! Yes, 5 pm is available. Should I confirm?</Bubble>
          <Bubble side="left">Yes please, confirm it.</Bubble>
          <Bubble side="right" auto>Booked! See you at 5 pm.</Bubble>
        </div>
      </div>
      <div className="mt-2 text-center text-[9px] uppercase tracking-wider text-muted-foreground">
        Auto-replied in 0.8s · No staff needed
      </div>
    </CardFrame>
  );
}

function Bubble({ side, children, auto }: { side: "left" | "right"; children: React.ReactNode; auto?: boolean }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-[10px] leading-relaxed ${
        isRight ? "rounded-br-sm bg-primary/20" : "rounded-bl-sm bg-background"
      }`}>
        <div>{children}</div>
        <div className="mt-0.5 flex items-center justify-end gap-1 text-[7px] text-muted-foreground">
          {auto && <span className="rounded-sm bg-primary/10 px-1 text-[6px] uppercase tracking-wider text-primary">Auto</span>}
          5:02 PM
        </div>
      </div>
    </div>
  );
}
