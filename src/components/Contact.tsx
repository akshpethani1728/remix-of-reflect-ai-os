import { motion } from "framer-motion";
import { SectionDivider, SectionHeader } from "./Services";
import { useState } from "react";

export function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section id="contact" className="relative py-28">
      <SectionDivider />
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/3 -z-10 size-[400px] rounded-full bg-[radial-gradient(circle,oklch(0.68_0.16_162/0.15),transparent_70%)] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-1/3 -z-10 size-[400px] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_158/0.12),transparent_70%)] blur-3xl" />

      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Get in touch"
          title={<>Let's grow your <span className="text-neon">local business</span></>}
          subtitle="Book a free 20-minute audit. We'll show you exactly how to get more customers."
        />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl glass-strong glow-shadow p-7 md:p-10"
        >
          <div className="absolute -top-32 left-1/2 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-3xl" />
          <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Field label="Name" placeholder="Your full name" onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} focused={focusedField === "name"} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Field label="Business" placeholder="Business name" onFocus={() => setFocusedField("business")} onBlur={() => setFocusedField(null)} focused={focusedField === "business"} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Field label="WhatsApp" placeholder="+91 ..." onFocus={() => setFocusedField("whatsapp")} onBlur={() => setFocusedField(null)} focused={focusedField === "whatsapp"} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Field label="City" placeholder="Where are you based?" onFocus={() => setFocusedField("city")} onBlur={() => setFocusedField(null)} focused={focusedField === "city"} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2"
            >
              <label className="text-xs uppercase tracking-widest text-muted-foreground">What do you need help with?</label>
              <motion.textarea
                rows={3}
                placeholder="e.g. more Google reviews, faster replies, more bookings"
                className="mt-2 w-full rounded-2xl glass px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.82_0.18_215/0.15)]"
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px -10px oklch(0.68 0.16 162/0.5)" }}
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
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-full bg-primary/50 blur-lg opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.a
              href="https://wa.me/919999999999"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3 text-sm transition-colors hover:text-primary"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="size-2 rounded-full bg-[oklch(0.7_0.2_145)]"
              />
              Or chat on WhatsApp
            </motion.a>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text", focused, onFocus, onBlur }: { label: string; placeholder: string; type?: string; focused?: boolean; onFocus?: () => void; onBlur?: () => void }) {
  return (
    <div>
      <motion.label
        className="text-xs uppercase tracking-widest text-muted-foreground"
        animate={{ color: focused ? "oklch(0.68 0.16 162)" : "oklch(0.5 0.02 160)" }}
      >
        {label}
      </motion.label>
      <motion.input
        type={type}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        whileFocus={{ scale: 1.02 }}
        className="mt-2 w-full rounded-2xl glass px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[0_0_0_4px_oklch(0.82_0.18_215/0.15)]"
      />
    </div>
  );
}
