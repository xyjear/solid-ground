"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import FloatingShape from "./FloatingShape";

const desktopPositions: [number, number, number][] = [
  [-5, 2.5, -6],
  [5, -1.5, -5],
  [-4.5, -3, -7],
  [4.5, 2.5, -6],
];

const tabletPositions: [number, number, number][] = [
  [-3.5, 2, -5],
  [3.5, -1, -4],
  [-3, -2, -5],
  [3, 2, -5],
];

const mobilePositions: [number, number, number][] = [
  [-2.5, 1.5, -4],
  [2.5, -0.5, -3.5],
  [-2, -1.5, -4],
  [2, 1.5, -4],
];

const geometries = [
  new THREE.IcosahedronGeometry(1.2, 0),
  new THREE.DodecahedronGeometry(0.9, 0),
  new THREE.OctahedronGeometry(1, 0),
  new THREE.BoxGeometry(0.8, 0.8, 0.8),
];

const rotationSpeeds: [number, number, number][] = [
  [0.3, 0.5, 0.1],
  [0.4, 0.2, 0.3],
  [0.2, 0.6, 0.15],
  [0.5, 0.3, 0.2],
];

const floatSpeeds = [0.6, 0.8, 0.5, 0.7];
const floatAmplitudes = [0.3, 0.25, 0.35, 0.2];
const phases = [0, 1.5, 3, 2];

export default function Scene3D() {
  const [bp, setBp] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (max-width: 1023px)");
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const positions =
    bp === "mobile" ? mobilePositions
    : bp === "tablet" ? tabletPositions
    : desktopPositions;

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} color="#D4A843" />
        <pointLight position={[0, 0, 5]} intensity={1} color="#D4A843" />
        {geometries.map((geo, i) => (
          <FloatingShape
            key={i}
            geometry={geo}
            position={positions[i]}
            rotationSpeed={rotationSpeeds[i]}
            floatSpeed={floatSpeeds[i]}
            floatAmplitude={floatAmplitudes[i]}
            phase={phases[i]}
          />
        ))}
      </Canvas>
    </div>
  );
}
