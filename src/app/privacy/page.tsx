import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Sunstroke privacy policy — how we handle your data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly, such as your email address when subscribing to our newsletter or submitting a contact form. We may also collect usage data through analytics tools to improve our services.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your email address is used to send you our newsletter, product updates, and relevant communications. Contact form submissions are used to respond to your inquiries. We never sell your personal data to third parties.",
  },
  {
    title: "3. Third-Party Services",
    body: "We use ConvertKit (Kit) for email marketing and Supabase for data storage. These services have their own privacy policies. Some pages may contain affiliate links to third-party products and services.",
  },
  {
    title: "4. Cookies",
    body: "We use essential cookies to ensure the website functions properly. Analytics cookies may be used to understand how visitors interact with our site. You can disable cookies in your browser settings.",
  },
  {
    title: "5. Your Rights",
    body: "You can unsubscribe from our newsletter at any time using the link in any email. You may request deletion of your data by contacting us at hello@sunstroke.dev.",
  },
  {
    title: "6. Contact",
    body: "For privacy-related questions, contact us at hello@sunstroke.dev.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-24 bg-[#f4f1ea]">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="mb-4 inline-block rounded-lg border-2 border-black bg-[#ff90e8] px-4 py-1.5 font-heading text-xs font-black tracking-widest text-black uppercase shadow-gumroad-sm">
            Legal
          </span>
          <h1 className="font-heading text-3xl font-black text-black sm:text-4xl">Privacy Policy</h1>
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
