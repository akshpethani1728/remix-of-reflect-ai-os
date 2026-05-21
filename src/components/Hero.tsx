import { motion } from "framer-motion";
import { MapPin, Star, Phone, Check } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.65_0.18_230/0.1),transparent_65%)] blur-3xl"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Visibility Through Automation
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-center text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight"
        >
          Get More Customers<br />
          <span className="text-primary">From Google</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-center text-base text-muted-foreground md:text-lg"
        >
          We help local businesses improve visibility, automate customer replies, and grow online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            See Plans
            <span>→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-card"
          >
            Free Audit
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <GoogleMapsPreview />
            <WhatsAppChatPreview />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-[oklch(0.72_0.18_70)] text-[oklch(0.72_0.18_70)]" />
            4.9 Average Rating
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-primary" />
            480+ Businesses
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3.5 text-primary" />
            7 Day Setup
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function GoogleMapsPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex size-2 rounded-full bg-[oklch(0.65_0.2_25)]" />
        <div className="flex size-2 rounded-full bg-[oklch(0.6_0.15_50)]" />
        <div className="flex size-2 rounded-full bg-[oklch(0.6_0.15_130)]" />
        <span className="ml-2 text-xs text-muted-foreground">Google Maps</span>
      </div>
      <div className="p-4">
        <div
          className="relative h-44 overflow-hidden rounded-xl"
          style={{ background: "linear-gradient(135deg,#1a2a2a 0%,#2a3a3a 50%,#1a2a2a 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 18px, rgba(255,255,255,0.03) 18px 19px), repeating-linear-gradient(-45deg, transparent 0 26px, rgba(255,255,255,0.02) 26px 27px)",
            }}
          />
          <div className="absolute left-0 right-0 top-[50%] h-1 bg-border/50" />
          <div className="absolute bottom-0 top-0 left-[35%] w-1 bg-border/50" />
          <div className="absolute left-[35%] top-[50%] -translate-x-1/2 -translate-y-1/2">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <MapPin className="size-4 fill-current" />
            </div>
            <div className="absolute left-1/2 top-full size-14 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full bg-primary/20 blur-md" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Bloom Salon & Spa</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              0.4 km · Open now
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
            <Star className="size-3 fill-current" />
            4.9
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {["Directions", "Call", "Website"].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-background/50 py-2 text-center text-[10px] text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatsAppChatPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex size-2 rounded-full bg-[oklch(0.65_0.2_25)]" />
        <div className="flex size-2 rounded-full bg-[oklch(0.6_0.15_50)]" />
        <div className="flex size-2 rounded-full bg-[oklch(0.6_0.15_130)]" />
        <span className="ml-2 text-xs text-muted-foreground">WhatsApp</span>
      </div>
      <div className="p-4">
        <div className="rounded-xl bg-[#1a2a2a] p-3">
          <div className="mb-2 flex items-center gap-2 border-b border-border/50 pb-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">
              B
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium">Bloom Salon</div>
              <div className="text-[9px] text-muted-foreground">Online</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg rounded-bl-sm bg-background px-3 py-1.5 text-xs leading-relaxed">
                Hi, do you have an appointment today at 5 pm?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-lg rounded-br-sm bg-primary/20 px-3 py-1.5 text-xs leading-relaxed">
                Hi Riya! Yes, 5 pm is available. Should I confirm?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg rounded-bl-sm bg-background px-3 py-1.5 text-xs leading-relaxed">
                Yes please, confirm it.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-lg rounded-br-sm bg-primary/20 px-3 py-1.5 text-xs leading-relaxed">
                Booked! See you at 5 pm.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center text-[9px] uppercase tracking-wider text-muted-foreground">
          Auto-replied in under 1s
        </div>
      </div>
    </div>
  );
}
