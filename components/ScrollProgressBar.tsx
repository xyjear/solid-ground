"use client";

import { useLenis } from "lenis/react";
import { useMotionValue, useTransform, motion } from "framer-motion";

export default function ScrollProgressBar() {
  const scrollYProgress = useMotionValue(0);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useLenis(({ progress }: { progress: number }) => {
    scrollYProgress.set(progress);
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gold origin-left z-50"
      style={{ scaleX }}
    />
  );
}
