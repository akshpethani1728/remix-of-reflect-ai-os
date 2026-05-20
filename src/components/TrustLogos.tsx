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
  { value: "480+", label: "Businesses Served" },
  { value: "4.9", label: "Avg. Rating" },
  { value: "7 days", label: "Onboarding" },
  { value: "24/7", label: "Support" },
];

export function TrustLogos() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Powering local businesses across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            {logos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
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
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-3xl font-semibold text-gradient md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}