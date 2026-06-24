import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke.dev";

  const staticPages = [
    "", "/about", "/tools", "/products", "/recommend",
    "/newsletter", "/contact", "/privacy", "/terms",
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/newsletter" ? 0.9 : 0.7,
  }));
}
