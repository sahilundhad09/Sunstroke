"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { navLinks } from "@/lib/constants";
import { MobileNav } from "./MobileNav";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-50 border-b-3 border-black bg-white shadow-gumroad-sm"
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[3px] bg-[#00d4ff] origin-left border-t border-black"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />

        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Sunstroke Logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg border-2 border-black object-cover shadow-gumroad-sm transition-transform group-hover:rotate-3"
                priority
              />
              <span className="font-heading font-black tracking-[0.15em] text-black text-lg uppercase">
                SUNSTROKE
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3.5 py-1.5 text-sm font-extrabold transition-all ${
                    isActive
                      ? "bg-[#ff90e8] border-2 border-black text-black shadow-gumroad-sm"
                      : "text-black hover:bg-[#ffc700] hover:border-2 hover:border-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/newsletter"
              className="btn-gumroad hidden lg:inline-flex px-4 py-2 text-xs uppercase tracking-wider"
            >
              Join Newsletter
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#00d4ff] text-black shadow-gumroad-sm lg:hidden active:translate-x-[2px] active:translate-y-[2px]"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
