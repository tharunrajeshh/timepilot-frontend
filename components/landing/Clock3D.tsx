"use client";

import { Float, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

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
        <RoundedBox args={[0.12, 1.2, 0.08]} radius={0.04} smoothness={4} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#1a1a1a" />
        </RoundedBox>
      </group>

      <group ref={minuteHand}>
        <RoundedBox args={[0.08, 1.8, 0.06]} radius={0.03} smoothness={4} position={[0, 0.9, 0.05]}>
          <meshStandardMaterial color="#333333" />
        </RoundedBox>
      </group>

      <group ref={secondHand}>
        <RoundedBox args={[0.03, 2.1, 0.04]} radius={0.015} smoothness={4} position={[0, 1.05, 0.1]}>
          <meshStandardMaterial color="#ff3b30" />
        </RoundedBox>
      </group>

      <mesh position={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 32]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function ClockFace() {
  return (
    <group>
      <RoundedBox args={[5, 5, 0.5]} radius={0.4} smoothness={8} position={[0, 0, -0.25]}>
        <meshStandardMaterial color="#f5f5f7" metalness={0.3} roughness={0.4} />
      </RoundedBox>

      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 1.9;
        return (
          <mesh
            key={i}
            position={[Math.sin(angle) * radius, Math.cos(angle) * radius, 0.05]}
            rotation={[0, 0, -angle]}
          >
            <boxGeometry args={[0.08, 0.25, 0.05]} />
            <meshStandardMaterial color="#666666" />
          </mesh>
        );
      })}

      <ClockHands />
    </group>
  );
}

function MouseFollowClock() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // state.pointer.x and .y are normalized (-1 to 1)
    const targetX = state.pointer.x * 0.6;   // tilt up/down
    const targetY = state.pointer.y * 0.6;   // tilt left/right

    // Smoothly lerp toward target for a nice eased motion
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -targetY,
      4,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetX,
      4,
      delta
    );

    // Optional: slight position drift for parallax
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      state.pointer.x * 0.4,
      4,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      state.pointer.y * 0.4,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <ClockFace />
    </group>
  );
}

export default function Clock() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-900 to-slate-700">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} />

        <MouseFollowClock />
      </Canvas>
    </div>
  );
}