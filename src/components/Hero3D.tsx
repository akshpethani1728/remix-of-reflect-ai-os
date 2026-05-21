import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("oklch(0.62 0.2 230)"),
      metalness: 0.1,
      roughness: 0.3,
      transparent: true,
      opacity: 0.6,
      wireframe: false,
      envMapIntensity: 0.4,
      clearcoat: 0.3,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.45, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("oklch(0.62 0.2 230 / 0.15)"),
      wireframe: true,
      transparent: true,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    const ringGeo = new THREE.TorusGeometry(1.8, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("oklch(0.62 0.2 230 / 0.2)"),
      transparent: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.01, 16, 64),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("oklch(0.62 0.2 230 / 0.1)"),
        transparent: true,
      })
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: -((e.clientY - r.top) / r.height) * 2 + 1,
      };
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const mx = mouseRef.current.x * 0.3;
      const my = mouseRef.current.y * 0.3;

      mesh.rotation.x = my + t * 0.15;
      mesh.rotation.y = mx + t * 0.2;
      mesh.position.y = Math.sin(t * 0.5) * 0.15;

      wire.rotation.x = my + t * 0.12;
      wire.rotation.y = mx + t * 0.18;
      wire.position.y = Math.sin(t * 0.5 + 0.5) * 0.15;

      ring.rotation.z = t * 0.08;
      ring.position.y = Math.sin(t * 0.4) * 0.1;

      ring2.rotation.y = t * 0.06;
      ring2.position.y = Math.sin(t * 0.4 + 0.3) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
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
      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
