"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { PillarCard } from "@/components/shared/PillarCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { pillars } from "@/lib/constants";

export function PillarsSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What I Do"
          title="Three Pillars of Sunstroke"
          subtitle="Everything I create is designed to help creators and indie builders succeed with modern tools."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title}>
              <PillarCard {...pillar} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
