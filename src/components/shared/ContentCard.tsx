"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

interface ContentCardProps {
  id?: string;
  title: string;
  excerpt: string;
  category: string;
  readTime?: string;
  date?: string;
  href: string;
  image?: string;
}

export function ContentCard({
  title,
  excerpt,
  category,
  readTime,
  date,
  href,
  image,
}: ContentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border-3 border-black bg-white shadow-gumroad transition-all duration-200 hover:shadow-gumroad-lg"
      >
        <div>
          {/* Image / Banner Header (Emerald Green theme) */}
          <div className="relative h-40 border-b-3 border-black bg-[#00e599] overflow-hidden">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <BookOpen className="h-12 w-12 text-black stroke-[2]" />
              </div>
            )}
            <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-gumroad-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4 stroke-[3]" />
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="rounded-md border-2 border-black bg-[#ff90e8] px-2 py-0.5 text-[10px] font-mono font-black uppercase text-black shadow-gumroad-sm">
                {category}
              </span>
              {readTime && (
                <span className="flex items-center gap-1 font-mono text-[10px] font-black text-zinc-700">
                  <Clock className="h-3 w-3 stroke-[2.5]" />
                  {readTime}
                </span>
              )}
            </div>

            <h3 className="font-heading text-xl font-black text-black group-hover:underline leading-snug">
              {title}
            </h3>

            <p className="mt-2 text-xs font-bold leading-relaxed text-zinc-700 line-clamp-2">
              {excerpt}
            </p>
          </div>
        </div>

        {date && (
          <div className="p-5 pt-0 border-t-2 border-black mt-2">
            <span className="pt-2 block font-mono text-[10px] font-black text-zinc-600">
              Published: {date}
            </span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
