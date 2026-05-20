import { motion } from "framer-motion";
import { SectionDivider, SectionHeader } from "./Services";

export function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <SectionDivider />
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Get in touch"
          title={<>Let's grow your <span className="text-neon">local business</span></>}
          subtitle="Book a free 20-minute audit. We'll show you exactly how to get more customers."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl glass-strong glow-shadow p-7 md:p-10"
        >
          <div className="absolute -top-32 left-1/2 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-3xl" />
          <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-2">
            <Field label="Name" placeholder="Your full name" />
            <Field label="Business" placeholder="Business name" />
            <Field label="WhatsApp" placeholder="+91 ..." />
            <Field label="City" placeholder="Where are you based?" />
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">What do you need help with?</label>
              <textarea
                rows={3}
                placeholder="e.g. more Google reviews, faster replies, more bookings"
                className="mt-2 w-full rounded-2xl glass px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.82_0.18_215/0.15)]"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="md:col-span-2 group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-medium text-background shadow-lg shadow-primary/25"
            >
              <span className="relative z-10">Request my free audit →</span>
              <motion.span
                className="absolute inset-0 -z-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
            <a
              href="https://wa.me/919999999999"
              className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm transition-colors hover:text-primary"
            >
              <span className="size-2 animate-pulse rounded-full bg-[oklch(0.7_0.2_145)]" />
              Or chat on WhatsApp
            </a>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl glass px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.82_0.18_215/0.15)]"
      />
    </div>
  );
}
