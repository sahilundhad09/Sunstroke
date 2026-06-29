"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Target } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center bg-[#f4f1ea] py-24 sm:py-32">
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        
        {/* Top Pop Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-[#ffc700] px-4 py-1.5 font-heading text-xs font-black uppercase tracking-widest text-black shadow-gumroad-sm">
            <Zap className="h-4 w-4 fill-black" />
            AI Tools · Digital Products · Curations
          </span>
        </motion.div>

        {/* Centered Logo Emblem in Gumroad Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <div className="rounded-2xl border-4 border-black bg-white p-3 shadow-gumroad-lg transition-transform hover:-rotate-1">
            <Image
              src="/logo.png"
              alt="Sunstroke Emblem"
              width={240}
              height={240}
              priority
              className="h-44 w-44 rounded-xl border-2 border-black object-cover sm:h-52 sm:w-52"
            />
          </div>
        </motion.div>

        {/* Bold Gumroad Headline with Colorful Highlight Blocks */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-black tracking-tight text-black sm:text-6xl md:text-7xl font-heading leading-tight sm:leading-tight"
        >
          Build{" "}
          <span className="inline-block rounded-xl border-3 border-black bg-[#ff90e8] px-3 py-1 shadow-gumroad-sm transform -rotate-2">
            Smarter
          </span>
          . Ship{" "}
          <span className="inline-block rounded-xl border-3 border-black bg-[#00d4ff] px-3 py-1 shadow-gumroad-sm transform rotate-2">
            Faster
          </span>
          .
        </motion.h1>

        {/* Mission Card Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-10 max-w-3xl rounded-2xl border-3 border-black bg-white p-6 shadow-gumroad text-left sm:p-8"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-[#ffc700] px-2.5 py-0.5 text-xs font-heading font-black uppercase text-black shadow-gumroad-sm">
              <Target className="h-3.5 w-3.5 stroke-[3]" />
              The Mission
            </span>
          </div>
          <p className="font-heading text-lg font-black leading-relaxed text-black sm:text-xl">
            To democratize the best of AI and modern technology for creators. To build tools that actually help. To share knowledge that actually matters. And to prove that one person with the right tools can build something extraordinary.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/tools"
            className="btn-gumroad w-full sm:w-auto px-8 py-4 text-base font-black uppercase tracking-wider"
          >
            Explore AI Tools <ArrowRight className="ml-2 h-5 w-5 stroke-[3]" />
          </Link>
          <Link
            href="/products"
            className="btn-gumroad-cyan w-full sm:w-auto px-8 py-4 text-base font-black uppercase tracking-wider"
          >
            Browse Store Shelf
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
