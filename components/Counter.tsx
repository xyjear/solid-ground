"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
}

export default function Counter({ target, suffix = "", label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 50, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) count.set(target);
  }, [inView, count, target]);

  return (
    <div ref={ref} className="text-center">
      <motion.div className="text-4xl font-heading font-bold text-gold">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </motion.div>
      <div className="text-sm text-white/60 mt-1">{label}</div>
    </div>
  );
}
