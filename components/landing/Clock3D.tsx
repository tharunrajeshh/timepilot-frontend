"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import * as THREE from "three";

/* ============================================================
   CONSTANTS
============================================================ */

const PLANET_RADIUS = 1.6;

/** Radius of the "dial surface" — just above the planet skin */
const SURFACE = PLANET_RADIUS + 0.008;

/** Angular radius (radians) of the clock dial carved into Mars */
const DIAL_ANGLE = 0.8;

/** Angular distance from the pole where the 12 hour markers sit */
const MARKER_ANGLE = 0.66;

/* ============================================================
   SEEDED RANDOM (deterministic Mars surface)
============================================================ */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ============================================================
   PROCEDURAL MARS TEXTURE (equirectangular canvas)
============================================================ */

function createMarsTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const width = 1024;
  const height = 512;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const rnd = mulberry32(0x4d415253); // "MARS"

  /* ---------- base rust gradient ---------- */
  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0.0, "#8f3d1c");
  base.addColorStop(0.22, "#bb5c2d");
  base.addColorStop(0.5, "#d0753c");
  base.addColorStop(0.78, "#b25226");
  base.addColorStop(1.0, "#7b3115");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  /* ---------- dark albedo patches (Syrtis Major-ish) ---------- */
  for (let i = 0; i < 34; i++) {
    const x = rnd() * width;
    const y = height * 0.1 + rnd() * height * 0.8;
    const r = 40 + rnd() * 150;

    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(84, 30, 12, ${0.2 + rnd() * 0.32})`);
    g.addColorStop(1, "rgba(84, 30, 12, 0)");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---------- bright dusty highlands ---------- */
  for (let i = 0; i < 46; i++) {
    const x = rnd() * width;
    const y = rnd() * height;
    const r = 28 + rnd() * 120;

    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(238, 176, 126, ${0.08 + rnd() * 0.16})`);
    g.addColorStop(1, "rgba(238, 176, 126, 0)");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---------- craters ---------- */
  for (let i = 0; i < 150; i++) {
    const x = rnd() * width;
    const y = rnd() * height;
    const r = 2 + rnd() * 16;

    const g = ctx.createRadialGradient(x, y, r * 0.08, x, y, r);
    g.addColorStop(0.0, "rgba(70, 24, 10, 0.34)");
    g.addColorStop(0.62, "rgba(70, 24, 10, 0.16)");
    g.addColorStop(0.86, "rgba(255, 208, 170, 0.30)");
    g.addColorStop(1.0, "rgba(255, 208, 170, 0)");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---------- polar ice caps ---------- */
  const north = ctx.createLinearGradient(0, 0, 0, height * 0.15);
  north.addColorStop(0, "rgba(255, 247, 240, 0.95)");
  north.addColorStop(0.5, "rgba(255, 238, 226, 0.38)");
  north.addColorStop(1, "rgba(255, 238, 226, 0)");
  ctx.fillStyle = north;
  ctx.fillRect(0, 0, width, height * 0.15);

  const south = ctx.createLinearGradient(0, height, 0, height * 0.85);
  south.addColorStop(0, "rgba(255, 247, 240, 0.9)");
  south.addColorStop(0.5, "rgba(255, 238, 226, 0.34)");
  south.addColorStop(1, "rgba(255, 238, 226, 0)");
  ctx.fillStyle = south;
  ctx.fillRect(0, height * 0.85, width, height * 0.15);

  /* ---------- fine grain / speckle ---------- */
  for (let i = 0; i < 2800; i++) {
    const x = rnd() * width;
    const y = rnd() * height;
    const a = 0.02 + rnd() * 0.06;
    ctx.fillStyle =
      rnd() > 0.5
        ? `rgba(255, 222, 192, ${a})`
        : `rgba(58, 20, 8, ${a})`;
    ctx.fillRect(x, y, 1 + rnd() * 2, 1 + rnd() * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 4;
  texture.needsUpdate = true;

  return texture;
}

/* ============================================================
   ATMOSPHERE (fresnel rim glow)
============================================================ */

function MarsAtmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color("#ff7a3a") },
          uIntensity: { value: 0.95 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vViewDir;

          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vViewDir = normalize(-mvPosition.xyz);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uIntensity;

          varying vec3 vNormal;
          varying vec3 vViewDir;

          void main() {
            float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vViewDir)));
            float glow = pow(clamp(rim, 0.0, 1.0), 3.0);
            gl_FragColor = vec4(uColor, glow * uIntensity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh scale={1.15} material={material}>
      <sphereGeometry args={[PLANET_RADIUS, 64, 64]} />
    </mesh>
  );
}

/* ============================================================
   CLOCK DIAL (hour markers + rings laid onto the sphere)
============================================================ */

function ClockDial() {
  const markers = useMemo(() => {
    const matrix = new THREE.Matrix4();

    return Array.from({ length: 12 }).map((_, i) => {
      const phi = (i / 12) * Math.PI * 2; // 0 = 12 o'clock, clockwise
      const theta = MARKER_ANGLE;

      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta);
      const sinP = Math.sin(phi);
      const cosP = Math.cos(phi);

      // local Z = outward normal
      const normal = new THREE.Vector3(sinT * sinP, sinT * cosP, cosT);
      // local Y = meridian tangent (points away from the clock centre)
      const meridian = new THREE.Vector3(
        cosT * sinP,
        cosT * cosP,
        -sinT
      );
      // local X = tangential
      const tangent = new THREE.Vector3(cosP, -sinP, 0);

      matrix.makeBasis(tangent, meridian, normal);
      const quaternion = new THREE.Quaternion().setFromRotationMatrix(
        matrix
      );

      const position = normal.clone().multiplyScalar(SURFACE + 0.02);

      return {
        key: i,
        position,
        quaternion,
        isQuarter: i % 3 === 0,
      };
    });
  }, []);

  const ringRadius = SURFACE * Math.sin(DIAL_ANGLE);
  const ringZ = SURFACE * Math.cos(DIAL_ANGLE);

  return (
    <group>
      {/* Dark glass dial pressed into the planet */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry
          args={[SURFACE, 96, 64, 0, Math.PI * 2, 0, DIAL_ANGLE]}
        />
        <meshStandardMaterial
          color="#2b1008"
          metalness={0.45}
          roughness={0.4}
          emissive="#63200a"
          emissiveIntensity={0.28}
          transparent
          opacity={0.66}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glowing rim of the dial */}
      <mesh position={[0, 0, ringZ]}>
        <torusGeometry args={[ringRadius, 0.016, 16, 128]} />
        <meshBasicMaterial
          color="#ff9d5c"
          transparent
          opacity={0.75}
          toneMapped={false}
        />
      </mesh>

      {/* Faint inner ring */}
      <mesh position={[0, 0, SURFACE * Math.cos(0.42)]}>
        <torusGeometry
          args={[SURFACE * Math.sin(0.42), 0.006, 12, 96]}
        />
        <meshBasicMaterial
          color="#ffd0a8"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* Hour markers */}
      {markers.map((marker) => (
        <mesh
          key={marker.key}
          position={marker.position}
          quaternion={marker.quaternion}
        >
          <boxGeometry
            args={
              marker.isQuarter
                ? [0.085, 0.26, 0.05]
                : [0.05, 0.17, 0.05]
            }
          />
          <meshStandardMaterial
            color="#ffd7b0"
            emissive="#ff8a3d"
            emissiveIntensity={marker.isQuarter ? 1.6 : 0.85}
            metalness={0.5}
            roughness={0.3}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Centre hub */}
      <mesh position={[0, 0, SURFACE + 0.05]}>
        <sphereGeometry args={[0.075, 32, 32]} />
        <meshStandardMaterial
          color="#1a0a06"
          metalness={0.9}
          roughness={0.15}
          emissive="#ff7a2f"
          emissiveIntensity={1.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   SINGLE HAND (a great-circle arc hugging the sphere)
============================================================ */

function Hand({
  groupRef,
  radius,
  tube,
  length,
  color,
  emissive,
  emissiveIntensity,
}: {
  groupRef: RefObject<THREE.Group | null>;
  radius: number;
  tube: number;
  length: number;
  color: string;
  emissive: string;
  emissiveIntensity: number;
}) {
  const tipPosition = useMemo<[number, number, number]>(
    () => [0, radius * Math.sin(length), radius * Math.cos(length)],
    [radius, length]
  );

  return (
    <group ref={groupRef}>
      {/* The arc starts at the pole (+Z) and sweeps toward +Y */}
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <torusGeometry args={[radius, tube, 14, 128, length]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          metalness={0.72}
          roughness={0.22}
          toneMapped={false}
        />
      </mesh>

      {/* Rounded tip */}
      <mesh position={tipPosition}>
        <sphereGeometry args={[tube * 1.55, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity * 1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   CLOCK HANDS
============================================================ */

function ClockHands() {
  const hourHand = useRef<THREE.Group>(null);
  const minuteHand = useRef<THREE.Group>(null);
  const secondHand = useRef<THREE.Group>(null);
  const secondGlow = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const minutes = now.getMinutes() + seconds / 60;
    const hours = (now.getHours() % 12) + minutes / 60;

    if (hourHand.current) {
      hourHand.current.rotation.z = -(hours / 12) * Math.PI * 2;
    }
    if (minuteHand.current) {
      minuteHand.current.rotation.z = -(minutes / 60) * Math.PI * 2;
    }
    if (secondHand.current) {
      secondHand.current.rotation.z = -(seconds / 60) * Math.PI * 2;
    }
    if (secondGlow.current) {
      secondGlow.current.intensity =
        1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.6;
    }
  });

  const secondLength = 0.64;

  return (
    <group>
      <Hand
        groupRef={hourHand}
        radius={SURFACE + 0.025}
        tube={0.038}
        length={0.38}
        color="#ffe6d0"
        emissive="#ff9a4d"
        emissiveIntensity={0.6}
      />

      <Hand
        groupRef={minuteHand}
        radius={SURFACE + 0.045}
        tube={0.026}
        length={0.55}
        color="#ffd9bd"
        emissive="#ffa45f"
        emissiveIntensity={0.85}
      />

      <Hand
        groupRef={secondHand}
        radius={SURFACE + 0.062}
        tube={0.012}
        length={secondLength}
        color="#ffb27a"
        emissive="#ff6a1f"
        emissiveIntensity={2.4}
      />

      {/* Small light that travels with the second hand */}
      <pointLight
        ref={secondGlow}
        position={[
          0,
          (SURFACE + 0.062) * Math.sin(secondLength),
          (SURFACE + 0.062) * Math.cos(secondLength),
        ]}
        color="#ff7a2f"
        intensity={1.5}
        distance={1.6}
      />
    </group>
  );
}

/* ============================================================
   MARS PLANET (surface + dial + hands)
============================================================ */

function MarsPlanet() {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const surfaceRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const generated = createMarsTexture();
    setTexture(generated);

    return () => {
      generated?.dispose();
    };
  }, []);

  // The planet itself spins slowly behind the fixed clock face
  useFrame((_, delta) => {
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group>
      {/* ---------- Mars body ---------- */}
      <mesh ref={surfaceRef}>
        <sphereGeometry args={[PLANET_RADIUS, 96, 96]} />
        <meshStandardMaterial
          map={texture ?? undefined}
          color={texture ? "#ffffff" : "#b4552a"}
          roughness={0.94}
          metalness={0.06}
        />
      </mesh>

      {/* ---------- Glowing atmosphere ---------- */}
      <MarsAtmosphere />

      {/* ---------- Clock ---------- */}
      <ClockDial />
      <ClockHands />

      {/* ---------- Dust / magic drifting over the surface ---------- */}
      <Sparkles
        count={26}
        scale={[4.2, 4.2, 4.2]}
        size={1.7}
        speed={0.25}
        opacity={0.5}
        color="#ffb37a"
      />
    </group>
  );
}

/* ============================================================
   FLOATING ORBITAL PARTICLES
============================================================ */

function OrbitingParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 46 }).map(() => {
      const radius = 2.2 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 3.4;
      const speed = 0.05 + Math.random() * 0.16;
      const size = 0.014 + Math.random() * 0.032;

      return { radius, angle, yOffset, speed, size };
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      p.angle += p.speed * delta;
      child.position.x = Math.cos(p.angle) * p.radius;
      child.position.z = Math.sin(p.angle) * p.radius;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[0, p.yOffset, 0]}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#ff8a3d" : "#ffc79a"}
            transparent
            opacity={0.75}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ============================================================
   PLANET + INTERACTION
============================================================ */

function FloatingPlanet() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetX = state.pointer.x * 0.28;
    const targetY = state.pointer.y * 0.28;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -targetY,
      3,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetX,
      3,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.16} floatIntensity={0.7}>
        <MarsPlanet />
      </Float>

      <OrbitingParticles />
    </group>
  );
}

/* ============================================================
   EXPORT
============================================================ */

export default function Clock3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 7], fov: 38 }}
      >
        <ambientLight intensity={0.32} />

        {/* Warm key light — makes the rust read as Mars */}
        <directionalLight
          position={[4, 5, 6]}
          intensity={1.9}
          color="#ffd9b8"
        />

        {/* Cool fill from behind for depth */}
        <pointLight position={[-5, 1, 4]} intensity={1.9} color="#7c3aed" />
        <pointLight position={[3, -4, 2]} intensity={1.2} color="#3b82f6" />
        <pointLight position={[0, 2, -5]} intensity={0.9} color="#10b981" />

        {/* Rim light so the planet reads as a distinct, glossy object */}
        <pointLight position={[0, 0, 5]} intensity={0.7} color="#ffffff" />

        <FloatingPlanet />
      </Canvas>
    </div>
  );
}