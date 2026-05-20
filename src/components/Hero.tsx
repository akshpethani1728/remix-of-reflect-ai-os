import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* Enhanced ambient glows */}
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/4 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.18_162/0.2),transparent_70%)] blur-3xl animate-pulse" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 size-[400px] translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_158/0.15),transparent_70%)] blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating particles */}
      <FloatingOrbs />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-7 flex justify-center"
        >
          <motion.span
            animate={{ y: [0, -5, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_10px_oklch(0.82_0.18_215)]" />
            Visibility With Automation
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto max-w-4xl text-center text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gradient inline-block"
          >
            Get 10x More Calls
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-foreground"
          >
            From{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-neon inline-block"
          >
            Google Searches
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-center text-base text-muted-foreground md:text-lg"
        >
          We help local businesses rank #1 on Google Maps, automate replies on WhatsApp & Instagram, and turn every inquiry into a booked customer.
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

        {/* Enhanced 3D sphere with more effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.4, type: "spring" }}
          className="relative mx-auto mt-20 flex h-[320px] w-full max-w-xl items-center justify-center md:h-[400px]"
        >
          <EnhancedSphere />
        </motion.div>

        {/* Floating trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          <FloatingBadge icon="🏆" text="480+ Businesses" />
          <FloatingBadge icon="⭐" text="4.9 Rating" />
          <FloatingBadge icon="⚡" text="7 Day Setup" />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingOrbs() {
  const orbs = [
    { size: 8, x: "10%", y: "20%", delay: 0 },
    { size: 6, x: "85%", y: "15%", delay: 0.5 },
    { size: 10, x: "75%", y: "70%", delay: 1 },
    { size: 5, x: "20%", y: "80%", delay: 1.5 },
    { size: 7, x: "90%", y: "45%", delay: 2 },
    { size: 4, x: "5%", y: "60%", delay: 0.8 },
  ];

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: orb.delay + 0.5 }}
          className="pointer-events-none absolute rounded-full bg-primary/30 blur-sm"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </>
  );
}

function FloatingBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm"
    >
      <span>{icon}</span>
      <span className="text-muted-foreground">{text}</span>
    </motion.div>
  );
}

function EnhancedSphere() {
  return (
    <div className="relative size-[260px] md:size-[360px]">
      {/* Multiple orbiting rings */}
      <motion.div className="absolute inset-0 rounded-full border border-primary/20 [mask-image:linear-gradient(transparent,black,transparent)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div className="absolute inset-4 rounded-full border border-accent/20 [mask-image:linear-gradient(90deg,transparent,black,transparent)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div className="absolute inset-12 rounded-full border border-violet/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div className="absolute inset-16 rounded-full border border-primary/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner glowing core */}
      <motion.div
        className="absolute inset-[20%] rounded-full bg-gradient-to-br from-primary via-accent to-violet blur-md"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glass layer */}
      <div className="absolute inset-[26%] rounded-full bg-background/50 backdrop-blur-xl" />

      {/* Inner gradient */}
      <motion.div
        className="absolute inset-[30%] rounded-full bg-gradient-to-br from-primary/60 to-accent/60"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "inset 0 0 60px oklch(0_0_0/0.4)" }}
      />

      {/* Center glow */}
      <motion.div
        className="absolute inset-[40%] rounded-full bg-gradient-to-br from-primary/80 to-accent/80 blur-sm"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
