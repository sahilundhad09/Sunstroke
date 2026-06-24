import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AffiliateCard } from "@/components/shared/AffiliateCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { FadeIn } from "@/components/motion/FadeIn";
import { affiliateTools } from "@/lib/constants";
import { Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Recommend",
  description:
    "Curated tools and software personally used and recommended by Sunstroke for creators and indie builders.",
};

export default function RecommendPage() {
  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Handpicked"
            title="Tools I Recommend"
            subtitle="Every tool on this page is something I personally use and trust. These are the tools that power my creator workflow."
          />

          {/* Disclosure */}
          <FadeIn className="mx-auto mb-10 max-w-2xl">
            <div className="flex items-start gap-3 rounded-xl border border-sunstroke-border/50 bg-sunstroke-surface/30 p-4 text-xs text-sunstroke-text-dim">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sunstroke-text-dim" />
              <p>
                <span className="font-medium text-sunstroke-text-muted">Disclosure:</span>{" "}
                Some links on this page are affiliate links. This means I may earn a
                small commission if you make a purchase — at no extra cost to you. I
                only recommend tools I genuinely use and love.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2">
            {affiliateTools.map((tool) => (
              <StaggerItem key={tool.id}>
                <AffiliateCard {...tool} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
