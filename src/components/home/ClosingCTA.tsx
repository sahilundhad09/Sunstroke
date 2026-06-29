"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { Sparkles } from "lucide-react";

export function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32 bg-[#f4f1ea]">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-5 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-lg border-2 border-black bg-[#ff90e8] px-4 py-1.5 font-heading text-xs font-black uppercase tracking-widest text-black shadow-gumroad-sm">
            <Sparkles className="h-4 w-4 stroke-[2.5]" /> Free to join
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-3xl font-black text-black sm:text-4xl lg:text-5xl"
        >
          Ready to{" "}
          <span className="inline-block rounded-xl border-3 border-black bg-[#00d4ff] px-3 py-1 shadow-gumroad-sm transform -rotate-1">
            Build Smarter?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base font-bold text-zinc-800 sm:text-lg"
        >
          Join <strong className="font-black text-black">1,000+</strong> creators getting weekly insights on AI tools, digital products, and strategies to grow as an indie builder.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 max-w-md"
        >
          <NewsletterForm source="closing-cta" variant="inline" placeholder="your@email.com" buttonText="Let's Go →" />
        </motion.div>
      </div>
    </section>
  );
}
