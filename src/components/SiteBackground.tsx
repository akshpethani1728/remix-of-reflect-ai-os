import { ParticleField } from "./ParticleField";

export function SiteBackground() {
  return (
    <>
      <ParticleField />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, oklch(0.62 0.2 230 / 0.04), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.5 0.15 250 / 0.03), transparent 60%)",
        }}
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-background via-background to-transparent" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-background via-background to-transparent" />
    </>
  );
}
