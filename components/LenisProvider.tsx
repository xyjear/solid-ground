"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { cancelFrame, frame } from "framer-motion";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (data: { timestamp: number }) =>
      lenisRef.current?.lenis?.raf(data.timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.08, duration: 1.2, autoRaf: false }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
