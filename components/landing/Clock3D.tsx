"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   PROCEDURAL MARS TEXTURE
   Generated on a <canvas> at runtime — no external image assets,
   so the component stays fully self-contained.
============================================================ */

function useMarsTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Base rust-orange gradient (lighter near the "equator", darker at poles)
    const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
    base.addColorStop(0, "#5a2a1e");
    base.addColorStop(0.15, "#8a3d24");
    base.addColorStop(0.5, "#c1602f");
    base.addColorStop(0.85, "#8a3d24");
    base.addColorStop(1, "#4a221a");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mottled surface noise — layered translucent blobs
    const blobColors = [
      "rgba(120,55,30,0.35)",
      "rgba(200,110,60,0.28)",
      "rgba(90,40,25,0.3)",
      "rgba(230,150,90,0.18)",
    ];

    for (let i = 0; i < 260; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 8 + Math.random() * 46;
      ctx.beginPath();
      ctx.fillStyle =
        blobColors[Math.floor(Math.random() * blobColors.length)];
      ctx.ellipse(
        x,
        y,
        r,
        r * (0.5 + Math.random() * 0.5),
        Math.random() * Math.PI,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Crater rims — small dark rings with a lighter inner highlight
    for (let i = 0; i < 45; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 4 + Math.random() * 14;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(50,20,12,0.45)";
      ctx.lineWidth = 1.5 + Math.random() * 2;
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "rgba(30,12,8,0.35)";
      ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polar ice caps
    const capGradientTop = ctx.createRadialGradient(
      canvas.width / 2,
      0,
      0,
      canvas.width / 2,
      0,
      canvas.height * 0.22
    );
    capGradientTop.addColorStop(0, "rgba(255,240,235,0.85)");
    capGradientTop.addColorStop(1, "rgba(255,240,235,0)");
    ctx.fillStyle = capGradientTop;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.3);

    const capGradientBottom = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height,
      0,
      canvas.width / 2,
      canvas.height,
      canvas.height * 0.22
    );
    capGradientBottom.addColorStop(0, "rgba(255,240,235,0.75)");
    capGradientBottom.addColorStop(1, "rgba(255,240,235,0)");
    ctx.fillStyle = capGradientBottom;
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);

    // Faint violet tint bands, ties the planet back into the page's
    // purple theme without breaking the Mars read
    ctx.globalCompositeOperation = "overlay";
    const tint = ctx.createLinearGradient(0, 0, canvas.width, 0);
    tint.addColorStop(0, "rgba(124,58,237,0.12)");
    tint.addColorStop(0.5, "rgba(168,85,247,0.05)");
    tint.addColorStop(1, "rgba(59,130,246,0.1)");
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/* ============================================================
   MARS PLANET BODY (slow self-rotation, independent of the clock)
============================================================ */

function MarsPlanet() {
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const texture = useMarsTexture();

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.045;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.015;
    }
  });

  return (
    <group>
      {/* Planet core */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.42, 64, 64]} />
        {texture ? (
          <meshStandardMaterial
            map={texture}
            metalness={0.05}
            roughness={0.85}
          />
        ) : (
          <meshStandardMaterial
            color="#a3502c"
            metalness={0.05}
            roughness={0.85}
          />
        )}
      </mesh>

      {/* Soft rim-lit atmosphere shell */}
      <mesh ref={atmosphereRef} scale={1.06}>
        <sphereGeometry args={[1.42, 48, 48]} />
        <meshBasicMaterial
          color="#ff8a5b"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>

      {/* Cool violet outer halo, blends the planet into the page glow */}
      <mesh scale={1.16}>
        <sphereGeometry args={[1.42, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
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
        1.4 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
  });

  return (
    <group>
      <group ref={hourHand}>
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.09, 0.84, 0.05]} />
          <meshStandardMaterial
            color="#fff3ea"
            emissive="#ffb37a"
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
      </group>

      <group ref={minuteHand}>
        <mesh position={[0, 0.64, 0.03]}>
          <boxGeometry args={[0.065, 1.28, 0.045]} />
          <meshStandardMaterial
            color="#ffe4d1"
            emissive="#ff9d5c"
            emissiveIntensity={0.55}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
      </group>

      <group ref={secondHand}>
        <mesh position={[0, 0.75, 0.06]}>
          <boxGeometry args={[0.022, 1.5, 0.03]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
        <pointLight
          ref={secondGlow}
          position={[0, 1.35, 0.08]}
          color="#c084fc"
          intensity={1.4}
          distance={1.3}
        />
      </group>

      {/* center hub */}
      <mesh position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.075, 0.075, 0.07, 32]} />
        <meshStandardMaterial
          color="#1a0f0a"
          metalness={0.9}
          roughness={0.15}
          emissive="#ff7a45"
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.11]}>
        <sphereGeometry args={[0.038, 24, 24]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
}

/* ============================================================
   CLOCK FACE — a glass dial mounted just in front of the planet,
   like a porthole cut into Mars
============================================================ */

function ClockFace() {
  return (
    <group position={[0, 0, 1.02]}>
      {/* dark glass backing so the planet doesn't show through the dial */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[1.02, 64]} />
        <meshStandardMaterial
          color="#140b08"
          metalness={0.4}
          roughness={0.5}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* thin metal bezel ring */}
      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[0.98, 1.06, 64]} />
        <meshStandardMaterial
          color="#2a1712"
          metalness={0.9}
          roughness={0.2}
          emissive="#ff7a45"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* glowing edge line */}
      <mesh position={[0, 0, 0.005]}>
        <ringGeometry args={[0.96, 1.0, 64]} />
        <meshBasicMaterial
          color="#ffb37a"
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.8;
        const isQuarter = i % 3 === 0;

        return (
          <mesh
            key={i}
            position={[
              Math.sin(angle) * radius,
              Math.cos(angle) * radius,
              0.02,
            ]}
            rotation={[0, 0, -angle]}
          >
            <boxGeometry
              args={isQuarter ? [0.045, 0.15, 0.03] : [0.032, 0.1, 0.03]}
            />
            <meshStandardMaterial
              color="#ffd9bd"
              emissive="#ff9d5c"
              emissiveIntensity={isQuarter ? 1.2 : 0.6}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      <ClockHands />

      <Sparkles
        count={16}
        scale={[1.7, 1.7, 0.4]}
        size={1.4}
        speed={0.2}
        opacity={0.45}
        color="#ffcda0"
      />
    </group>
  );
}

/* ============================================================
   FLOATING ORBITAL PARTICLES (dust ring around the planet)
============================================================ */

function OrbitingParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => {
      const radius = 2.0 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 2.2;
      const speed = 0.04 + Math.random() * 0.14;
      const size = 0.012 + Math.random() * 0.028;

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
            color={i % 3 === 0 ? "#ff9d5c" : "#c084fc"}
            transparent
            opacity={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ============================================================
   PLANET-CLOCK + POINTER INTERACTION
============================================================ */

function FloatingPlanetClock() {
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
      <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.6}>
        <MarsPlanet />
        <ClockFace />
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
        <ambientLight intensity={0.4} />

        <directionalLight position={[4, 5, 6]} intensity={1.6} color="#ffe6d5" />

        <pointLight position={[-5, 1, 4]} intensity={2.0} color="#ff7a45" />

        <pointLight position={[3, -4, 2]} intensity={1.3} color="#7c3aed" />

        <pointLight position={[0, 2, -5]} intensity={0.9} color="#3b82f6" />

        <pointLight position={[0, 0, 5]} intensity={0.6} color="#ffffff" />

        <FloatingPlanetClock />
      </Canvas>
    </div>
  );
}