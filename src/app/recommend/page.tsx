import type { Metadata } from "next";
import { getDbAffiliates } from "@/lib/db";
import { RecommendPageClient } from "@/components/recommend/RecommendPageClient";

export const metadata: Metadata = {
  title: "Recommend",
  description:
    "Curated tools and software personally used and recommended by Sunstroke for creators and indie builders.",
};

export default async function RecommendPage() {
  const affiliates = await getDbAffiliates();

  return <RecommendPageClient initialAffiliates={affiliates} />;
}
