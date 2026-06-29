"use client";

import { motion } from "framer-motion";
import { ExternalLink, Quote } from "lucide-react";
import Image from "next/image";

interface AffiliateCardProps {
  id?: string;
  name: string;
  category?: string;
  description?: string;
  recommendation?: string;
  logo?: string;
  logo_url?: string;
  image_url?: string;
  href?: string;
  url?: string;
  discount?: string;
  featured?: boolean;
  created_at?: string;
}

export function AffiliateCard({
  name,
  category = "Recommendation",
  description = "",
  recommendation = "",
  logo,
  logo_url,
  image_url,
  href,
  url,
  discount,
}: AffiliateCardProps) {
  const linkUrl = href || url || "#";
  const displayLogo = logo || logo_url || "🔗";
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border-4 border-black bg-white shadow-gumroad transition-all duration-200 hover:shadow-gumroad-lg"
      >
        <div>
          {/* Card Image Banner */}
          <div className="relative h-48 w-full border-b-4 border-black bg-[#ff90e8]">
            {image_url ? (
              <Image
                src={image_url}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#ff90e8] to-[#00d4ff] p-6 text-center">
                <span className="font-heading text-4xl font-black text-black opacity-30 select-none">
                  {name}
                </span>
              </div>
            )}
            
            {/* Category Tag */}
            <span className="absolute left-4 top-4 rounded-lg border-2 border-black bg-[#ffc700] px-3 py-1 text-[10px] font-mono font-black uppercase text-black shadow-gumroad-sm">
              {category}
            </span>

            {/* Discount Badge */}
            {discount && (
              <span className="absolute right-4 top-4 rounded-lg border-2 border-black bg-[#00e599] px-3 py-1 text-[10px] font-mono font-black text-black shadow-gumroad-sm">
                {discount}
              </span>
            )}

            {/* Floating Logo Circle */}
            <div className="absolute -bottom-6 left-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-3 border-black bg-white text-3xl shadow-gumroad-sm">
                {displayLogo}
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 pt-10">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-heading text-2xl font-black text-black group-hover:underline">
                {name}
              </h3>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#00d4ff] text-black shadow-gumroad-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ExternalLink className="h-4.5 w-4.5 stroke-[3]" />
              </div>
            </div>

            <p className="mt-3 text-sm font-bold leading-relaxed text-zinc-800">
              {description}
            </p>
          </div>
        </div>

        {/* Recommendation Quote Well */}
        <div className="p-6 pt-0">
          <div className="flex items-start gap-2.5 rounded-xl border-2 border-black bg-[#f4f1ea] p-4 shadow-gumroad-sm">
            <Quote className="mt-0.5 h-4.5 w-4.5 shrink-0 text-black stroke-[3]" />
            <p className="text-xs font-bold italic leading-relaxed text-zinc-900">
              {recommendation}
            </p>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
