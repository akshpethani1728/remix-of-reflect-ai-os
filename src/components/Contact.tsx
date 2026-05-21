import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.65_0.18_230/0.06),transparent_65%)] blur-3xl"
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Contact
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Let's grow your business
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Book a free 20-minute audit. We'll show you exactly how to get more customers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 max-w-lg rounded-2xl border border-border bg-card/50 p-6 md:p-8"
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Business</label>
                <input
                  type="text"
                  placeholder="Business name"
                  className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/50"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+91 ..."
                  className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">City</label>
                <input
                  type="text"
                  placeholder="Where are you based?"
                  className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/50"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground">What do you need help with?</label>
              <textarea
                rows={3}
                placeholder="e.g. more Google reviews, faster replies, more bookings"
                className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/50 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-xs font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              Request Free Audit →
            </button>
            <a
              href="https://wa.me/919999999999"
              className="flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-xs text-muted-foreground transition-all hover:bg-card"
            >
              <span className="size-1.5 rounded-full bg-[oklch(0.65_0.2_145)]" />
              Or chat on WhatsApp
            </a>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
