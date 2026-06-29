"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { CTAButton } from "@/components/shared/CTAButton";

interface FeaturedContentProps {
  posts?: Array<{
    id: string;
    title: string;
    excerpt: string;
    href: string;
    category: string;
    date: string;
    readTime?: string;
    image?: string;
  }>;
}

export function FeaturedContent({ posts }: FeaturedContentProps) {
  const displayPosts = posts || [];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Latest"
          title="From the Sunstroke Lab"
          subtitle="Tutorials, case studies, and insights to help you build, ship, and grow as a creator."
          accentColor="green"
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {displayPosts.map((item) => (
            <StaggerItem key={item.id}>
              <ContentCard {...item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 text-center">
          <CTAButton href="#" variant="secondary" showArrow>
            View All Content
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
