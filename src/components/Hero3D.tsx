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
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const coreGeo = new THREE.IcosahedronGeometry(1, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("oklch(0.62 0.2 230)"),
      metalness: 0.3,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      envMapIntensity: 0.6,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const innerGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 0),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("oklch(0.62 0.2 230 / 0.25)"),
        wireframe: true,
        transparent: true,
      })
    );
    scene.add(innerGlow);

    const outerWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 0),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("oklch(0.62 0.2 230 / 0.12)"),
        wireframe: true,
        transparent: true,
      })
    );
    scene.add(outerWire);

    const rings: THREE.Mesh[] = [];
    const ringConfigs = [
      { radius: 2.4, tube: 0.012, color: "oklch(0.62 0.2 230 / 0.2)", speed: 0.08, rotX: Math.PI / 3, rotY: 0 },
      { radius: 2.8, tube: 0.008, color: "oklch(0.5 0.15 250 / 0.15)", speed: -0.06, rotX: -Math.PI / 4, rotY: Math.PI / 6 },
      { radius: 2.0, tube: 0.01, color: "oklch(0.55 0.1 200 / 0.12)", speed: 0.1, rotX: Math.PI / 2, rotY: Math.PI / 4 },
    ];

    const glowRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("oklch(0.62 0.2 230 / 0.15)"),
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0.5,
    });
    const glowRing = new THREE.Mesh(
      new THREE.RingGeometry(1.8, 2.2, 48),
      glowRingMat
    );
    glowRing.rotation.x = -Math.PI / 2;
    scene.add(glowRing);

    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 64);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(cfg.color),
        transparent: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = cfg.rotX;
      mesh.rotation.y = cfg.rotY;
      mesh.userData = { speed: cfg.speed };
      scene.add(mesh);
      rings.push(mesh);
    });

    const particlesGeo = new THREE.BufferGeometry();
    const pCount = 200;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      pPos[i * 3 + 2] = Math.cos(phi) * r;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: new THREE.Color("oklch(0.62 0.2 230)"),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

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
      const mx = mouseRef.current.x * 0.5;
      const my = mouseRef.current.y * 0.5;

      core.rotation.x = my + t * 0.2;
      core.rotation.y = mx + t * 0.3;
      core.position.y = Math.sin(t * 0.6) * 0.2;

      innerGlow.rotation.x = my + t * 0.15;
      innerGlow.rotation.y = mx + t * 0.25;
      innerGlow.position.y = Math.sin(t * 0.6 + 0.3) * 0.2;

      outerWire.rotation.x = my * 0.5 + t * 0.1;
      outerWire.rotation.y = mx * 0.5 + t * 0.15;

      rings.forEach((ring) => {
        ring.rotation.z += ring.userData.speed * 0.016;
        ring.position.y = Math.sin(t * 0.4 + ring.radius) * 0.15;
      });

      glowRing.rotation.z = t * 0.05;
      glowRing.position.y = Math.sin(t * 0.5) * 0.15;
      glowRing.material.opacity = 0.3 + Math.sin(t * 0.8) * 0.15;

      particles.rotation.x = my * 0.2 + t * 0.05;
      particles.rotation.y = mx * 0.2 + t * 0.08;

      const ppos = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        const angle = t * 0.1 + i * 0.05;
        ppos[i3] += Math.sin(angle) * 0.002;
        ppos[i3 + 1] += Math.cos(angle * 1.3) * 0.002;
        ppos[i3 + 2] += Math.sin(angle * 0.7) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;

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
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m: THREE.Material) => m.dispose());
          else obj.material?.dispose();
        }
      });
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
