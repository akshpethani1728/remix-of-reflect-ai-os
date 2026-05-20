import { motion } from "framer-motion";
import { Star, MapPin, Check, CheckCheck, Phone, Globe, Navigation, Clock, Camera } from "lucide-react";
import { SectionDivider, SectionHeader } from "./Services";
import { GoogleIcon, GoogleMapsIcon, WhatsAppIcon, InstagramIcon, GBPIcon } from "./BrandIcons";

export function RealVisuals() {
  return (
    <section id="results" className="relative py-28">
      <SectionDivider />
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="In action"
          title={<>Real results on <span className="text-neon">Google &amp; WhatsApp</span></>}
          subtitle="From Google Business Profile rankings to instant WhatsApp replies — here's exactly what your customers see."
        />

        {/* Featured: Google Business Profile */}
        <div className="mx-auto mt-16 max-w-6xl">
          <GoogleBusinessProfileCard />
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-3">
          <GoogleMapsCard />
          <WhatsAppCard />
          <ReviewCard />
        </div>

        {/* Integration row */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Optimised for the platforms your customers already use
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-90">
            <Brand icon={<GBPIcon className="size-7" />} name="Google Business" />
            <Brand icon={<GoogleMapsIcon className="size-7" />} name="Google Maps" />
            <Brand icon={<GoogleIcon className="size-7" />} name="Google Search" />
            <Brand icon={<WhatsAppIcon className="size-7" />} name="WhatsApp" />
            <Brand icon={<InstagramIcon className="size-7" />} name="Instagram" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Brand({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-foreground/80">
      {icon}
      <span className="font-medium">{name}</span>
    </div>
  );
}

function CardFrame({ children, label, icon, delay = 0, className = "" }: { children: React.ReactNode; label: string; icon?: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-3xl glass-strong glow-border p-5 transition-shadow hover:shadow-[0_0_60px_-15px_oklch(0.7_0.18_162/0.45)] ${className}`}
    >
      <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-[oklch(0.7_0.2_145)]" /> Live
        </span>
      </div>
      {children}
    </motion.div>
  );
}

/* ---------- Featured: Google Business Profile knowledge panel ---------- */

function GoogleBusinessProfileCard() {
  return (
    <CardFrame
      label="Google Business Profile"
      icon={<GBPIcon className="size-4" />}
      delay={0}
      className="!p-0 overflow-hidden"
    >
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        {/* Left: search/knowledge panel */}
        <div className="border-r border-border/60 bg-white/70 p-5 backdrop-blur-md dark:bg-white/[0.04]">
          {/* fake google search bar */}
          <div className="flex items-center gap-3 rounded-full border border-border bg-white px-4 py-2.5 shadow-sm">
            <GoogleIcon className="size-5" />
            <span className="text-sm text-foreground/80">salon near me</span>
            <span className="ml-auto text-[10px] text-muted-foreground">Maps · Reviews · Hours</span>
          </div>

          {/* business header */}
          <div className="mt-5 flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-semibold text-background shadow-md">
              B
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold leading-tight">Bloom Salon &amp; Spa</div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5 text-[oklch(0.72_0.18_70)]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}
                </span>
                <span className="font-medium text-foreground">4.9</span>
                <span>(312)</span>
                <span>·</span>
                <span>Hair Salon</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Open · Closes 9 pm · Bandra West
              </div>
            </div>
            <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-medium text-primary">
              #1 in area
            </span>
          </div>

          {/* action chips */}
          <div className="mt-5 grid grid-cols-4 gap-2">
            <ActionChip icon={<Navigation className="size-4" />} label="Directions" />
            <ActionChip icon={<Globe className="size-4" />} label="Website" />
            <ActionChip icon={<Phone className="size-4" />} label="Call" />
            <ActionChip icon={<Camera className="size-4" />} label="Photos" />
          </div>

          {/* details */}
          <div className="mt-5 space-y-2 text-xs">
            <DetailRow icon={<MapPin className="size-3.5" />} text="Linking Rd, Bandra West, Mumbai" />
            <DetailRow icon={<Clock className="size-3.5" />} text="Open today · 10 am – 9 pm" highlight="Open" />
            <DetailRow icon={<Phone className="size-3.5" />} text="+91 98xxx xxxxx" />
          </div>
        </div>

        {/* Right: ranking + reviews + photos */}
        <div className="p-5">
          {/* ranking improvement */}
          <div className="rounded-2xl border border-border bg-white/60 p-4 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Local ranking</div>
              <span className="rounded-full bg-[oklch(0.7_0.2_145/0.15)] px-2 py-0.5 text-[10px] font-medium text-[oklch(0.45_0.18_145)]">
                ▲ +14 positions
              </span>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <div>
                <div className="font-display text-3xl font-semibold">#1</div>
                <div className="text-[10px] text-muted-foreground">"salon near me"</div>
              </div>
              <div className="ml-auto flex h-12 items-end gap-1">
                {[18, 26, 22, 36, 30, 48, 44, 58, 64].map((h, i) => (
                  <div
                    key={i}
                    className="w-1.5 rounded-sm bg-gradient-to-t from-primary/30 to-primary"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* photos */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              "linear-gradient(135deg,#f6d6c4,#c98b6b)",
              "linear-gradient(135deg,#cfe8e0,#7fb8a8)",
              "linear-gradient(135deg,#e9d8f0,#a98ac9)",
            ].map((bg, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl" style={{ background: bg }}>
                <div className="absolute bottom-1 right-1 rounded-md bg-black/40 px-1.5 py-0.5 text-[9px] text-white backdrop-blur">
                  +{[12, 47, 89][i]}
                </div>
              </div>
            ))}
          </div>

          {/* mini stats */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <MiniStat label="Profile views" value="3.4x" />
            <MiniStat label="Calls / wk" value="+218%" />
            <MiniStat label="Direction taps" value="+162%" />
          </div>
        </div>
      </div>
    </CardFrame>
  );
}

function ActionChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-white/70 py-2.5 text-[10px] text-foreground/80 transition-colors hover:bg-white dark:bg-white/[0.03]">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

function DetailRow({ icon, text, highlight }: { icon: React.ReactNode; text: string; highlight?: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground/80">
      <span className="text-muted-foreground">{icon}</span>
      <span>
        {highlight && <span className="mr-1 font-medium text-[oklch(0.45_0.18_145)]">{highlight}</span>}
        {highlight ? text.replace(highlight, "").trim() : text}
      </span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white/70 p-2 dark:bg-white/[0.03]">
      <div className="font-display text-sm font-semibold text-foreground">{value}</div>
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------- Google Maps ---------- */

function GoogleMapsCard() {
  return (
    <CardFrame label="Google Maps" icon={<GoogleMapsIcon className="size-4" />} delay={0}>
      <div className="relative h-[240px] overflow-hidden rounded-2xl"
        style={{ background: "linear-gradient(135deg,#e8f0e8 0%,#dbe8db 50%,#cfe0d6 100%)" }}
      >
        {/* map background pattern */}
        <div className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0 22px, rgba(0,0,0,0.04) 22px 23px), repeating-linear-gradient(-45deg, transparent 0 30px, rgba(0,0,0,0.03) 30px 31px)",
          }}
        />
        {/* roads */}
        <div className="absolute left-0 right-0 top-[55%] h-1.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
        <div className="absolute bottom-0 top-0 left-[38%] w-1.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
        <div className="absolute left-0 right-0 top-[20%] h-1 bg-white/80" />
        {/* water blob */}
        <div className="absolute -bottom-6 -right-8 size-28 rounded-full bg-[#cfe3ee]/70 blur-sm" />
        {/* pins */}
        <Pin x="38%" y="55%" highlight />
        <Pin x="64%" y="32%" />
        <Pin x="72%" y="70%" />
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Bloom Salon &amp; Spa</div>
            <div className="text-xs text-muted-foreground">Hair Salon · 0.4 km · Open now</div>
          </div>
          <div className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">Top 3</div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5 text-[oklch(0.72_0.18_70)]">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}
          </span>
          <span>4.9 · 312 reviews on Google</span>
        </div>
      </div>
    </CardFrame>
  );
}

function Pin({ x, y, highlight }: { x: string; y: string; highlight?: boolean }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-full" style={{ left: x, top: y }}>
      {highlight && (
        <div className="absolute left-1/2 top-full size-12 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-primary/35 blur-md" />
      )}
      <div className={`relative flex size-8 items-center justify-center rounded-full ${
        highlight
          ? "bg-[#EA4335] text-white shadow-[0_4px_12px_rgba(234,67,53,0.5)]"
          : "bg-[#5F6368] text-white shadow-md"
      }`}>
        <MapPin className="size-4 fill-current" />
      </div>
    </div>
  );
}

/* ---------- WhatsApp ---------- */

function WhatsAppCard() {
  return (
    <CardFrame label="WhatsApp Auto-Reply" icon={<WhatsAppIcon className="size-4" />} delay={0.1}>
      <div className="rounded-2xl p-3"
        style={{ background: "linear-gradient(180deg,#e7ddd2 0%,#ded3c5 100%)" }}
      >
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-[#075E54] px-3 py-2 text-white">
          <div className="flex size-7 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">B</div>
          <div className="flex-1">
            <div className="text-xs font-medium">Bloom Salon</div>
            <div className="text-[9px] opacity-80">online · typing…</div>
          </div>
          <WhatsAppIcon className="size-4" />
        </div>
        <div className="space-y-2">
          <Bubble side="left">Hi, do you have an appointment today at 5 pm?</Bubble>
          <Bubble side="right" auto>
            Hi Riya! Yes, 5 pm is available with Anjali. Should I confirm? 💇‍♀️
          </Bubble>
          <Bubble side="left">Yes please, confirm it.</Bubble>
          <Bubble side="right" auto>
            Booked! See you at 5 pm. 📍 bit.ly/bloom-salon
          </Bubble>
        </div>
      </div>
      <div className="mt-3 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
        Auto-replied in 0.8 s · No staff needed
      </div>
    </CardFrame>
  );
}

function Bubble({ side, children, auto }: { side: "left" | "right"; children: React.ReactNode; auto?: boolean }) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[82%] rounded-lg px-3 py-1.5 text-xs leading-relaxed shadow-sm ${
        isRight ? "rounded-br-sm bg-[#DCF8C6] text-[#111]" : "rounded-bl-sm bg-white text-[#111]"
      }`}>
        <div>{children}</div>
        <div className="mt-0.5 flex items-center justify-end gap-1 text-[9px] text-black/50">
          {auto && <span className="rounded-sm bg-[#25D366]/20 px-1 text-[8px] uppercase tracking-wider text-[#075E54]">Auto</span>}
          5:02 PM {isRight && <CheckCheck className="size-3 text-[#34B7F1]" />}
        </div>
      </div>
    </div>
  );
}

/* ---------- Google Reviews ---------- */

function ReviewCard() {
  return (
    <CardFrame label="Google Reviews" icon={<GoogleIcon className="size-4" />} delay={0.2}>
      <div className="rounded-2xl border border-border bg-white/70 p-4 dark:bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-background">A</div>
          <div className="flex-1">
            <div className="text-sm font-medium">Aarav Mehta</div>
            <div className="text-[10px] text-muted-foreground">Local Guide · 14 reviews · 2 days ago</div>
          </div>
          <GoogleIcon className="size-4 opacity-80" />
        </div>
        <div className="mt-3 flex text-[oklch(0.72_0.18_70)]">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-foreground/90">
          Honestly the best service in the area. Super quick response on WhatsApp,
          professional staff, and very easy to find on Google. Highly recommend!
        </p>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
          <Check className="size-3 text-[oklch(0.55_0.18_145)]" />
          Auto-requested via Reflect review link
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <MiniStat label="Rating" value="4.9" />
        <MiniStat label="New reviews" value="+182" />
        <MiniStat label="Profile views" value="3.4x" />
      </div>
    </CardFrame>
  );
}
