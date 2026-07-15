import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProductCard } from "@/components/shared/ProductCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { FadeIn } from "@/components/motion/FadeIn";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { getDbProducts } from "@/lib/db";

// Always fetch fresh products from Supabase — never serve a stale static build
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Premium digital products by Sunstroke — templates, guides, and resources for creators and indie builders.",
};

export default async function ProductsPage() {
  const products = await getDbProducts();

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Digital Products"
            title="Built for Creators"
            subtitle="Premium templates, guides, and resources designed to help you grow your business and master modern tools."
            accentColor="gold"
          />

          {products.length === 0 ? (
            <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-3 border-dashed border-black bg-white py-20 text-center">
              <span className="text-5xl">📦</span>
              <h3 className="mt-4 font-heading text-xl font-black text-black">
                Products coming soon
              </h3>
              <p className="mt-2 text-sm font-bold text-zinc-600">
                Subscribe below to be the first to know when new products drop.
              </p>
            </div>
          ) : (
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard {...product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          <FadeIn className="mt-16 text-center">
            <div className="gumroad-card mx-auto max-w-2xl bg-[#ff9f0a] p-8 text-black">
              <h3 className="font-heading text-2xl font-black text-black">
                Get Early Access to New Products
              </h3>
              <p className="mt-2 text-sm font-bold text-zinc-900">
                Newsletter subscribers get exclusive early access and special launch discounts on all new templates.
              </p>
              <div className="mx-auto mt-6 max-w-md">
                <NewsletterForm
                  source="products-page"
                  variant="inline"
                  buttonText="Notify Me"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
