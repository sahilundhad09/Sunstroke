"use client";

import { motion } from "framer-motion";
import { ExternalLink, Quote } from "lucide-react";

interface AffiliateCardProps {
  name: string;
  description: string;
  category: string;
  recommendation: string;
  href: string;
}

export function AffiliateCard({
  name,
  description,
  category,
  recommendation,
  href,
}: AffiliateCardProps) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group relative block rounded-2xl border border-sunstroke-border bg-sunstroke-surface/40 p-6 transition-all duration-300 hover:border-sunstroke-border-hover hover:bg-sunstroke-surface/60 backdrop-blur-sm"
      >
        {/* Category + disclosure */}
        <div className="flex items-center justify-between">
          <span className="rounded-lg border border-sunstroke-border bg-sunstroke-dark/50 px-2.5 py-1 text-xs font-medium text-sunstroke-text-muted">
            {category}
          </span>
          <span className="text-[10px] tracking-wider text-sunstroke-text-dim uppercase">
            Affiliate
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-white group-hover:text-sunstroke-cyan transition-colors">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-sunstroke-text-muted">
          {description}
        </p>

        {/* Recommendation quote */}
        <div className="mt-4 rounded-xl border border-sunstroke-border/50 bg-sunstroke-dark/30 p-3">
          <Quote className="mb-1 h-3 w-3 text-sunstroke-cyan/50" />
          <p className="text-xs italic leading-relaxed text-sunstroke-text-muted">
            {recommendation}
          </p>
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sunstroke-cyan">
          Check It Out
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </a>
    </motion.div>
  );
}
