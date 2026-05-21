import { motion } from "framer-motion";

const items = [
  { q: "Bookings tripled in 60 days. WhatsApp replies are instant and customers love it.", n: "Ananya R.", r: "Owner, Bloom Salon" },
  { q: "We now rank #1 on Google Maps for our area. Walk-ins are up every week.", n: "Rahul M.", r: "Founder, FitForge Gym" },
  { q: "Reflect replies to 4 out of 10 enquiries on its own. Pure time saved.", n: "Sneha K.", r: "Director, Curate Interiors" },
  { q: "Our Google rating went from 4.1 to 4.8 in three months. Customers trust us more.", n: "Pooja S.", r: "Owner, Spice Trail Café" },
];

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.2_230/0.04),transparent_65%)] blur-3xl"
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
            Testimonials
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Loved by local businesses
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="group rounded-2xl border border-border bg-card/30 p-6 transition-all duration-500 hover:border-primary/20 hover:bg-card/50"
            >
              <div className="flex items-center gap-1 text-primary/60 text-xs">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{t.q}"</p>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                  {t.n.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-medium">{t.n}</div>
                  <div className="text-[10px] text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
