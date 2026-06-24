"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Shield } from "lucide-react";
import { CTAButton } from "./CTAButton";
import type { ApiResponse } from "@/types";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type SubscribeData = z.infer<typeof subscribeSchema>;

interface NewsletterFormProps {
  source?: string;
  variant?: "inline" | "stacked";
  showPrivacy?: boolean;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function NewsletterForm({
  source = "website",
  variant = "inline",
  showPrivacy = true,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  className = "",
}: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubscribeData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeData) => {
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, source }),
      });

      const result: ApiResponse = await res.json();

      if (result.success) {
        setSubmitted(true);
        reset();
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Connection failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4 ${className}`}>
        <CheckCircle className="h-5 w-5 shrink-0 text-green-400" />
        <div>
          <p className="font-medium text-green-300">You&apos;re in!</p>
          <p className="text-sm text-green-400/70">
            Check your inbox for a welcome email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          variant === "inline"
            ? "flex flex-col gap-3 sm:flex-row"
            : "flex flex-col gap-3"
        }
      >
        <div className="relative flex-1">
          <input
            type="email"
            placeholder={placeholder}
            {...register("email")}
            className="h-12 w-full rounded-xl border border-sunstroke-border bg-sunstroke-surface/60 px-4 text-sm text-white placeholder:text-sunstroke-text-dim focus:border-sunstroke-cyan/40 focus:outline-none focus:ring-1 focus:ring-sunstroke-cyan/20 transition-colors backdrop-blur-sm"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="absolute -bottom-5 left-0 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <CTAButton
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="h-12 whitespace-nowrap"
        >
          <Send className="h-4 w-4" />
          {buttonText}
        </CTAButton>
      </form>

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}

      {showPrivacy && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-sunstroke-text-dim">
          <Shield className="h-3 w-3" />
          No spam, ever. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
