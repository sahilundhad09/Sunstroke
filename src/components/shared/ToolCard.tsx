"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Circle, Zap, Clock } from "lucide-react";
import Link from "next/link";

const statusConfig = {
  live: {
    label: "Live",
    icon: Zap,
    color: "text-green-400",
    bg: "bg-green-400/10",
    dot: "bg-green-400",
  },
  beta: {
    label: "Beta",
    icon: Circle,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    dot: "bg-amber-400",
  },
  "coming-soon": {
    label: "Coming Soon",
    icon: Clock,
    color: "text-sunstroke-text-dim",
    bg: "bg-sunstroke-surface",
    dot: "bg-sunstroke-text-dim",
  },
} as const;

interface ToolCardProps {
  title: string;
  description: string;
  status: keyof typeof statusConfig;
  category: string;
  href: string;
}

export function ToolCard({ title, description, status, category, href }: ToolCardProps) {
  const config = statusConfig[status];

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
      <Link
        href={href}
        className="group relative block rounded-2xl border border-sunstroke-border bg-sunstroke-surface/40 p-6 transition-all duration-300 hover:border-sunstroke-border-hover hover:bg-sunstroke-surface/60 backdrop-blur-sm"
      >
        <div className="flex items-start justify-between">
          <span className="rounded-lg border border-sunstroke-border bg-sunstroke-dark/50 px-2.5 py-1 text-xs font-medium text-sunstroke-text-muted">
            {category}
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg} ${config.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
            {config.label}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-white group-hover:text-sunstroke-cyan transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-sunstroke-text-muted">
          {description}
        </p>

        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sunstroke-cyan opacity-0 transition-opacity group-hover:opacity-100">
          {status === "coming-soon" ? "Get Notified" : "Try It"}
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </Link>
    </motion.div>
  );
}
