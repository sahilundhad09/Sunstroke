"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function CTAButton({
  children,
  href,
  variant = "primary",
  size = "md",
  showArrow = false,
  loading = false,
  className,
  onClick,
  type = "button",
  disabled = false,
}: CTAButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunstroke-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-sunstroke-dark disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-sunstroke-cyan text-sunstroke-dark hover:bg-sunstroke-cyan/90 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] active:translate-y-0",
    secondary:
      "border border-sunstroke-border bg-transparent text-sunstroke-text hover:border-sunstroke-cyan/40 hover:bg-sunstroke-surface hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]",
    ghost:
      "text-sunstroke-cyan hover:text-white hover:bg-sunstroke-surface/50",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
      {showArrow && !loading && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(classes, "group")}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(classes, "group")}
    >
      {content}
    </button>
  );
}
