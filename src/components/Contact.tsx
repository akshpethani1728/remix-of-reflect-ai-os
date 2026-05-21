import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, MessageCircle, Clock, Send, CheckCircle, Phone } from "lucide-react";

const typingMessages = [
  "Hi! Thanks for reaching out to Reflect 👋",
  "We typically reply within 2 minutes during business hours.",
  "Want a free audit? Just tell us your business name and city!",
];

export function Contact() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setShowTyping(false);
      setTimeout(() => {
        setTypingIndex((i) => (i + 1) % typingMessages.length);
        setShowTyping(true);
      }, 300);
    }, 4000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section id="contact" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.05),transparent_65%)] blur-3xl"
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
            Contact
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Let's grow your business
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Book a free 20-minute audit. We'll show you exactly how to get more customers.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.3fr_1fr]">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-border bg-card/30 p-6 transition-all duration-500 hover:border-primary/20 md:p-8">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField label="Name" placeholder="Your full name" />
                  <InputField label="Business" placeholder="Business name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField label="WhatsApp" placeholder="+91 ..." type="tel" />
                  <InputField label="City" placeholder="Where are you based?" />
                </div>
                <div className="group">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-primary">
                    What do you need help with?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. more Google reviews, faster replies, more bookings"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-background/60 focus:shadow-[0_0_0_3px_oklch(0.62_0.2_230/0.08)] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-primary py-3.5 text-xs font-medium text-primary-foreground transition-all hover:brightness-110"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="size-3.5" />
                    Request Free Audit
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/15"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: Info + Live Chat Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Live Chat Preview */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card/30 transition-all duration-500 hover:border-primary/20">
              <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
                <div className="relative">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary">
                    R
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-card bg-emerald-500" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium">Reflect Support</div>
                  <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Online — replies in ~2 min
                  </div>
                </div>
                <Clock className="size-3.5 text-muted-foreground" />
              </div>
              <div className="p-5">
                <div className="h-16">
                  <AnimatePresence mode="wait">
                    {showTyping && (
                      <motion.div
                        key={typingIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-start gap-2.5"
                      >
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[8px] font-medium text-primary">
                          R
                        </div>
                        <div className="rounded-xl rounded-tl-sm bg-primary/10 px-3.5 py-2">
                          <p className="text-[11px] leading-relaxed text-foreground/90">{typingMessages[typingIndex]}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[9px] text-muted-foreground">
                  <span className="flex gap-0.5">
                    <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="size-1 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                  Typing...
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="rounded-2xl border border-border bg-card/20 p-5 transition-all duration-500 hover:border-primary/20">
              <div className="space-y-4">
                {[
                  { icon: <MessageCircle className="size-4" />, label: "WhatsApp", value: "+91 99999 99999", href: "https://wa.me/919999999999" },
                  { icon: <Phone className="size-4" />, label: "Call", value: "+91 99999 99999", href: "tel:+919999999999" },
                  { icon: <MapPin className="size-4" />, label: "Service Area", value: "India — All Major Cities" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-xs font-medium text-foreground transition-colors hover:text-primary">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-xs font-medium text-foreground">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/20 px-5 py-3.5 transition-all duration-500 hover:border-primary/20">
              <CheckCircle className="size-4 shrink-0 text-emerald-500" />
              <div className="text-[10px] leading-relaxed text-muted-foreground">
                <span className="text-foreground">Free audit</span> — No commitment. We'll show you exactly where you're losing customers.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div className="group">
      <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-primary">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-border bg-background/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-background/60 focus:shadow-[0_0_0_3px_oklch(0.62_0.2_230/0.08)]"
      />
    </div>
  );
}
