"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { KSA_PATH, KSA_VIEWBOX, type MapStyle } from "./map-data";

/**
 * 3D atlas map. The Saudi outline (Natural Earth) is extruded into a relief block whose top carries an
 * artistic relief texture (Higgsfield, concept art, not survey data). Each style is a gold beam with an
 * HTML badge projected on top; badges are the click targets so they stay keyboard and screen-reader
 * friendly. Selecting a style flies the camera to it; with nothing selected the map slowly orbits.
 */

const [, , VB_W, VB_H] = KSA_VIEWBOX.split(" ").map(Number) as [number, number, number, number];
const CX = VB_W / 2;
const CY = VB_H / 2;
/** The texture was painted on a 5:4 frame: the viewBox padded by this much on each side horizontally. */
const TEX_PAD_X = (VB_H * 1.25 - VB_W) / 2;
const TOP = 22;
const TEXTURE = "/images/atlas/map/ksa-relief.webp";

type Props = {
  styles: MapStyle[];
  live: Set<string>;
  active: string | null;
  hover: string | null;
  onSelect: (key: string) => void;
  onHover: (key: string | null) => void;
  name: (s: MapStyle) => string;
  num: (n: number) => string;
  ariaLabel: string;
};

function parseOutline(d: string): THREE.Vector2[][] {
  const polys: THREE.Vector2[][] = [];
  for (const part of d.split(/Z/i)) {
    const nums = part.match(/-?\d+(?:\.\d+)?/g);
    if (!nums || nums.length < 6) continue;
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i + 1 < nums.length; i += 2) pts.push(new THREE.Vector2(Number(nums[i]) - CX, -(Number(nums[i + 1]) - CY)));
    polys.push(pts);
  }
  return polys;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function AtlasMap3D({ styles, live, active, hover, onSelect, onHover, name, num, ariaLabel }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const api = useRef<{ focus: (key: string | null) => void; mark: (active: string | null, hover: string | null) => void } | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.className = "rwk-3d__canvas";
    host.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#04130e");
    scene.fog = new THREE.Fog("#04130e", 900, 2100);

    const camera = new THREE.PerspectiveCamera(38, 1, 1, 5000);
    const HOME = { pos: new THREE.Vector3(0, 720, 700), target: new THREE.Vector3(0, 0, 30) };
    camera.position.copy(HOME.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(HOME.target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = !coarse;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = 1.15;
    controls.autoRotate = !reduced;
    controls.autoRotateSpeed = 0.35;

    // Light
    scene.add(new THREE.HemisphereLight("#f7f2e8", "#06251b", 1.1));
    const sun = new THREE.DirectionalLight("#ffe7b8", 2.2);
    sun.position.set(-500, 900, -300);
    scene.add(sun);
    const rim = new THREE.DirectionalLight("#c9a35b", 1.2);
    rim.position.set(600, 200, 700);
    scene.add(rim);

    // Ground glow
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 256;
    const g = glowCanvas.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(201,163,91,0.28)");
    grad.addColorStop(0.45, "rgba(30,77,59,0.35)");
    grad.addColorStop(1, "rgba(4,19,14,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const ground = new THREE.Mesh(new THREE.CircleGeometry(1300, 64), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(glowCanvas), transparent: true, depthWrite: false }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);
    const grid = new THREE.PolarGridHelper(1100, 24, 10, 96, "#1e4d3b", "#123a2c");
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.45;
    scene.add(grid);

    // Land
    const polys = parseOutline(KSA_PATH);
    const shapes = polys.map((p) => new THREE.Shape(p));
    const geo = new THREE.ExtrudeGeometry(shapes, { depth: TOP - 4, bevelEnabled: true, bevelThickness: 4, bevelSize: 2.5, bevelSegments: 3, curveSegments: 1 });
    const tex = new THREE.TextureLoader().load(TEXTURE);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    // Caps use the shape coordinates as UVs; map them onto the 5:4 painted frame.
    tex.repeat.set(1 / (VB_W + 2 * TEX_PAD_X), 1 / VB_H);
    tex.offset.set(0.5, 0.5);
    const capMat = new THREE.MeshStandardMaterial({ map: tex, color: "#ffffff", roughness: 0.82, metalness: 0.05 });
    const sideMat = new THREE.MeshStandardMaterial({ color: "#b8904a", roughness: 0.35, metalness: 0.75 });
    const land = new THREE.Mesh(geo, [capMat, sideMat]);
    land.rotation.x = -Math.PI / 2;
    scene.add(land);
    // Gold outline on the top edge
    const outlineMat = new THREE.LineBasicMaterial({ color: "#e3c88f", transparent: true, opacity: 0.9 });
    for (const p of polys) {
      const pts = [...p, p[0]!].map((v) => new THREE.Vector3(v.x, TOP + 0.6, -v.y));
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), outlineMat));
    }

    // Pins
    const beamGeo = new THREE.CylinderGeometry(1.6, 1.6, 1, 12, 1, true);
    const headGeo = new THREE.SphereGeometry(5.5, 24, 16);
    const ringGeo = new THREE.RingGeometry(7, 9.5, 40);
    type Pin = { key: string; group: THREE.Group; beam: THREE.Mesh; head: THREE.Mesh; ring: THREE.Mesh; h: number; isLive: boolean; base: THREE.Vector3 };
    const pins: Pin[] = styles.map((s) => {
      const isLive = live.has(s.key);
      const h = isLive ? 78 : 46;
      const group = new THREE.Group();
      const base = new THREE.Vector3(s.x - CX, TOP, s.y - CY);
      group.position.copy(base);
      const beam = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: isLive ? "#f0cf86" : "#c9a35b", transparent: true, opacity: isLive ? 0.75 : 0.45, blending: THREE.AdditiveBlending, depthWrite: false }));
      beam.scale.y = h;
      beam.position.y = h / 2;
      const head = new THREE.Mesh(headGeo, new THREE.MeshStandardMaterial({ color: isLive ? "#e3c88f" : "#f7f2e8", emissive: isLive ? "#c9a35b" : "#6b5a35", emissiveIntensity: isLive ? 1.2 : 0.5, roughness: 0.3, metalness: 0.4 }));
      head.position.y = h;
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: "#e3c88f", transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.8;
      group.add(beam, head, ring);
      scene.add(group);
      return { key: s.key, group, beam, head, ring, h, isLive, base };
    });

    let marked: { active: string | null; hover: string | null } = { active: null, hover: null };
    const mark = (a: string | null, h: string | null) => { marked = { active: a, hover: h }; };

    // Camera flight
    let flight: { from: THREE.Vector3; to: THREE.Vector3; tFrom: THREE.Vector3; tTo: THREE.Vector3; start: number; dur: number } | null = null;
    const focus = (key: string | null) => {
      const pin = pins.find((p) => p.key === key);
      let to: THREE.Vector3, tTo: THREE.Vector3;
      if (pin) {
        tTo = pin.base.clone().setY(TOP + 10);
        // Keep the current viewing direction so the camera never swings across the map.
        const dir = camera.position.clone().sub(controls.target).setY(0);
        if (dir.lengthSq() < 1) dir.set(0, 0, 1);
        dir.normalize().multiplyScalar(250);
        to = tTo.clone().add(dir).setY(TOP + 230);
        controls.autoRotate = false;
      } else {
        to = HOME.pos.clone();
        tTo = HOME.target.clone();
        controls.autoRotate = !reduced;
      }
      flight = { from: camera.position.clone(), to, tFrom: controls.target.clone(), tTo, start: performance.now(), dur: reduced ? 1 : 1700 };
    };
    api.current = { focus, mark };

    // Sizing
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Zoom out on narrow screens so the whole country fits the width.
      camera.zoom = Math.min(1, (w / h) / 1.45);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // Loop, paused when off-screen
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = Boolean(e?.isIntersecting); });
    io.observe(host);
    const v = new THREE.Vector3();
    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (flight) {
        const t = Math.min(1, (now - flight.start) / flight.dur);
        const k = ease(t);
        camera.position.lerpVectors(flight.from, flight.to, k);
        // A slight arc: rise mid-flight for a cinematic feel.
        camera.position.y += Math.sin(Math.PI * k) * 80;
        controls.target.lerpVectors(flight.tFrom, flight.tTo, k);
        if (t >= 1) flight = null;
      }
      controls.update();

      const pulse = (Math.sin(now / 520) + 1) / 2;
      for (const p of pins) {
        const on = p.key === marked.active;
        const hv = p.key === marked.hover;
        const s = on ? 1.7 : hv ? 1.35 : 1;
        p.head.scale.setScalar(s);
        const r = reduced ? 1.2 : 1 + pulse * (p.isLive || on ? 1.4 : 0.6);
        p.ring.scale.setScalar(on ? r * 1.5 : r);
        (p.ring.material as THREE.MeshBasicMaterial).opacity = reduced ? 0.5 : 0.75 - pulse * 0.6;
        (p.beam.material as THREE.MeshBasicMaterial).opacity = on ? 0.95 : p.isLive ? 0.75 : hv ? 0.7 : 0.45;
      }
      renderer.render(scene, camera);

      // Project badges
      const w = host.clientWidth;
      const h = host.clientHeight;
      pins.forEach((p, i) => {
        const el = badgeRefs.current[i];
        if (!el) return;
        v.copy(p.base).setY(TOP + p.h + 12).project(camera);
        const x = (v.x * 0.5 + 0.5) * w;
        const y = (-v.y * 0.5 + 0.5) * h;
        const behind = v.z > 1;
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
        el.style.opacity = behind ? "0" : "1";
        // Nearer badges sit on top.
        el.style.zIndex = String(1000 - Math.round(v.z * 1000));
      });
    };
    raf = requestAnimationFrame(tick);

    // Stop the idle orbit once the visitor drags the map themselves.
    const stopSpin = () => { controls.autoRotate = false; };
    controls.addEventListener("start", stopSpin);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      controls.removeEventListener("start", stopSpin);
      controls.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((mat) => { (mat as THREE.MeshStandardMaterial).map?.dispose(); mat.dispose(); });
      });
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
    // The scene is built once; selection changes go through api.current.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { api.current?.focus(active); }, [active]);
  useEffect(() => { api.current?.mark(active, hover); }, [active, hover]);

  return (
    <div ref={hostRef} className="rwk-3d" role="group" aria-label={ariaLabel}>
      <div className="rwk-3d__badges">
        {styles.map((s, i) => (
          <button
            key={s.key}
            ref={(el) => { badgeRefs.current[i] = el; }}
            type="button"
            className={`rwk-3d__badge${live.has(s.key) ? " is-live" : ""}${s.key === active ? " is-active" : ""}${s.key === hover ? " is-hover" : ""}`}
            aria-label={name(s)}
            aria-pressed={s.key === active}
            onClick={() => onSelect(s.key)}
            onMouseEnter={() => onHover(s.key)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(s.key)}
            onBlur={() => onHover(null)}
          >
            <span className="rwk-3d__num">{num(i + 1)}</span>
            {(s.key === hover || s.key === active) && <span className="rwk-3d__name">{name(s)}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
