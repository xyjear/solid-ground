"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import FloatingShape from "./FloatingShape";

const shapes: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
  phase: number;
}[] = [
  {
    geometry: new THREE.IcosahedronGeometry(1.2, 0),
    position: [-3, 1, -4],
    rotationSpeed: [0.3, 0.5, 0.1],
    floatSpeed: 0.6,
    floatAmplitude: 0.3,
    phase: 0,
  },
  {
    geometry: new THREE.TorusGeometry(0.9, 0.3, 16, 32),
    position: [3.5, -0.5, -3],
    rotationSpeed: [0.4, 0.2, 0.3],
    floatSpeed: 0.8,
    floatAmplitude: 0.25,
    phase: 1.5,
  },
  {
    geometry: new THREE.OctahedronGeometry(1, 0),
    position: [-2, -2, -5],
    rotationSpeed: [0.2, 0.6, 0.15],
    floatSpeed: 0.5,
    floatAmplitude: 0.35,
    phase: 3,
  },
  {
    geometry: new THREE.BoxGeometry(0.8, 0.8, 0.8),
    position: [2.5, 1.5, -4.5],
    rotationSpeed: [0.5, 0.3, 0.2],
    floatSpeed: 0.7,
    floatAmplitude: 0.2,
    phase: 2,
  },
];

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} color="#D4A843" />
        <pointLight position={[0, 0, 5]} intensity={1} color="#D4A843" />
        {shapes.map((s, i) => (
          <FloatingShape key={i} {...s} />
        ))}
      </Canvas>
    </div>
  );
}
