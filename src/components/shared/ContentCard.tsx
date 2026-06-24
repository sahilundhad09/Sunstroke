"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface ContentCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  href: string;
}

export function ContentCard({
  title,
  excerpt,
  category,
  date,
  href,
}: ContentCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
      <Link
        href={href}
        className="group relative block rounded-2xl border border-sunstroke-border bg-sunstroke-surface/40 p-6 transition-all duration-300 hover:border-sunstroke-border-hover hover:bg-sunstroke-surface/60 backdrop-blur-sm"
      >
        {/* Meta */}
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-sunstroke-cyan/10 px-2.5 py-1 text-xs font-medium text-sunstroke-cyan">
            {category}
          </span>
          <span className="flex items-center gap-1 text-xs text-sunstroke-text-dim">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold leading-snug text-white group-hover:text-sunstroke-cyan transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-sunstroke-text-muted line-clamp-2">
          {excerpt}
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sunstroke-cyan opacity-70 transition-opacity group-hover:opacity-100">
          Read More
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
