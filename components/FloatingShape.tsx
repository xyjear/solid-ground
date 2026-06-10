"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingShapeProps {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
  phase: number;
}

export default function FloatingShape({
  geometry,
  position,
  rotationSpeed,
  floatSpeed,
  floatAmplitude,
  phase,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += rotationSpeed[0] * 0.01;
    meshRef.current.rotation.y += rotationSpeed[1] * 0.01;
    meshRef.current.rotation.z += rotationSpeed[2] * 0.01;
    meshRef.current.position.y =
      initialY + Math.sin(t * floatSpeed + phase) * floatAmplitude;
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshBasicMaterial color="#D4A843" wireframe />
    </mesh>
  );
}
