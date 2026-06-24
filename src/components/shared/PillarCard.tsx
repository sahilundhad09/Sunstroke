"use client";

import { Wrench, Package, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const iconMap = {
  wrench: Wrench,
  package: Package,
  star: Star,
} as const;

const accentMap = {
  cyan: {
    glow: "rgba(0,212,255,0.15)",
    border: "rgba(0,212,255,0.2)",
    text: "text-sunstroke-cyan",
    bg: "bg-sunstroke-cyan/10",
  },
  blue: {
    glow: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.2)",
    text: "text-sunstroke-blue",
    bg: "bg-sunstroke-blue/10",
  },
  violet: {
    glow: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.2)",
    text: "text-sunstroke-violet",
    bg: "bg-sunstroke-violet/10",
  },
} as const;

interface PillarCardProps {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  cta: string;
  icon: keyof typeof iconMap;
  accent: keyof typeof accentMap;
}

export function PillarCard({
  title,
  subtitle,
  description,
  href,
  cta,
  icon,
  accent,
}: PillarCardProps) {
  const Icon = iconMap[icon];
  const colors = accentMap[accent];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-2xl border bg-sunstroke-surface/40 p-6 sm:p-8 transition-all duration-300 backdrop-blur-sm hover:bg-sunstroke-surface/60"
        style={{
          borderColor: colors.border,
        }}
      >
        {/* Hover glow effect */}
        <div
          className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${colors.glow}, transparent)`,
          }}
        />

        <div className="relative">
          {/* Icon */}
          <div
            className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
          >
            <Icon className={`h-6 w-6 ${colors.text}`} />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className={`mt-1 text-sm font-medium ${colors.text}`}>
            {subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-sunstroke-text-muted">
            {description}
          </p>

          {/* CTA */}
          <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${colors.text}`}>
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
