import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/shared/SectionHeader";
import Link from "next/link";
import { Code, Cpu, Lightbulb, Rocket, Target, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Sunstroke — a creator-tech brand building AI tools, digital products, and sharing the best software for creators.",
};

const skills = [
  { icon: Cpu, label: "AI & Machine Learning  ", description: "Building intelligent tools with modern AI", bg: "bg-[#00d4ff]" },
  { icon: Code, label: "Full-Stack Development ", description: "Next.js, TypeScript, and modern web tech", bg: "bg-[#ff90e8]" },
  { icon: Lightbulb, label: "Product Design", description: "Crafting premium digital experiences", bg: "bg-[#ffc700]" },
  { icon: Target, label: "Growth Strategy", description: "Newsletter-led audience building", bg: "bg-[#00e599]" },
  { icon: Rocket, label: "Indie Building", description: "Shipping fast and iterating with users", bg: "bg-[#00d4ff]" },
  { icon: Zap, label: "Automation", description: "Streamlining workflows with smart tools", bg: "bg-[#ff90e8]" },
];

export default function AboutPage() {
  return (
    <div className="pt-24 bg-[#f4f1ea]">
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <FadeIn>
            <span className="mb-4 inline-block rounded-lg border-2 border-black bg-[#00d4ff] px-4 py-1.5 font-heading text-xs font-black tracking-widest text-black uppercase shadow-gumroad-sm">
              About Sunstroke
            </span>
            <h1 className="font-heading text-4xl font-black text-black sm:text-5xl lg:text-6xl">
              Builder. Creator.{" "}
              <span className="inline-block rounded-xl border-3 border-black bg-[#ffc700] px-3 py-1 shadow-gumroad-sm transform rotate-1">
                Maker of Things.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-bold leading-relaxed text-zinc-800 sm:text-lg">
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
            <div className="rounded-2xl border-3 border-black bg-white p-8 shadow-gumroad sm:p-10">
              <h2 className="font-heading text-2xl font-black text-black sm:text-3xl">The Story</h2>
              <div className="mt-6 space-y-4 text-base font-bold leading-relaxed text-zinc-800">
                <p>
                  Sunstroke started with a simple idea:{" "}
                  <span className="inline-block rounded-md border-2 border-black bg-[#ffc700] px-2 font-black text-black">
                    build the tools I wish existed.
                  </span>{" "}
                  As a creator navigating the AI revolution, I noticed a gap between powerful technology and the practical tools creators actually need.
                </p>
                <p>
                  Instead of waiting for someone else to bridge that gap, I started building.
                  What began as side projects evolved into a full creator-tech brand — one
                  focused on helping others build smarter, create bolder, and ship faster.
                </p>
                <p>
                  Today, Sunstroke is a growing ecosystem of AI tools, digital products, and
                  curated recommendations — all designed with one goal:{" "}
                  <span className="inline-block rounded-md border-2 border-black bg-[#00d4ff] px-2 font-black text-black">
                    empowering creators and indie builders to do their best work.
                  </span>
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
            accentColor="cyan"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, i) => (
              <FadeIn key={skill.label} delay={i * 0.05}>
                <div className={`gumroad-card ${skill.bg} flex items-start gap-4 p-5`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-white shadow-gumroad-sm">
                    <skill.icon className="h-5 w-5 text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-black">{skill.label}</h3>
                    <p className="mt-1 text-sm font-bold text-zinc-900">
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
            <div className="rounded-2xl border-3 border-black bg-[#ffc700] p-8 shadow-gumroad sm:p-10">
              <h2 className="font-heading text-3xl font-black text-black sm:text-4xl">
                The Mission
              </h2>
              <p className="mt-6 text-lg font-black leading-relaxed text-black">
                To democratize the best of AI and modern technology for creators.
                To build tools that actually help. To share knowledge that actually
                matters. And to prove that one person with the right tools can build
                something extraordinary.
              </p>
              <div className="mt-8">
                <Link
                  href="/newsletter"
                  className="btn-gumroad inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-wider"
                >
                  Join the Journey <ArrowRight className="h-4 w-4 stroke-[3]" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
