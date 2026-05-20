import { motion } from "framer-motion";

const logos = [
  { name: "Google", icon: "🔍" },
  { name: "WhatsApp", icon: "💬" },
  { name: "Instagram", icon: "📸" },
  { name: "YouTube", icon: "▶️" },
  { name: "Facebook", icon: "📘" },
  { name: "Maps", icon: "📍" },
];

const stats = [
  { value: "480+", label: "Businesses Served", icon: "🏢" },
  { value: "4.9", label: "Avg. Rating", icon: "⭐" },
  { value: "7 days", label: "Onboarding", icon: "⚡" },
  { value: "24/7", label: "Support", icon: "🎯" },
];

export function TrustLogos() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.68_0.16_162/0.08),transparent_70%)] blur-3xl" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Powering local businesses across India
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 0.5, y: 0, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors"
              >
                <span className="text-lg">{logo.icon}</span>
                <span>{logo.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative text-center"
            >
              {/* Card background */}
              <div className="glass rounded-2xl p-4 transition-all duration-300 group-hover:bg-primary/5 group-hover:shadow-[0_0_30px_-10px_oklch(0.68_0.16_162/0.3)]">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                >
                  <span className="mb-2 block text-2xl">{stat.icon}</span>
                </motion.div>
                <div className="font-display text-3xl font-semibold text-gradient md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}