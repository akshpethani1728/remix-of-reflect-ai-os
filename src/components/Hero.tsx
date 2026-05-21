import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Check, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { ThreeDOrbitalRings } from "./ThreeDElement";

const demoSlides = [
  {
    id: "maps",
    label: "Google Maps Listing",
    icon: <MapPin className="size-3.5" />,
    content: (
      <div>
        <div className="relative overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop&auto=format"
            alt="Google Maps on smartphone"
            className="w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Bloom Salon & Spa</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              0.4 km · <span className="text-emerald-500">Open</span> · 4.9★
            </div>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary">
            #1 in area
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["Directions", "Call", "Website", "Share"].map((label) => (
            <div key={label} className="rounded-lg border border-border bg-background/50 py-2 text-center text-[9px] text-muted-foreground cursor-default">
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp Auto-Reply",
    icon: <MessageCircle className="size-3.5" />,
    content: (
      <div className="rounded-xl bg-[#0e1d1d] p-3">
        <div className="mb-3 flex items-center gap-2.5 border-b border-white/10 pb-2.5">
          <div className="flex size-7 items-center justify-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">B</div>
          <div className="flex-1">
            <div className="text-xs font-medium">Bloom Salon</div>
            <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
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
    ),
  },
  {
    id: "reviews",
    label: "Review Management",
    icon: <Star className="size-3.5" />,
    content: (
      <div className="space-y-3">
        {[
          { name: "Priya Sharma", text: "Best salon in town! Anjali is amazing.", stars: 5, time: "12 min ago" },
          { name: "Rahul Verma", text: "Great service, highly recommend.", stars: 5, time: "2 hours ago" },
          { name: "Neha Kapoor", text: "Loved the new haircut. Will come again!", stars: 5, time: "Yesterday" },
        ].map((r) => (
          <div key={r.name} className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3 transition-all duration-500 hover:border-primary/20">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              {r.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-medium">{r.name}</div>
                <div className="shrink-0 text-[9px] text-muted-foreground">{r.time}</div>
              </div>
              <div className="mt-0.5 flex">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{r.text}</p>
            </div>
          </div>
        ))}
        <div className="rounded-lg bg-primary/5 p-2.5 text-center text-[9px] uppercase tracking-wider text-primary">
          Auto-requested by Reflect · 12 new reviews this week
        </div>
      </div>
    ),
  },
];

const liveEvents = [
  { icon: <MessageCircle className="size-3" />, text: "Riya booked a haircut via WhatsApp", time: "2s ago", color: "text-emerald-400" },
  { icon: <Star className="size-3" />, text: "Priya left a 5★ review on your GBP", time: "12s ago", color: "text-amber-400" },
  { icon: <PhoneCall className="size-3" />, text: "Call from +91 98765 43210 — AI answered", time: "45s ago", color: "text-primary" },
  { icon: <MapPin className="size-3" />, text: "Bloom Salon ranked #1 in your area", time: "2m ago", color: "text-primary" },
];

function ActivityTickerItem({ event, index }: { event: typeof liveEvents[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-center gap-2.5"
    >
      <span className={`flex shrink-0 items-center justify-center ${event.color}`}>
        {event.icon}
      </span>
      <span className="text-[10px] leading-tight text-muted-foreground">
        {event.text}
      </span>
      <span className="ml-auto shrink-0 text-[9px] text-muted-foreground/50">{event.time}</span>
    </motion.div>
  );
}

function LiveDemoCard() {
  const [[slideIndex, direction], setSlideIndex] = useState([0, 0]);

  useEffect(() => {
    const t = setInterval(() => {
      setSlideIndex(([cur]) => {
        const next = (cur + 1) % demoSlides.length;
        return [next, 1];
      });
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slide = demoSlides[slideIndex];
  const variants = {
    enter: (dir: number) => ({ y: 30, opacity: 0, scale: 0.97 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ y: -30, opacity: 0, scale: 0.97 }),
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/40 transition-all duration-500 hover:border-primary/30">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          {slide.icon}
          <span className="text-xs text-muted-foreground">{slide.label}</span>
        </div>
        <div className="flex gap-1.5">
          {demoSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSlideIndex([i, i > slideIndex ? 1 : -1])}
              className={`size-1.5 rounded-full transition-all duration-300 ${
                i === slideIndex ? "w-4 bg-primary" : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {slide.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const [eventIndex, setEventIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setEventIndex((i) => (i + 1) % liveEvents.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <ThreeDOrbitalRings />

      <motion.div style={{ scale: heroScale }}>
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr] lg:gap-16">

            {/* Left: Headline + CTA */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary"
              >
                <span className="size-1.5 rounded-full bg-primary" />
                Visibility Through Automation
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-[clamp(2.8rem,7vw,5rem)] font-semibold leading-[1.05] tracking-tight"
              >
                <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                  Get More Customers
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.25_240)] bg-clip-text text-transparent">
                  From Google
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                We help local businesses improve visibility, automate customer replies, and grow online.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-8 flex flex-wrap items-center gap-3"
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground"
              >
                {[
                  { icon: <Star className="size-3.5 fill-amber-400 text-amber-400" />, text: "4.9 Avg Rating" },
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

            {/* Right: Live Demo + Activity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <LiveDemoCard />

              <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card/30 px-5 py-3.5">
                <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-wider text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                  Live Activity
                </div>
                <div className="relative h-5 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <ActivityTickerItem key={eventIndex} event={liveEvents[eventIndex]} index={eventIndex} />
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Below: How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-24 max-w-4xl"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { step: "01", title: "Customer Finds You", desc: "Your business appears at the top of Google Maps & local search results.", icon: <MapPin className="size-4" /> },
                { step: "02", title: "We Automate Replies", desc: "WhatsApp & Instagram DMs get answered instantly, 24/7 — like a receptionist.", icon: <MessageCircle className="size-4" /> },
                { step: "03", title: "Bookings Grow", desc: "More visibility + instant replies = more appointments, calls, and customers.", icon: <Star className="size-4" /> },
              ].map((item, i) => (
                <div key={item.step} className="group relative overflow-hidden rounded-2xl border border-border bg-card/20 p-5 transition-all duration-500 hover:border-primary/30 hover:bg-card/40">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                      {item.step}
                    </div>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary/5 text-primary">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="mt-4 text-sm font-medium">{item.title}</h4>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
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
