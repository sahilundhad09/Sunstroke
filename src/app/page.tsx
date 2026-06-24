import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { FreeValueSection } from "@/components/home/FreeValueSection";
import { FeaturedContent } from "@/components/home/FeaturedContent";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="section-divider" />
      <TrustSection />
      <div className="section-divider" />
      <PillarsSection />
      <div className="section-divider" />
      <FreeValueSection />
      <div className="section-divider" />
      <FeaturedContent />
      <div className="section-divider" />
      <ClosingCTA />
    </>
  );
}
