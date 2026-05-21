import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.05),transparent_65%)] blur-3xl"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 max-w-lg"
        >
          <div className="rounded-2xl border border-border bg-card/30 p-6 md:p-8 transition-all duration-500 hover:border-primary/20">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-primary">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-background/60 focus:shadow-[0_0_0_3px_oklch(0.62_0.2_230/0.08)]"
                  />
                </div>
                <div className="group">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-primary">
                    Business
                  </label>
                  <input
                    type="text"
                    placeholder="Business name"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-background/60 focus:shadow-[0_0_0_3px_oklch(0.62_0.2_230/0.08)]"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-primary">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 ..."
                    className="mt-1.5 w-full rounded-lg border border-border bg-background/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-background/60 focus:shadow-[0_0_0_3px_oklch(0.62_0.2_230/0.08)]"
                  />
                </div>
                <div className="group">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground transition-colors group-focus-within:text-primary">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Where are you based?"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all duration-300 focus:border-primary/50 focus:bg-background/60 focus:shadow-[0_0_0_3px_oklch(0.62_0.2_230/0.08)]"
                  />
                </div>
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
                <span className="relative z-10">Request Free Audit →</span>
                <motion.div
                  className="absolute inset-0 bg-white/15"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </button>
              <a
                href="https://wa.me/919999999999"
                className="flex items-center justify-center gap-2.5 rounded-xl border border-border py-3 text-xs text-muted-foreground transition-all hover:bg-card hover:text-foreground"
              >
                <span className="flex size-2 items-center justify-center">
                  <span className="size-1.5 rounded-full bg-[oklch(0.6_0.2_145)]" />
                </span>
                Or chat on WhatsApp
              </a>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
