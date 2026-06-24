"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  category: string;
  href: string;
}

export function ProductCard({
  title,
  description,
  price,
  category,
  href,
}: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-2xl border border-sunstroke-border bg-sunstroke-surface/40 transition-all duration-300 hover:border-sunstroke-border-hover hover:bg-sunstroke-surface/60 backdrop-blur-sm"
      >
        {/* Thumbnail area */}
        <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-sunstroke-surface to-sunstroke-dark">
          <ShoppingBag className="h-12 w-12 text-sunstroke-cyan/30" />
          <div className="absolute right-3 top-3 rounded-full bg-sunstroke-cyan px-3 py-1 text-xs font-bold text-sunstroke-dark">
            {price}
          </div>
        </div>

        <div className="p-5">
          <span className="text-xs font-medium tracking-wider text-sunstroke-cyan/70 uppercase">
            {category}
          </span>
          <h3 className="mt-1.5 text-lg font-bold text-white group-hover:text-sunstroke-cyan transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-sunstroke-text-muted">
            {description}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sunstroke-cyan">
            Get It Now
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
