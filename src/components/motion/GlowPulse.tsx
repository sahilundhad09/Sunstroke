"use client";

import { type ReactNode } from "react";

interface GlowPulseProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: "sm" | "md" | "lg";
}

export function GlowPulse({
  children,
  className = "",
  intensity = "md",
}: GlowPulseProps) {
  const glowClass = {
    sm: "glow-sm",
    md: "glow-md",
    lg: "glow-lg",
  }[intensity];

  return (
    <div className={`animate-glow-pulse ${glowClass} ${className}`}>
      {children}
    </div>
  );
}
