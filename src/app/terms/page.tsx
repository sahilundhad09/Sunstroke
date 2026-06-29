import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Sunstroke terms of service — usage terms for our website and products.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing and using the Sunstroke website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.",
  },
  {
    title: "2. Use of Services",
    body: "Our tools, products, and content are provided for personal and professional use. You agree not to misuse our services, attempt to reverse-engineer our tools, or use them for illegal purposes.",
  },
  {
    title: "3. Digital Products",
    body: "Digital products purchased through Sunstroke are for personal use unless otherwise stated. Refund policies are specified per product at the time of purchase.",
  },
  {
    title: "4. Affiliate Links",
    body: "Some links on our website are affiliate links. We earn a small commission when you purchase through these links at no additional cost to you. We only recommend products we personally use and trust.",
  },
  {
    title: "5. Intellectual Property",
    body: "All content, tools, and branding on Sunstroke are the intellectual property of Sunstroke unless otherwise noted. You may not reproduce or distribute our content without permission.",
  },
  {
    title: "6. Limitation of Liability",
    body: 'Sunstroke is provided "as is" without warranties. We are not liable for any damages arising from use of our tools, products, or recommendations.',
  },
  {
    title: "7. Contact",
    body: "For questions about these terms, contact us at hello@sunstroke.dev.",
  },
];

export default function TermsPage() {
  return (
    <div className="pt-24 bg-[#f4f1ea]">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="mb-4 inline-block rounded-lg border-2 border-black bg-[#00d4ff] px-4 py-1.5 font-heading text-xs font-black tracking-widest text-black uppercase shadow-gumroad-sm">
            Legal
          </span>
          <h1 className="font-heading text-3xl font-black text-black sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm font-bold text-zinc-600">Last updated: January 2025</p>

          <div className="mt-10 space-y-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border-2 border-black bg-white p-5 shadow-gumroad-sm"
              >
                <h2 className="mb-2 font-heading text-base font-black text-black">{section.title}</h2>
                <p className="text-sm font-bold leading-relaxed text-zinc-800">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
