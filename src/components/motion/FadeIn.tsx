"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  distance?: number;
}

export function FadeIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.55,
  once = true,
  distance = 24,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const dirMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
    none: { y: 0, x: 0 },
  };

  const offset = dirMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] as any,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
