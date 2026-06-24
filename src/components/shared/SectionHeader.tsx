"use client";

import { FadeIn } from "@/components/motion/FadeIn";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <FadeIn className={`mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-sunstroke-border bg-sunstroke-surface/50 px-4 py-1.5 text-xs font-medium tracking-wider text-sunstroke-cyan uppercase">
          {badge}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-sunstroke-text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
