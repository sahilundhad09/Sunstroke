"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  id?: string;
  title: string;
  description?: string;
  price: string | number;
  badge?: string;
  rating?: number;
  href?: string;
  purchase_url?: string;
  tags?: string[];
  image_url?: string;
}

export function ProductCard({
  title,
  description,
  price,
  badge,
  rating = 5.0,
  href,
  purchase_url,
  tags = [],
  image_url,
}: ProductCardProps) {
  const isFree = price === 0 || price === "0" || String(price).toLowerCase() === "free";
  const priceDisplay = isFree ? "FREE" : typeof price === "number" ? `$${price}` : price;
  const linkUrl = href || purchase_url || "#";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        href={linkUrl}
        className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border-4 border-black bg-white shadow-gumroad transition-all duration-200 hover:shadow-gumroad-lg"
      >
        <div>
          {/* Top banner / cover image area */}
          <div className="relative h-48 border-b-4 border-black bg-[#ff9f0a]">
            {image_url ? (
              <Image
                src={image_url}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#ff9f0a] to-[#ffc700] p-6 text-center">
                <span className="font-heading text-3xl font-black text-black opacity-30 select-none">
                  {title}
                </span>
              </div>
            )}

            {/* Badge overlay */}
            {badge && (
              <span className="absolute left-4 top-4 rounded-lg border-2 border-black bg-[#ffc700] px-3 py-1 text-[10px] font-mono font-black uppercase text-black shadow-gumroad-sm">
                {badge}
              </span>
            )}

            {/* Price tag */}
            <div className={`absolute right-4 top-4 rounded-lg border-2 border-black px-3 py-1.5 text-xs font-mono font-black uppercase shadow-gumroad-sm ${
              isFree ? "bg-[#00e599] text-black" : "bg-white text-black"
            }`}>
              {priceDisplay}
            </div>

            {/* Icon overlap */}
            <div className="absolute -bottom-6 left-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#ffc700] shadow-gumroad-sm">
                <ShoppingCart className="h-5 w-5 text-black stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 pt-10">
            {rating && (
              <div className="mb-3 flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#ffc700] text-black stroke-[2]" />
                <span className="font-mono text-xs font-black text-black">{rating.toFixed(1)}</span>
              </div>
            )}

            <h3 className="font-heading text-2xl font-black text-black group-hover:underline">
              {title}
            </h3>

            <p className="mt-3 text-sm font-bold leading-relaxed text-zinc-800 line-clamp-3">
              {description}
            </p>
          </div>
        </div>

        {/* Action Button footer */}
        <div className="p-6 pt-0">
          <span className="btn-gumroad-gold w-full py-3.5 text-xs font-black uppercase tracking-wider gap-2">
            Get Product <ArrowRight className="h-4 w-4 stroke-[3]" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
