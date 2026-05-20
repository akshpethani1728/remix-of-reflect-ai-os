import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* soft glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-32 -z-10 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.18_162/0.35),transparent_65%)] blur-2xl" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-7 flex justify-center"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_10px_oklch(0.82_0.18_215)]" />
            Visibility With Automation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto max-w-4xl text-center text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">Get More Customers</span>
          <br />
          <span className="text-foreground">Through Google &amp; </span>
          <span className="text-neon">Automation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-center text-base text-muted-foreground md:text-lg"
        >
          We help local businesses improve visibility, automate customer replies,
          and grow their online presence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#pricing">See Pricing →</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">Free Business Audit</MagneticButton>
        </motion.div>

        {/* clean 3D object */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mx-auto mt-20 flex h-[320px] w-full max-w-xl items-center justify-center md:h-[400px]"
        >
          <Sphere />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span>Trusted by 480+ local businesses</span>
          <span className="hidden h-3 w-px bg-border md:block" />
          <span>4.9 average client rating</span>
          <span className="hidden h-3 w-px bg-border md:block" />
          <span>Onboarding in 7 days</span>
        </motion.div>
      </div>
    </section>
  );
}

function Sphere() {
  return (
    <div className="relative size-[260px] md:size-[360px]">
      <div className="absolute inset-0 animate-spin-slow rounded-full border border-primary/25 [mask-image:linear-gradient(transparent,black,transparent)]" />
      <div
        className="absolute inset-8 animate-spin-slow rounded-full border border-accent/25 [mask-image:linear-gradient(90deg,transparent,black,transparent)]"
        style={{ animationDirection: "reverse", animationDuration: "28s" }}
      />
      <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-primary via-accent to-violet blur-[2px] glow-shadow animate-pulse-glow" />
      <div className="absolute inset-[28%] rounded-full bg-background/60 backdrop-blur-xl" />
      <div className="absolute inset-[32%] rounded-full bg-gradient-to-br from-primary/70 to-accent/70 shadow-[inset_0_0_50px_oklch(0_0_0/0.5)]" />
    </div>
  );
}
