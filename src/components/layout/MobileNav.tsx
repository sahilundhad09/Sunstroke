"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/constants";
import { CTAButton } from "@/components/shared/CTAButton";

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
      className="fixed inset-0 z-[60] bg-sunstroke-dark/95 backdrop-blur-xl"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-sunstroke-text-muted hover:text-white hover:bg-sunstroke-surface/50 transition-colors"
        aria-label="Close menu"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Links */}
      <div className="flex h-full flex-col items-center justify-center gap-2">
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
              className="block rounded-lg px-6 py-3 text-xl font-semibold text-sunstroke-text transition-colors hover:text-sunstroke-cyan"
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
          <CTAButton href="/newsletter" size="lg" onClick={onClose}>
            Join Newsletter
          </CTAButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
