"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export function ClosingCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,212,255,0.4) 0%, rgba(59,130,246,0.15) 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to{" "}
            <span className="gradient-text">Build Smarter?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-sunstroke-text-muted sm:text-lg">
            Join 1,000+ creators getting weekly insights on AI tools, digital
            products, and strategies to grow as an indie builder.
          </p>

          <div className="mx-auto mt-8 max-w-md">
            <NewsletterForm
              source="closing-cta"
              variant="inline"
              placeholder="your@email.com"
              buttonText="Let's Go"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
