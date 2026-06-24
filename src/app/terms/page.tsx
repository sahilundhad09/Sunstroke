import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Sunstroke terms of service — usage terms for our website and products.",
};

export default function TermsPage() {
  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-sunstroke-text-dim">Last updated: January 2025</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-sunstroke-text-muted">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">1. Acceptance of Terms</h2>
              <p>By accessing and using the Sunstroke website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">2. Use of Services</h2>
              <p>Our tools, products, and content are provided for personal and professional use. You agree not to misuse our services, attempt to reverse-engineer our tools, or use them for illegal purposes.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">3. Digital Products</h2>
              <p>Digital products purchased through Sunstroke are for personal use unless otherwise stated. Refund policies are specified per product at the time of purchase.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">4. Affiliate Links</h2>
              <p>Some links on our website are affiliate links. We earn a small commission when you purchase through these links at no additional cost to you. We only recommend products we personally use and trust.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">5. Intellectual Property</h2>
              <p>All content, tools, and branding on Sunstroke are the intellectual property of Sunstroke unless otherwise noted. You may not reproduce or distribute our content without permission.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">6. Limitation of Liability</h2>
              <p>Sunstroke is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from use of our tools, products, or recommendations.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">7. Contact</h2>
              <p>For questions about these terms, contact us at hello@sunstroke.dev.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
