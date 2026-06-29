"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Wrench } from "lucide-react";
import Image from "next/image";

interface ToolCardProps {
  id?: string;
  name: string;
  description?: string;
  status?: string;
  tags?: string[];
  href: string;
  image_url?: string;
  featured?: boolean;
}

export function ToolCard({
  name,
  description,
  status = "Live",
  tags = [],
  href,
  image_url,
  featured = false,
}: ToolCardProps) {
  const isComingSoon = status.toLowerCase().includes("soon");

  // Status color mappings
  const getStatusStyle = (st: string) => {
    const s = st.toLowerCase();
    if (s.includes("live") || s.includes("active")) return "bg-[#00e599] text-black";
    if (s.includes("beta") || s.includes("dev")) return "bg-[#ffc700] text-black";
    return "bg-zinc-200 text-black";
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        href={isComingSoon ? "#" : href}
        className={`group flex h-full flex-col justify-between overflow-hidden rounded-3xl border-4 border-black bg-white shadow-gumroad transition-all duration-200 hover:shadow-gumroad-lg ${
          isComingSoon ? "cursor-not-allowed opacity-75" : ""
        }`}
        onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
      >
        <div>
          {/* Card Cover Image */}
          <div className="relative h-48 w-full border-b-4 border-black bg-[#00d4ff]">
            {image_url ? (
              <Image
                src={image_url}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00d4ff] to-[#ff90e8] p-6 text-center">
                <span className="font-heading text-3xl font-black text-black opacity-30 select-none">
                  {name}
                </span>
              </div>
            )}

            {/* Status Badge */}
            <span className={`absolute left-4 top-4 rounded-lg border-2 border-black px-3 py-1 text-[10px] font-mono font-black uppercase shadow-gumroad-sm ${getStatusStyle(status)}`}>
              {status}
            </span>

            {/* Floating Icon overlapping */}
            <div className="absolute -bottom-6 left-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black bg-[#ff90e8] shadow-gumroad-sm">
                <Wrench className="h-5 w-5 text-black stroke-[2.5]" />
              </div>
            </div>

            {/* Link Arrow */}
            {!isComingSoon && (
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-gumroad-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-5 w-5 stroke-[3]" />
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="p-6 pt-10">
            <h3 className="font-heading text-2xl font-black text-black group-hover:underline">
              {name}
            </h3>

            <p className="mt-3 text-sm font-bold leading-relaxed text-zinc-800">
              {description}
            </p>
          </div>
        </div>

        {/* Tags footer */}
        {tags.length > 0 && (
          <div className="p-6 pt-0">
            <div className="flex flex-wrap gap-1.5 border-t-2 border-black pt-4">
              {tags.map((tag) => (
                <span key={tag} className="rounded-md border-2 border-black bg-[#f4f1ea] px-2.5 py-0.5 text-[10px] font-mono font-black uppercase text-black">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
