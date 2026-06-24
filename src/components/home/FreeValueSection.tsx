"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { Gift, Sparkles, BookOpen } from "lucide-react";

export function FreeValueSection() {
  return (
    <section className="relative py-20 sm:py-28">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,212,255,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content side */}
          <FadeIn direction="right">
            <span className="mb-4 inline-block rounded-full border border-sunstroke-border bg-sunstroke-surface/50 px-4 py-1.5 text-xs font-medium tracking-wider text-sunstroke-cyan uppercase">
              Free Resource
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Get the Free{" "}
              <span className="gradient-text">Creator Toolkit</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sunstroke-text-muted sm:text-lg">
              A curated collection of my best resources for creators — templates,
              checklists, AI prompts, and workflow guides. Delivered straight to
              your inbox.
            </p>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              {[
                { icon: Gift, text: "50+ AI prompts for content creation" },
                { icon: Sparkles, text: "Creator workflow automation templates" },
                { icon: BookOpen, text: "Weekly insights & early access to tools" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sunstroke-cyan/10">
                    <item.icon className="h-4 w-4 text-sunstroke-cyan" />
                  </div>
                  <span className="text-sm text-sunstroke-text">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Form side */}
          <FadeIn direction="left" delay={0.1}>
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white">
                Join the Newsletter
              </h3>
              <p className="mt-2 text-sm text-sunstroke-text-muted">
                Get the toolkit + weekly creator insights. Free forever.
              </p>
              <div className="mt-5">
                <NewsletterForm
                  source="free-value-section"
                  variant="stacked"
                  placeholder="your@email.com"
                  buttonText="Get Free Access"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
