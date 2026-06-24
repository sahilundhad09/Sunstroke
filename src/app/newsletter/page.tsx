import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/FadeIn";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { FAQSection } from "@/components/shared/FAQSection";
import { faqItems } from "@/lib/constants";
import { Mail, Zap, BookOpen, Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Join the Sunstroke newsletter for weekly insights on AI tools, creator strategies, and exclusive early access to new products.",
};

const benefits = [
  {
    icon: Zap,
    title: "Weekly AI Insights",
    description: "Curated updates on the best AI tools and how to use them effectively.",
  },
  {
    icon: BookOpen,
    title: "Creator Strategies",
    description: "Actionable tips for building, growing, and monetizing as an indie creator.",
  },
  {
    icon: Gift,
    title: "Exclusive Access",
    description: "Early access to new tools, beta invites, and subscriber-only discounts.",
  },
  {
    icon: Mail,
    title: "Zero Spam",
    description: "One email per week. No fluff, no spam, no selling your data. Ever.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full border border-sunstroke-border bg-sunstroke-surface/50 px-4 py-1.5 text-xs font-medium tracking-wider text-sunstroke-cyan uppercase">
              Newsletter
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Stay Ahead of the{" "}
              <span className="gradient-text">Creator Curve</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-sunstroke-text-muted sm:text-lg">
              Join 1,000+ creators and indie builders getting weekly insights on
              AI tools, digital products, and strategies to build smarter.
            </p>

            <div className="mx-auto mt-8 max-w-md">
              <NewsletterForm
                source="newsletter-page"
                variant="inline"
                placeholder="your@email.com"
                buttonText="Subscribe Free"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* Benefits */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <FadeIn key={benefit.title} delay={i * 0.05}>
                <div className="glass-card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sunstroke-cyan/10">
                    <benefit.icon className="h-6 w-6 text-sunstroke-cyan" />
                  </div>
                  <h3 className="font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-sunstroke-text-muted">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <FAQSection items={faqItems} />
        </div>
      </section>
    </div>
  );
}
