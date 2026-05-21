export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div
        className="absolute -inset-[30%] opacity-30"
        style={{
          background:
            "radial-gradient(40% 35% at 25% 25%, oklch(0.65 0.18 230 / 0.08), transparent 70%), radial-gradient(35% 30% at 80% 75%, oklch(0.65 0.18 230 / 0.06), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
