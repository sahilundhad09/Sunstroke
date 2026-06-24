import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Sunstroke privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-sunstroke-text-dim">Last updated: January 2025</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-sunstroke-text-muted">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">1. Information We Collect</h2>
              <p>We collect information you provide directly, such as your email address when subscribing to our newsletter or submitting a contact form. We may also collect usage data through analytics tools to improve our services.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">2. How We Use Your Information</h2>
              <p>Your email address is used to send you our newsletter, product updates, and relevant communications. Contact form submissions are used to respond to your inquiries. We never sell your personal data to third parties.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">3. Third-Party Services</h2>
              <p>We use ConvertKit (Kit) for email marketing and Supabase for data storage. These services have their own privacy policies. Some pages may contain affiliate links to third-party products and services.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">4. Cookies</h2>
              <p>We use essential cookies to ensure the website functions properly. Analytics cookies may be used to understand how visitors interact with our site. You can disable cookies in your browser settings.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">5. Your Rights</h2>
              <p>You can unsubscribe from our newsletter at any time using the link in any email. You may request deletion of your data by contacting us at hello@sunstroke.dev.</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">6. Contact</h2>
              <p>For privacy-related questions, contact us at hello@sunstroke.dev.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
