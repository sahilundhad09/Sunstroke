"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { trustBadges } from "@/lib/constants";
import { Zap, Users, Award, Rocket } from "lucide-react";

const iconMap = [Zap, Users, Award, Rocket];

export function TrustSection() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <p className="text-base font-medium text-sunstroke-text-muted sm:text-lg">
            Creator-first. Technically credible. Built for builders.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {trustBadges.map((badge, index) => {
            const Icon = iconMap[index];
            return (
              <StaggerItem key={badge.label}>
                <div className="glass-card flex flex-col items-center p-5 text-center sm:p-6">
                  <Icon className="mb-3 h-5 w-5 text-sunstroke-cyan" />
                  <span className="text-2xl font-bold text-white sm:text-3xl">
                    {badge.value}
                  </span>
                  <span className="mt-1 text-xs text-sunstroke-text-muted sm:text-sm">
                    {badge.label}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
