"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { cancelFrame, frame } from "framer-motion";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const update = (data: { timestamp: number }) =>
      lenis.raf(data.timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.08, duration: 1.2, autoRaf: false }}
    >
      {children}
    </ReactLenis>
  );
}
