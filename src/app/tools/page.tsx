import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ToolCard } from "@/components/shared/ToolCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { FadeIn } from "@/components/motion/FadeIn";
import { CTAButton } from "@/components/shared/CTAButton";
import { featuredTools } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "AI-powered tools built by Sunstroke to help creators and indie builders work smarter and ship faster.",
};

export default function ToolsPage() {
  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="AI-Powered"
            title="Tools I've Built"
            subtitle="Intelligent software designed to help creators work faster, automate workflows, and ship products with confidence."
          />

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <StaggerItem key={tool.id}>
                <ToolCard {...tool} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-16 text-center">
            <div className="glass-card mx-auto max-w-2xl p-8">
              <h3 className="text-xl font-bold text-white">
                Have an idea for a tool?
              </h3>
              <p className="mt-2 text-sm text-sunstroke-text-muted">
                I love building tools that solve real problems. Share your idea and
                I&apos;ll see how I can help.
              </p>
              <div className="mt-4">
                <CTAButton href="/contact" variant="secondary" showArrow>
                  Share Your Idea
                </CTAButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
