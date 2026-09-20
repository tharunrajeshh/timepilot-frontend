"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ============================================================
   CLOCK HANDS
============================================================ */

function ClockHands() {
  const hourHand = useRef<THREE.Group>(null);
  const minuteHand = useRef<THREE.Group>(null);
  const secondHand = useRef<THREE.Group>(null);

  useFrame(() => {
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
  });

  return (
    <group>
      <group ref={hourHand}>
        <RoundedBox
          args={[0.1, 1.0, 0.06]}
          radius={0.04}
          smoothness={4}
          position={[0, 0.5, 0]}
        >
          <meshStandardMaterial
            color="#e8e8ff"
            emissive="#5b6bff"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.25}
          />
        </RoundedBox>
      </group>

      <group ref={minuteHand}>
        <RoundedBox
          args={[0.07, 1.5, 0.05]}
          radius={0.03}
          smoothness={4}
          position={[0, 0.75, 0.04]}
        >
          <meshStandardMaterial
            color="#c9ccff"
            emissive="#7c8dff"
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.25}
          />
        </RoundedBox>
      </group>

      <group ref={secondHand}>
        <RoundedBox
          args={[0.025, 1.75, 0.03]}
          radius={0.012}
          smoothness={4}
          position={[0, 0.875, 0.08]}
        >
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </RoundedBox>
      </group>

      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.09, 0.09, 0.08, 32]} />
        <meshStandardMaterial
          color="#0f0f1a"
          metalness={0.95}
          roughness={0.1}
          emissive="#7c3aed"
          emissiveIntensity={1.0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ============================================================
   CLOCK FACE
============================================================ */

function ClockFace() {
  return (
    <group>
      {/* Body — dark polished metal */}
      <RoundedBox
        args={[3.2, 3.2, 0.35]}
        radius={0.35}
        smoothness={8}
        position={[0, 0, -0.18]}
      >
        <meshStandardMaterial
          color="#0d0d1c"
          metalness={0.9}
          roughness={0.22}
          emissive="#1b1b3a"
          emissiveIntensity={0.6}
        />
      </RoundedBox>

      {/* Inner face */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[1.5, 64]} />
        <meshStandardMaterial
          color="#101020"
          metalness={0.4}
          roughness={0.55}
        />
      </mesh>

      {/* Glow ring around face */}
      <mesh position={[0, 0, 0.015]}>
        <ringGeometry args={[1.5, 1.56, 64]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.65}
          toneMapped={false}
        />
      </mesh>

      {/* Outer soft halo */}
      <mesh position={[0, 0, -0.05]}>
        <ringGeometry args={[1.65, 2.1, 64]} />
        <meshBasicMaterial
          color="#5b3aff"
          transparent
          opacity={0.08}
          toneMapped={false}
        />
      </mesh>

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 1.25;
        const isQuarter = i % 3 === 0;

        return (
          <mesh
            key={i}
            position={[
              Math.sin(angle) * radius,
              Math.cos(angle) * radius,
              0.04,
            ]}
            rotation={[0, 0, -angle]}
          >
            <boxGeometry
              args={
                isQuarter
                  ? [0.06, 0.22, 0.04]
                  : [0.045, 0.15, 0.04]
              }
            />
            <meshStandardMaterial
              color="#a9b0ff"
              emissive="#5b6bff"
              emissiveIntensity={isQuarter ? 1.2 : 0.6}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      <ClockHands />
    </group>
  );
}

/* ============================================================
   FLOATING ORBITAL PARTICLES
============================================================ */

function OrbitingParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map(() => {
      const radius = 2.2 + Math.random() * 1.4;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 3.2;
      const speed = 0.05 + Math.random() * 0.15;
      const size = 0.015 + Math.random() * 0.03;

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
            color={i % 3 === 0 ? "#a855f7" : "#8b9dff"}
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
   CLOCK + INTERACTION
============================================================ */

function FloatingClock() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetX = state.pointer.x * 0.25;
    const targetY = state.pointer.y * 0.25;

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
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
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
        <ambientLight intensity={0.35} />

        <directionalLight
          position={[4, 5, 6]}
          intensity={1.6}
          color="#dfe6ff"
        />

        <pointLight
          position={[-5, 1, 4]}
          intensity={2.2}
          color="#7c3aed"
        />

        <pointLight
          position={[3, -4, 2]}
          intensity={1.2}
          color="#3b82f6"
        />

        <pointLight
          position={[0, 2, -5]}
          intensity={1.0}
          color="#10b981"
        />

        <FloatingClock />
      </Canvas>
    </div>
  );
}