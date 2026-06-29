"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AffiliateCard } from "@/components/shared/AffiliateCard";
import { Info, Sparkles, BookOpen } from "lucide-react";
import type { AffiliateLink } from "@/types";

interface RecommendPageClientProps {
  initialAffiliates: AffiliateLink[];
}

export function RecommendPageClient({ initialAffiliates }: RecommendPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract all categories dynamically
  const categories = ["All", ...Array.from(new Set(initialAffiliates.map((item) => item.category || "Recommendations")))];

  // Filter list
  const filteredAffiliates = selectedCategory === "All"
    ? initialAffiliates
    : initialAffiliates.filter((item) => (item.category || "Recommendations") === selectedCategory);

  // Divide into Featured vs Regular list for editorial zine layout
  const featuredItem = filteredAffiliates.find((item) => item.featured) || filteredAffiliates[0];
  const regularItems = filteredAffiliates.filter((item) => item.id !== featuredItem?.id);

  return (
    <div className="min-h-screen bg-[#f4f1ea] pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <SectionHeader
          badge="Handpicked Recommendations"
          title="Tools I Actually Use"
          subtitle="Every recommendation is battle-tested in real developer and creator workflows. No useless listings, only items that actually save hours."
          accentColor="pink"
        />

        {/* Disclosure banner in Gumroad Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <div className="flex items-start gap-3 rounded-2xl border-3 border-black bg-[#ff90e8] p-5 text-sm font-bold text-black shadow-gumroad">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-black stroke-[3]" />
            <p className="leading-relaxed">
              <span className="font-black uppercase tracking-wider bg-white border-2 border-black px-1.5 py-0.5 rounded shadow-gumroad-sm mr-1.5">
                Transparency Check:
              </span>
              Some links on this page are affiliate links, which means I may earn a small commission if you purchase. At no extra cost to you. I only recommend what I use daily.
            </p>
          </div>
        </motion.div>

        {/* Category Pills Selector */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl border-3 border-black px-5 py-2.5 font-heading text-xs font-black uppercase tracking-wider transition-all shadow-gumroad-sm hover:scale-[1.03] active:translate-y-[2px] ${
                selectedCategory === category
                  ? "bg-[#ffc700] text-black"
                  : "bg-white text-black hover:bg-zinc-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Magazine Editorial Layout */}
        <div className="space-y-12">
          {/* Big Featured Magazine Banner */}
          {featuredItem && selectedCategory === "All" && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border-4 border-black bg-white shadow-gumroad overflow-hidden grid lg:grid-cols-12 gap-0"
            >
              {/* Left visual half */}
              <div className="lg:col-span-7 relative min-h-[300px] border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-[#ff90e8]">
                {featuredItem.image_url ? (
                  <img
                    src={featuredItem.image_url}
                    alt={featuredItem.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#ffc700] to-[#ff90e8] p-10">
                    <span className="font-heading text-6xl font-black text-black opacity-30 select-none transform -rotate-2">
                      {featuredItem.name}
                    </span>
                  </div>
                )}
                <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-lg border-2 border-black bg-[#00e599] px-4 py-1.5 text-xs font-heading font-black uppercase text-black shadow-gumroad-sm">
                  <Sparkles className="h-4.5 w-4.5 stroke-[2.5]" />
                  Featured recommendation
                </span>
              </div>

              {/* Right text half */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-md border-2 border-black bg-[#ffc700] px-2 py-0.5 text-[10px] font-mono font-black uppercase text-black shadow-gumroad-sm mb-4">
                    {featuredItem.category}
                  </span>
                  <h3 className="font-heading text-3xl font-black text-black leading-tight">
                    {featuredItem.name}
                  </h3>
                  <p className="mt-4 text-base font-bold leading-relaxed text-zinc-800">
                    {featuredItem.description}
                  </p>
                </div>

                <div className="mt-8 space-y-6">
                  {/* Recommendation quote box */}
                  <div className="flex items-start gap-2.5 rounded-xl border-2 border-black bg-[#f4f1ea] p-4 shadow-gumroad-sm">
                    <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-black stroke-[2.5]" />
                    <p className="text-xs font-bold italic leading-relaxed text-zinc-900">
                      {featuredItem.recommendation}
                    </p>
                  </div>

                  <a
                    href={featuredItem.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="btn-gumroad w-full py-4 text-xs font-black uppercase tracking-wider"
                  >
                    Explore {featuredItem.name} Website →
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid list of remaining items */}
          <motion.div layout className="grid gap-8 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {(selectedCategory === "All" ? regularItems : filteredAffiliates).map((tool) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <AffiliateCard {...tool} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
