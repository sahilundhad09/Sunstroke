"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let t = 0;

    const animate = () => {
      t += 0.003;
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${Math.sin(t) * 30}px, ${Math.cos(t * 0.7) * 20}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${Math.cos(t * 0.8) * 25}px, ${Math.sin(t * 1.1) * 30}px)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(${Math.sin(t * 1.3) * 20}px, ${Math.cos(t * 0.6) * 25}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#09080c] to-[#030303]" />

      {/* Orb 1 — Solar Gold */}
      <div ref={orb1Ref} className="absolute -left-24 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle, #f5a623 0%, transparent 70%)" }} />

      {/* Orb 2 — Sunset Orange */}
      <div ref={orb2Ref} className="absolute -right-24 top-1/3 h-[450px] w-[450px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #ff6b00 0%, transparent 70%)" }} />

      {/* Orb 3 — Solar Rose */}
      <div ref={orb3Ref} className="absolute bottom-1/4 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #e11d48 0%, transparent 70%)" }} />

      {/* Center glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(ellipse, #f5a623 0%, transparent 60%)" }} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,166,35,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,166,35,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial vignette mask */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #030303 100%)" }} />
    </div>
  );
}
