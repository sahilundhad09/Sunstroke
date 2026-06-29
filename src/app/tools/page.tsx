import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ToolCard } from "@/components/shared/ToolCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { FadeIn } from "@/components/motion/FadeIn";
import { CTAButton } from "@/components/shared/CTAButton";
import { getDbTools } from "@/lib/db";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "AI-powered tools built by Sunstroke to help creators and indie builders work smarter and ship faster.",
};

export default async function ToolsPage() {
  const tools = await getDbTools();

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="AI-Powered"
            title="Tools I've Built"
            subtitle="Intelligent software designed to help creators work faster, automate workflows, and ship products with confidence."
            accentColor="cyan"
          />

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <StaggerItem key={tool.id}>
                <ToolCard {...tool} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-16 text-center">
            <div className="gumroad-card mx-auto max-w-2xl bg-[#00d4ff] p-8 text-black">
              <h3 className="font-heading text-2xl font-black text-black">
                Have an idea for a tool?
              </h3>
              <p className="mt-2 text-sm font-bold text-zinc-900">
                I love building tools that solve real problems. Share your idea and I&apos;ll see how I can build it for you.
              </p>
              <div className="mt-6 flex justify-center">
                <CTAButton href="/contact" className="btn-gumroad text-sm px-6 py-3 uppercase">
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
