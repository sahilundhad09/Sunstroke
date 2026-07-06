"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Shield } from "lucide-react";
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
        // ── Meta Pixel: track Lead on successful email signup ──
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead");
        }
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Connection failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 rounded-xl border-2 border-black bg-[#00e599] p-4 text-black shadow-gumroad-sm ${className}`}>
        <CheckCircle className="h-5 w-5 shrink-0 text-black stroke-[2.5]" />
        <div>
          <p className="font-heading font-black text-black">You&apos;re in!</p>
          <p className="text-xs font-bold text-zinc-900">
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
            className="h-12 w-full rounded-xl border-2 border-black bg-white px-4 text-sm font-bold text-black placeholder:text-zinc-500 shadow-gumroad-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="absolute -bottom-5 left-0 text-xs font-bold text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gumroad h-12 whitespace-nowrap px-6 text-xs font-black uppercase tracking-wider gap-2"
        >
          <Send className="h-4 w-4 stroke-[2.5]" />
          {buttonText}
        </button>
      </form>

      {error && (
        <p className="mt-2 text-sm font-bold text-red-600">{error}</p>
      )}

      {showPrivacy && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-zinc-700">
          <Shield className="h-3.5 w-3.5 stroke-[2]" />
          No spam, ever. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
