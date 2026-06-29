"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  target: string; // e.g. "1,000+" or "10+"
  className?: string;
}

export function AnimatedCounter({ target, className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    // Parse numeric part
    const numericStr = target.replace(/[^0-9]/g, "");
    const suffix = target.replace(/[0-9,]/g, "");
    const end = parseInt(numericStr.replace(/,/g, ""), 10);
    if (isNaN(end)) { setDisplay(target); return; }

    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      const formatted = end >= 1000 ? current.toLocaleString() : current.toString();
      setDisplay(formatted + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
