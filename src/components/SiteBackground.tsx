export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div
        className="absolute -inset-[40%] animate-[drift_25s_ease-in-out_infinite] opacity-40"
        style={{
          background:
            "radial-gradient(35% 30% at 20% 20%, oklch(0.62 0.2 230 / 0.08), transparent 70%), radial-gradient(30% 25% at 80% 60%, oklch(0.62 0.2 230 / 0.05), transparent 70%), radial-gradient(25% 25% at 50% 80%, oklch(0.55 0.15 250 / 0.04), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div
        className="absolute -inset-[40%] animate-[drift_35s_ease-in-out_infinite_reverse] opacity-30"
        style={{
          background:
            "radial-gradient(30% 25% at 60% 30%, oklch(0.62 0.2 230 / 0.06), transparent 70%), radial-gradient(25% 30% at 30% 70%, oklch(0.5 0.15 240 / 0.04), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background to-transparent" />
    </div>
  );
}
