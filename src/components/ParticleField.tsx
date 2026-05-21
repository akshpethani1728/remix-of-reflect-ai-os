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
    scene.background = new THREE.Color(0x0a0a0f);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const anchor = new Float32Array(count * 3);

    const prim = new THREE.Color(0x4a8eff);
    const sec = new THREE.Color(0x6b5bff);
    const acc = new THREE.Color(0x3ac5ff);

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius * 0.5;
      const z = Math.cos(phi) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      anchor[i * 3] = x;
      anchor[i * 3 + 1] = y;
      anchor[i * 3 + 2] = z;

      const t = Math.random();
      const c = prim.clone().lerp(t < 0.5 ? sec : acc, t < 0.5 ? t * 2 : (t - 0.5) * 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4a8eff,
      transparent: true,
      opacity: 0.12,
    });
    const maxLines = 120;
    const linePos = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
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

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      const pos = points.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const ax = anchor[i3];
        const ay = anchor[i3 + 1];
        const az = anchor[i3 + 2];

        const waveX = Math.sin(t * 0.25 + i * 0.008) * 0.4;
        const waveY = Math.cos(t * 0.2 + i * 0.006) * 0.4;
        const waveZ = Math.sin(t * 0.15 + i * 0.01) * 0.3;

        const mx = mouse.x * 4;
        const my = mouse.y * 4;
        const dx = ax - mx;
        const dy = ay - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const push = Math.max(0, 1 - dist / 18) * 3;

        pos[i3] = ax + waveX + dx * push * 0.08;
        pos[i3 + 1] = ay + waveY + dy * push * 0.08;
        pos[i3 + 2] = az + waveZ;
      }
      points.geometry.attributes.position.needsUpdate = true;

      const lpos = lines.geometry.attributes.position.array as Float32Array;
      let lineCount = 0;

      for (let i = 0; i < count && lineCount < maxLines; i += 4) {
        const i3 = i * 3;
        const px = pos[i3];
        const py = pos[i3 + 1];
        const pz = pos[i3 + 2];

        for (let j = i + 4; j < count && lineCount < maxLines; j += 6) {
          const j3 = j * 3;
          const dx = px - pos[j3];
          const dy = py - pos[j3 + 1];
          const dz = pz - pos[j3 + 2];
          if (dx * dx + dy * dy + dz * dz < 14) {
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
      lineGeo.setDrawRange(0, lineCount * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lines.material.opacity = Math.min(0.12, lineCount / maxLines * 0.12);

      points.rotation.y = t * 0.008 + mouse.x * 0.04;
      points.rotation.x = mouse.y * 0.02;

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
