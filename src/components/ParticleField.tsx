import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("oklch(0.09 0.01 260)");

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities: number[] = [];
    const initialPos: number[] = [];

    const prim = new THREE.Color("oklch(0.62 0.2 230)");
    const sec = new THREE.Color("oklch(0.5 0.15 250)");
    const acc = new THREE.Color("oklch(0.55 0.1 200)");

    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 28;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius * 0.6;
      const z = Math.cos(phi) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPos.push(x, y, z);

      const t = Math.random();
      const c = new THREE.Color().lerpColors(t < 0.5 ? prim : sec, t < 0.5 ? sec : acc, t < 0.5 ? t * 2 : (t - 0.5) * 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.08 + Math.random() * 0.25;
      velocities.push((Math.random() - 0.5) * 0.003);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("oklch(0.62 0.2 230 / 0.08)"),
      transparent: true,
      opacity: 0.3,
    });
    const lineGeo = new THREE.BufferGeometry();
    const maxLines = 200;
    const linePos = new Float32Array(maxLines * 3 * 2);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setDrawRange(0, 0);
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * 0.03;
      mouse.y += (mouse.ty - mouse.y) * 0.03;

      const pos = points.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const ix = initialPos[i3];
        const iy = initialPos[i3 + 1];
        const iz = initialPos[i3 + 2];

        const wave = Math.sin(t * 0.3 + i * 0.01) * 0.3;
        const wave2 = Math.cos(t * 0.2 + i * 0.007) * 0.3;

        const mx = mouse.x * 3;
        const my = mouse.y * 3;
        const dx = ix - mx;
        const dy = iy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const push = Math.max(0, 1 - dist / 15) * 2;

        pos[i3] = ix + wave + dx * push * 0.1;
        pos[i3 + 1] = iy + wave2 + dy * push * 0.1;
        pos[i3 + 2] = iz + Math.sin(t * 0.15 + i * 0.005) * 0.5;
      }
      points.geometry.attributes.position.needsUpdate = true;

      const lpos = lines.geometry.attributes.position.array as Float32Array;
      let lineCount = 0;

      for (let i = 0; i < count && lineCount < maxLines; i += 3) {
        const i3 = i * 3;
        const px = pos[i3];
        const py = pos[i3 + 1];
        const pz = pos[i3 + 2];

        for (let j = i + 1; j < count && lineCount < maxLines; j += 5) {
          const j3 = j * 3;
          const dx = px - pos[j3];
          const dy = py - pos[j3 + 1];
          const dz = pz - pos[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 3.5) {
            const li = lineCount * 6;
            lpos[li] = px;
            lpos[li + 1] = py;
            lpos[li + 2] = pz;
            lpos[li + 3] = pos[j3];
            lpos[li + 4] = pos[j3 + 1];
            lpos[li + 5] = pos[j3 + 2];
            lineCount++;
          }
        }
      }
      lines.geometry.setDrawRange(0, lineCount * 2);
      lines.geometry.attributes.position.needsUpdate = true;
      lines.material.opacity = Math.min(0.3, lineCount / maxLines * 0.3);

      points.rotation.y = t * 0.01 + mouse.x * 0.05;
      points.rotation.x = mouse.y * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      container.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
