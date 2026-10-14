import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { VscLightbulb, VscCode } from "react-icons/vsc";
import { useLanguage } from "../context/LanguageContext";
import { globeSkills } from "./globeSkills";
import "./SkillsGlobe.css";

/* =====================================================================
   skills --globo: as skills numa esfera 3D que gira e pode ser arrastada
   (inspirado no "Skills.json" de abdulmomin.dev).

   - Recebe a lista de data/globeSkills.js (skillsData + ferramentas extras).
   - A grade, o brilho e a névoa leem --accent e --bg-terminal do tema,
     então acompanham a paleta escura do terminal.
   - Os ícones são uma única camada HTML reposicionada a cada frame.
   - Fora da tela o globo para de renderizar e libera o WebGL.
   ===================================================================== */

// Espiral de Fibonacci: N pontos bem distribuídos numa esfera
function fibonacciSphere(n, radius) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius);
  });
}

const ICON_PX = 40; // tamanho do ícone no CSS (ver SkillsGlobe.css)
const RADIUS = 3.3;
const DRAG_THRESHOLD = 6; // px: acima disso o clique vira arrasto e não abre o link
const UNMOUNT_DELAY_MS = 1500;

const _world = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _camDir = new THREE.Vector3();
const _ndc = new THREE.Vector3();
const _view = new THREE.Vector3();

function Globe({ count, radius, accent, items, motion, light, pose }) {
  const group = useRef(null);
  const points = useMemo(() => fibonacciSphere(count, radius), [count, radius]);
  const shell = radius * 0.85;
  // Tamanho do ícone na cena 3D: diminui conforme a quantidade de skills
  const iconWorld = THREE.MathUtils.clamp((radius * 0.8) / Math.sqrt(count), 0.32, 0.6);

  // Remontou (voltou para a tela): continua do giro em que parou
  useLayoutEffect(() => {
    if (group.current) group.current.rotation.y = pose.current.rotationY;
  }, [pose]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { camera } = state;
    const { width, height } = state.size;

    if (motion) g.rotation.y += delta * 0.06; // giro lento, independente do FPS
    // Guarda o giro e a câmera para a remontagem
    pose.current.rotationY = g.rotation.y;
    (pose.current.camera ??= new THREE.Vector3()).copy(camera.position);
    g.updateWorldMatrix(true, false);
    camera.updateMatrixWorld();
    _camDir.copy(camera.position).normalize();
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);

    // Projeta cada ponto 3D na tela e move o ícone direto no DOM
    points.forEach((p, i) => {
      const el = items.current[i];
      if (!el) return;
      _world.copy(p).applyMatrix4(g.matrixWorld);

      // 1 = de frente para a câmera, 0 = atrás do globo
      const t = THREE.MathUtils.clamp((_dir.copy(_world).normalize().dot(_camDir) - 0.1) * 2, 0, 1);

      _ndc.copy(_world).project(camera);
      const x = (_ndc.x + 1) * 0.5 * width;
      const y = (1 - _ndc.y) * 0.5 * height;
      const depth = -_view.copy(_world).applyMatrix4(camera.matrixWorldInverse).z;
      const pxPerUnit = height / (2 * tanHalfFov * depth); // perspectiva
      const scale = ((iconWorld * pxPerUnit) / ICON_PX) * (0.8 + 0.4 * t);

      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = String(t);
      el.style.zIndex = String(Math.round(t * 100));
      el.style.pointerEvents = t > 0.8 ? "auto" : "none";
      el.style.visibility = t < 0.02 ? "hidden" : "visible";
    });
  });

  return (
    <group ref={group}>
      {/* grade: frente mais visível, fundo bem fraco */}
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={light ? 0.35 : 0.1} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[shell, 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={light ? 0.1 : 0.03} side={THREE.BackSide} />
      </mesh>
      {/* núcleo */}
      <mesh>
        <sphereGeometry args={[shell * 0.98, 32, 32]} />
        <meshBasicMaterial
          color={light ? "#fff" : "#000"}
          transparent
          opacity={light ? 0.25 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* halo */}
      <mesh>
        <sphereGeometry args={[shell * 1.035, 32, 32]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function FitCamera({ radius, pose }) {
  const camera = useThree((s) => s.camera);
  const aspect = useThree((s) => s.size.width / s.size.height);

  useLayoutEffect(() => {
    if (pose.current.camera) camera.position.copy(pose.current.camera);
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    camera.position.setLength(radius / Math.sin(Math.min(vFov, hFov) / 2));
  }, [camera, aspect, radius, pose]);

  return null;
}

const readToken = (el, name, fallback) =>
  getComputedStyle(el).getPropertyValue(name).trim() || fallback;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function SkillsGlobe({ skills }) {
  const { t } = useLanguage();
  const itemsList = skills && skills.length > 0 ? skills : globeSkills;
  const container = useRef(null);
  const items = useRef([]);
  const dragStart = useRef(null);
  const [colors, setColors] = useState({ accent: "#00ff66", bg: "#000000" });
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const pose = useRef({ rotationY: 0, camera: null });
  const [motion] = useState(() => !prefersReducedMotion());
  const light = false; // tema dark permanente da IDE

  useLayoutEffect(() => {
    const el = container.current;
    if (!el) return;
    const read = () =>
      setColors({
        accent: readToken(el, "--green-primary", "#00ff66"),
        bg: readToken(el, "--bg-terminal", "#000000"),
      });
    read();
  }, []);

  useEffect(() => {
    const el = container.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let timer;
    const rootEl = el.closest(".ide-active-view-container") || null;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer);
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
        else timer = setTimeout(() => setMounted(false), UNMOUNT_DELAY_MS);
      },
      { root: rootEl, rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  const onPointerDown = (e) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const onClickCapture = (e) => {
    const start = dragStart.current;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const renderIcon = (icon) => {
    if (!icon) return <VscCode className="skills-globe__icon" aria-hidden="true" />;
    if (typeof icon === "string") {
      if (
        icon.includes(".png") ||
        icon.includes(".svg") ||
        icon.includes(".jpg") ||
        icon.includes(".webp") ||
        icon.includes("data:image") ||
        icon.includes("/assets/")
      ) {
        return (
          <img
            src={icon}
            alt=""
            className="skills-globe__icon skills-globe__icon--img"
          />
        );
      }
      return <span className="skills-globe__icon skills-globe__icon--text">{icon}</span>;
    }
    const IconComp = icon;
    return <IconComp className="skills-globe__icon" aria-hidden="true" />;
  };

  return (
    <div className="skills-globe">
      <div
        ref={container}
        className="skills-globe__stage"
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
      >
        {mounted && (
          <Canvas
            eventSource={container}
            frameloop={visible ? "always" : "never"}
            camera={{ position: [0, 0, 9], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
          >
            {!light && <fog attach="fog" args={[colors.bg, 10, 25]} />}
            <FitCamera radius={RADIUS * 1.2} pose={pose} />
            <Float
              speed={motion ? 1 : 0}
              rotationIntensity={motion ? 0.2 : 0}
              floatIntensity={motion ? 0.2 : 0}
            >
              <Globe
                count={itemsList.length}
                radius={RADIUS}
                accent={colors.accent}
                items={items}
                motion={motion}
                light={light}
                pose={pose}
              />
            </Float>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={motion}
              autoRotateSpeed={0.8}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        )}

        <ul className="skills-globe__layer">
          {itemsList.map((skill, i) => (
            <li key={skill.name} className="skills-globe__li">
              <a
                ref={(el) => {
                  items.current[i] = el;
                }}
                className="skills-globe__item"
                style={{ "--skill": skill.color || "#00ff66" }}
                href={skill.link || "https://github.com/rafaelgomes77oliveira-ux"}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                aria-label={`Ver tecnologia ${skill.name}`}
              >
                {renderIcon(skill.icon)}
                <span className="skills-globe__label">{skill.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="skills-globe__hint">
        <VscLightbulb style={{ verticalAlign: "middle", marginRight: "6px", color: "var(--terminal-yellow, #ffd700)" }} />
        {t("experience.globeHint")}
      </p>
    </div>
  );
}
