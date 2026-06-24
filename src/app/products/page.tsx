import type { Metadata } from "next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProductCard } from "@/components/shared/ProductCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { FadeIn } from "@/components/motion/FadeIn";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { featuredProducts } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Premium digital products by Sunstroke — templates, guides, and resources for creators and indie builders.",
};

export default function ProductsPage() {
  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Digital Products"
            title="Built for Creators"
            subtitle="Premium templates, guides, and resources designed to help you grow your business and master modern tools."
          />

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard {...product} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-16 text-center">
            <div className="glass-card mx-auto max-w-2xl p-8">
              <h3 className="text-xl font-bold text-white">
                Get Early Access to New Products
              </h3>
              <p className="mt-2 text-sm text-sunstroke-text-muted">
                Newsletter subscribers get exclusive early access and discounts on
                all new products.
              </p>
              <div className="mx-auto mt-4 max-w-sm">
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
