"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { Gift, Sparkles, BookOpen } from "lucide-react";

export function FreeValueSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#f4f1ea]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content side */}
          <FadeIn direction="right">
            <span className="mb-4 inline-block rounded-lg border-2 border-black bg-[#ffc700] px-4 py-1.5 text-xs font-heading font-black tracking-widest text-black uppercase shadow-gumroad-sm">
              Free Resource
            </span>
            <h2 className="font-heading text-3xl font-black text-black sm:text-4xl lg:text-5xl">
              Get the Free{" "}
              <span className="inline-block rounded-xl border-3 border-black bg-[#00d4ff] px-3 py-1 shadow-gumroad-sm transform rotate-1">
                Creator Toolkit
              </span>
            </h2>
            <p className="mt-4 text-base font-bold leading-relaxed text-zinc-800 sm:text-lg">
              A curated collection of my best resources for creators — templates, checklists, AI prompts, and workflow guides. Delivered straight to your inbox.
            </p>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              {[
                { icon: Gift, text: "50+ AI prompts for content creation" },
                { icon: Sparkles, text: "Creator workflow automation templates" },
                { icon: BookOpen, text: "Weekly insights & early access to tools" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#ff90e8] shadow-gumroad-sm">
                    <item.icon className="h-4 w-4 text-black stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-black text-black">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Form side */}
          <FadeIn direction="left" delay={0.1}>
            <div className="rounded-2xl border-3 border-black bg-white p-6 shadow-gumroad sm:p-8">
              <h3 className="font-heading text-xl font-black text-black">
                Join the Newsletter
              </h3>
              <p className="mt-2 text-sm font-bold text-zinc-700">
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
