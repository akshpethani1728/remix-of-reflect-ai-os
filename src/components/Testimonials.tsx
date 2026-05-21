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
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Testimonials
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Loved by local businesses
          </h2>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-2">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card/50 p-5"
            >
              <div className="text-primary/80 text-xs">★★★★★</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">"{t.q}"</p>
              <div className="mt-3 border-t border-border pt-3">
                <div className="text-xs font-medium">{t.n}</div>
                <div className="text-[10px] text-muted-foreground">{t.r}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
