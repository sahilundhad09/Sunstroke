"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { CTAButton } from "@/components/shared/CTAButton";
import { GlowPulse } from "@/components/motion/GlowPulse";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* Logo with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-8 flex justify-center"
        >
          <GlowPulse intensity="lg" className="rounded-2xl">
            <Image
              src="/logo.png"
              alt="Sunstroke"
              width={320}
              height={80}
              className="h-16 sm:h-20 lg:h-24"
              style={{ width: "auto", height: "auto", maxHeight: "96px" }}
              priority
            />
          </GlowPulse>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          Build Smarter.{" "}
          <span className="gradient-text">Create Bolder.</span>
          <br />
          Ship Faster.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-sunstroke-text-muted sm:text-lg lg:text-xl"
        >
          I build AI-powered tools, create digital products, and curate the best
          software for creators and indie builders. Join the movement.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <CTAButton href="/newsletter" size="lg" showArrow>
            Join the Newsletter
          </CTAButton>
          <CTAButton href="/tools" variant="secondary" size="lg" showArrow>
            Explore Tools
          </CTAButton>
        </motion.div>

        {/* Trust chip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2 border-sunstroke-dark bg-gradient-to-br from-sunstroke-surface-light to-sunstroke-surface"
              />
            ))}
          </div>
          <p className="text-sm text-sunstroke-text-dim">
            Trusted by <span className="text-sunstroke-text-muted font-medium">1,000+</span> creators
          </p>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sunstroke-dark to-transparent" />
    </section>
  );
}
