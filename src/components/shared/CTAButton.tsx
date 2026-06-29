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
    "inline-flex items-center justify-center gap-2 font-heading font-black rounded-xl cursor-pointer select-none focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black shadow-gumroad-sm transition-transform active:translate-y-[2px] active:shadow-none";

  const variantClasses = {
    primary:
      "bg-[#ffc700] text-black hover:bg-[#ff9f0a] hover:-translate-y-0.5",
    secondary:
      "bg-white text-black hover:bg-[#f4f1ea] hover:-translate-y-0.5",
    ghost:
      "border-transparent shadow-none bg-transparent text-black hover:bg-black/5",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs uppercase tracking-wider",
    md: "px-6 py-3 text-xs uppercase tracking-wider",
    lg: "px-8 py-4 text-sm uppercase tracking-wider",
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin stroke-[2.5]" />}
      {children}
      {showArrow && !loading && (
        <ArrowRight className="h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-0.5" />
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
