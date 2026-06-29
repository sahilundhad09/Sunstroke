"use client";

import { Wrench, Package, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const iconMap = { wrench: Wrench, package: Package, star: Star } as const;

const accentMap = {
  cyan: {
    bg: "bg-[#00d4ff]",
    btn: "bg-[#ffffff]",
  },
  blue: {
    bg: "bg-[#ff90e8]",
    btn: "bg-[#ffffff]",
  },
  violet: {
    bg: "bg-[#ffc700]",
    btn: "bg-[#ffffff]",
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

export function PillarCard({ title, subtitle, description, href, cta, icon, accent }: PillarCardProps) {
  const Icon = iconMap[icon];
  const colors = accentMap[accent];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
    >
      <Link
        href={href}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-3 border-black ${colors.bg} p-6 shadow-gumroad transition-all duration-200 hover:shadow-gumroad-lg sm:p-8`}
      >
        <div>
          {/* Icon Badge */}
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-white shadow-gumroad-sm">
            <Icon className="h-6 w-6 text-black stroke-[2.5]" />
          </div>

          <h3 className="font-heading text-2xl font-black text-black">{title}</h3>
          <p className="mt-1 font-mono text-xs font-black uppercase tracking-wider text-black">{subtitle}</p>
          <p className="mt-3 text-sm font-bold leading-relaxed text-zinc-900">{description}</p>
        </div>

        <div className="mt-8">
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-black shadow-gumroad-sm transition-transform group-hover:translate-x-1">
            {cta}
            <ArrowRight className="h-4 w-4 stroke-[3]" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
