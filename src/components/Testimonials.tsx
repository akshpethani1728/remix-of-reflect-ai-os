import { motion } from "framer-motion";
import { SectionDivider, SectionHeader } from "./Services";

const items = [
  { q: "Bookings tripled in 60 days. WhatsApp replies are instant and customers love it.", n: "Ananya R.", r: "Owner, Bloom Salon", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { q: "We now rank #1 on Google Maps for our area. Walk-ins are up every week.", n: "Rahul M.", r: "Founder, FitForge Gym", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { q: "Reflect replies to 4 out of 10 enquiries on its own. Pure time saved.", n: "Sneha K.", r: "Director, Curate Interiors", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { q: "Feels like having a marketing team without the cost. Simple and effective.", n: "Vikram J.", r: "CEO, NorthStar Dental", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { q: "Our Google rating went from 4.1 to 4.8 in three months. Customers trust us more.", n: "Pooja S.", r: "Owner, Spice Trail Café", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { q: "Clean, simple, and our customers actually respond to the new flow.", n: "Arjun T.", r: "COO, Urban Auto", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
];

function Card({ q, n, r, img }: { q: string; n: string; r: string; img: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-3 w-[340px] shrink-0 rounded-3xl glass p-6 glow-border hover:shadow-[0_0_60px_-15px_oklch(0.7_0.18_162/0.5)] transition-shadow"
    >
      <div className="text-primary">★★★★★</div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{q}"</p>
      <div className="mt-5 flex items-center gap-3">
        <img src={img} alt={n} className="size-10 rounded-full object-cover ring-2 ring-primary/20" />
        <div>
          <div className="text-sm font-medium">{n}</div>
          <div className="text-xs text-muted-foreground">{r}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const loop = [...items, ...items];
  return (
    <section className="relative py-28">
      <SectionDivider />
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Loved by local businesses"
          title={<>Real owners. <span className="text-neon">Real growth.</span></>}
        />
      </div>
      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-[scroll_45s_linear_infinite]" style={{ width: "max-content" }}>
          {loop.map((t, i) => <Card key={i} {...t} />)}
        </div>
        <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>
    </section>
  );
}
