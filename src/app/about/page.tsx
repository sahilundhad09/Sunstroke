import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CTAButton } from "@/components/shared/CTAButton";
import { Code, Cpu, Lightbulb, Rocket, Target, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Sunstroke — a creator-tech brand building AI tools, digital products, and sharing the best software for creators.",
};

const skills = [
  { icon: Cpu, label: "AI & Machine Learning", description: "Building intelligent tools with modern AI" },
  { icon: Code, label: "Full-Stack Development", description: "Next.js, TypeScript, and modern web tech" },
  { icon: Lightbulb, label: "Product Design", description: "Crafting premium digital experiences" },
  { icon: Target, label: "Growth Strategy", description: "Newsletter-led audience building" },
  { icon: Rocket, label: "Indie Building", description: "Shipping fast and iterating with users" },
  { icon: Zap, label: "Automation", description: "Streamlining workflows with smart tools" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <span className="mb-4 inline-block rounded-full border border-sunstroke-border bg-sunstroke-surface/50 px-4 py-1.5 text-xs font-medium tracking-wider text-sunstroke-cyan uppercase">
              About Sunstroke
            </span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Builder. Creator.{" "}
              <span className="gradient-text">Maker of Things.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-sunstroke-text-muted sm:text-lg">
              I&apos;m the creator behind Sunstroke — a one-person studio focused on
              building AI-powered tools, crafting digital products, and sharing
              the best software with creators and indie builders worldwide.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn>
            <div className="prose prose-invert mx-auto max-w-none">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">The Story</h2>
              <div className="mt-6 space-y-4 text-sunstroke-text-muted leading-relaxed">
                <p>
                  Sunstroke started with a simple idea: <span className="text-white font-medium">build the tools I wish existed.</span> As 
                  a creator navigating the AI revolution, I noticed a gap between powerful 
                  technology and the practical tools creators actually need.
                </p>
                <p>
                  Instead of waiting for someone else to bridge that gap, I started building. 
                  What began as side projects evolved into a full creator-tech brand — one 
                  focused on helping others build smarter, create bolder, and ship faster.
                </p>
                <p>
                  Today, Sunstroke is a growing ecosystem of AI tools, digital products, and 
                  curated recommendations — all designed with one goal: <span className="text-sunstroke-cyan font-medium">empowering 
                  creators and indie builders to do their best work.</span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* Skills */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Expertise"
            title="What I Bring to the Table"
            subtitle="A blend of technical skills and creator instinct."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, i) => (
              <FadeIn key={skill.label} delay={i * 0.05}>
                <div className="glass-card flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sunstroke-cyan/10">
                    <skill.icon className="h-5 w-5 text-sunstroke-cyan" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{skill.label}</h3>
                    <p className="mt-1 text-sm text-sunstroke-text-muted">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Mission + CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              The Mission
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-sunstroke-text-muted">
              To democratize the best of AI and modern technology for creators. 
              To build tools that actually help. To share knowledge that actually 
              matters. And to prove that one person with the right tools can build 
              something extraordinary.
            </p>
            <div className="mt-8">
              <CTAButton href="/newsletter" size="lg" showArrow>
                Join the Journey
              </CTAButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
