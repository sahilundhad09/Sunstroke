import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { PillarsSection } from "@/components/home/PillarsSection";
import { FreeValueSection } from "@/components/home/FreeValueSection";
import { FeaturedContent } from "@/components/home/FeaturedContent";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { getDbPosts } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

export default async function HomePage() {
  const posts = await getDbPosts();

  let toolsCount = 0;
  let productsCount = 0;
  let subscribersCount = 0;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const [toolsRes, productsRes, subscribersRes] = await Promise.all([
      supabase.from("tools").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("subscribers").select("*", { count: "exact", head: true }),
    ]);

    toolsCount = toolsRes.count || 0;
    productsCount = productsRes.count || 0;
    subscribersCount = subscribersRes.count || 0;
  } catch (err) {
    console.warn("Failed to fetch homepage live counts:", err);
  }

  return (
    <>
      <HeroSection />
      <div className="section-divider" />
      <TrustSection 
        toolsCount={toolsCount} 
        productsCount={productsCount} 
        subscribersCount={subscribersCount} 
      />
      <div className="section-divider" />
      <PillarsSection />
      <div className="section-divider" />
      <FreeValueSection />
      <div className="section-divider" />
      <FeaturedContent posts={posts} />
      <div className="section-divider" />
      <ClosingCTA />
    </>
  );
}
