import { useEffect, useRef } from "react";

/**
 * 3D particle wave field — a grid of points projected in perspective,
 * undulating like a silk surface and reacting to the cursor.
 * Pure canvas, no three.js, ~60fps.
 */
export function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0,
      h = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2);

    // mouse in normalized [-1,1]
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);

    // grid params
    const COLS = 56;
    const ROWS = 32;
    const SPACING = 38; // world units between points

    // simple perspective projector
    const project = (x: number, y: number, z: number) => {
      const focal = 620;
      const cz = focal + z;
      const k = focal / cz;
      return { x: w / 2 + x * k, y: h / 2 + y * k, k };
    };

    // emerald palette
    const primary = "14, 168, 116"; // rgb of #0ea874
    const violet = "94, 124, 224";

    const draw = (t: number) => {
      // smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const time = t * 0.0009;
      const tiltX = mouse.y * 0.35; // tilt the plane
      const tiltZ = mouse.x * 0.35;

      // pre-compute all projected points
      const pts: { x: number; y: number; k: number; h: number }[] = [];
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const x = (i - COLS / 2) * SPACING;
          const z = (j - ROWS / 2) * SPACING;

          // height field: layered sines + mouse ripple
          const dx = i / COLS - 0.5 - mouse.x * 0.5;
          const dz = j / ROWS - 0.5 - mouse.y * 0.5;
          const dist = Math.sqrt(dx * dx + dz * dz);

          const h1 = Math.sin(i * 0.35 + time * 1.6) * 18;
          const h2 = Math.cos(j * 0.28 + time * 1.3) * 18;
          const ripple = Math.sin(dist * 14 - time * 4) * 22 * Math.exp(-dist * 2.2);
          const yh = h1 + h2 + ripple;

          // apply tilt (rotate around X then Z lightly)
          const ry = yh - z * tiltX;
          const rz = z + yh * tiltX;
          const rx = x + ry * tiltZ * 0.3;

          const p = project(rx, ry - 60, rz + 480);
          pts.push({ x: p.x, y: p.y, k: p.k, h: yh });
        }
      }

      // draw connecting lines (horizontal + vertical)
      ctx.lineWidth = 1;
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS - 1; i++) {
          const a = pts[j * COLS + i];
          const b = pts[j * COLS + i + 1];
          const alpha = Math.max(0, Math.min(0.22, a.k * 0.32));
          ctx.strokeStyle = `rgba(${primary}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (let j = 0; j < ROWS - 1; j++) {
        for (let i = 0; i < COLS; i++) {
          const a = pts[j * COLS + i];
          const b = pts[(j + 1) * COLS + i];
          const alpha = Math.max(0, Math.min(0.18, a.k * 0.26));
          ctx.strokeStyle = `rgba(${violet}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // draw points on peaks
      for (let n = 0; n < pts.length; n++) {
        const p = pts[n];
        if (p.h < 6) continue;
        const r = Math.max(0.6, p.k * 1.8);
        const a = Math.min(0.85, p.k * 1.1);
        ctx.fillStyle = `rgba(${primary}, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base */}
      <div className="absolute inset-0 bg-background" />

      {/* soft tinted aurora wash */}
      <div
        className="absolute -inset-[15%] opacity-70"
        style={{
          background:
            "radial-gradient(45% 40% at 25% 25%, oklch(0.85 0.14 162 / 0.35), transparent 60%), radial-gradient(40% 35% at 80% 65%, oklch(0.78 0.12 200 / 0.28), transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* the 3D wave canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 45%, black 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 45%, black 40%, transparent 95%)",
        }}
      />

      {/* faint grid for depth */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* film grain */}
      <div className="absolute inset-0 noise-bg opacity-[0.05] mix-blend-multiply" />

      {/* edge vignettes */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
