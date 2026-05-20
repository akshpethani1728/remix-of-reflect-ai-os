import { SectionDivider, SectionHeader } from "./Services";

const items = [
  { q: "Bookings tripled in 60 days. WhatsApp replies are instant and customers love it.", n: "Ananya R.", r: "Owner, Bloom Salon" },
  { q: "We now rank #1 on Google Maps for our area. Walk-ins are up every week.", n: "Rahul M.", r: "Founder, FitForge Gym" },
  { q: "Reflect replies to 4 out of 10 enquiries on its own. Pure time saved.", n: "Sneha K.", r: "Director, Curate Interiors" },
  { q: "Feels like having a marketing team without the cost. Simple and effective.", n: "Vikram J.", r: "CEO, NorthStar Dental" },
  { q: "Our Google rating went from 4.1 to 4.8 in three months. Customers trust us more.", n: "Pooja S.", r: "Owner, Spice Trail Café" },
  { q: "Clean, simple, and our customers actually respond to the new flow.", n: "Arjun T.", r: "COO, Urban Auto" },
];

function Card({ q, n, r }: { q: string; n: string; r: string }) {
  return (
    <div className="mx-3 w-[340px] shrink-0 rounded-3xl glass p-6 glow-border">
      <div className="text-primary">★★★★★</div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{q}"</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="size-9 rounded-full bg-gradient-to-br from-primary to-accent" />
        <div>
          <div className="text-sm font-medium">{n}</div>
          <div className="text-xs text-muted-foreground">{r}</div>
        </div>
      </div>
    </div>
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
