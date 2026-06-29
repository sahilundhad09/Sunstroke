"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/constants";

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-[#f4f1ea]"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-white text-black shadow-gumroad-sm transition-transform hover:scale-95"
        aria-label="Close menu"
      >
        <X className="h-5 w-5 stroke-[2.5]" />
      </button>

      {/* Links */}
      <div className="flex h-full flex-col items-center justify-center gap-3">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.3 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="block rounded-xl border-2 border-black bg-white px-8 py-3 font-heading text-xl font-black text-black shadow-gumroad-sm transition-transform hover:scale-[0.97] hover:bg-[#ffc700]"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-4"
        >
          <Link
            href="/newsletter"
            onClick={onClose}
            className="btn-gumroad px-8 py-4 text-sm font-black uppercase tracking-wider"
          >
            Join Newsletter
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
