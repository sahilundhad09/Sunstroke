import Link from "next/link";
import Image from "next/image";
import { siteConfig, footerLinks } from "@/lib/constants";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.058 1.28-.072 1.688-.072 4.949 0 3.261.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.261 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.261-.014-3.669-.072-4.949C23.73 2.692 21.311.273 16.95.072 15.67.014 15.262 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a3.838 3.838 0 110-7.676A3.838 3.838 0 0112 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
    </svg>
  );
}

const socialLinks = [
  { icon: LinkedInIcon, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: InstagramIcon, href: (siteConfig.links as any).instagram, label: "Instagram" },
  { icon: PinterestIcon, href: (siteConfig.links as any).pinterest, label: "Pinterest" },
];

export function Footer() {
  return (
    <footer className="relative border-t-3 border-black bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/logo.png" alt="Sunstroke Logo" width={32} height={32} className="h-8 w-8 rounded-lg border-2 border-black object-cover shadow-gumroad-sm" />
              <span className="font-heading font-black tracking-widest text-black text-lg uppercase">SUNSTROKE</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm font-bold leading-relaxed text-zinc-700">
              Building AI tools, digital products, and sharing the best software for creators and indie builders.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#ffc700] text-black shadow-gumroad-sm transition-transform active:translate-x-[2px] active:translate-y-[2px]">
                  <social.icon className="h-4 w-4 stroke-[2]" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h4 className="font-heading font-black tracking-wider text-black uppercase text-xs">Product</h4>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.product.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm font-bold text-zinc-800 transition-colors hover:text-black hover:underline">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-black tracking-wider text-black uppercase text-xs">Company</h4>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm font-bold text-zinc-800 transition-colors hover:text-black hover:underline">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-black tracking-wider text-black uppercase text-xs">Legal</h4>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-sm font-bold text-zinc-800 transition-colors hover:text-black hover:underline">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-black tracking-wider text-black uppercase text-xs">Stay Updated</h4>
            <p className="mt-3 text-sm font-bold text-zinc-700">Get weekly insights on AI tools, creator strategies, and new products.</p>
            <div className="mt-4">
              <NewsletterForm source="footer" variant="stacked" showPrivacy={false} buttonText="Join" />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-black pt-6">
          <p className="text-center text-xs font-bold text-zinc-600">© {new Date().getFullYear()} Sunstroke. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
