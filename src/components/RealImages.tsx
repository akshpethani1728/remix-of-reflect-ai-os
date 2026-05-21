import { motion } from "framer-motion";
import { StaggerItem } from "./Reveal";

const images = [
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format",
    alt: "Team working on business growth",
    caption: "Dedicated account managers for every business",
    aspect: "aspect-[3/2]",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=700&fit=crop&auto=format",
    alt: "Business owner reviewing analytics",
    caption: "Real-time performance tracking",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format",
    alt: "Team collaboration session",
    caption: "Strategy sessions that drive results",
    aspect: "aspect-[3/2]",
  },
];

export function RealImages() {
  return (
    <section className="relative py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Our Team
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            Real people behind the growth
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            We're a team of strategists, designers, and automation experts.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {images.map((img, i) => (
            <StaggerItem key={i} i={i}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/30">
                <div className={`${img.aspect} overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="size-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs font-medium text-foreground/90">{img.caption}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
