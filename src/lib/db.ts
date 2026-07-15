import { createClient } from "@supabase/supabase-js";
import type { Tool, Product, AffiliateLink, Post } from "@/types";

// Helper function to lazily initialize the Supabase client safely
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn("Supabase environment variables are missing. Database queries will return empty arrays.");
    return null;
  }

  try {
    return createClient(url, anonKey);
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

/**
 * Fetches all tools from Supabase.
 */
export async function getDbTools(): Promise<Tool[]> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data) {
      if (error) {
        console.warn("Supabase tools database query error:", error.message);
      }
      return [];
    }

    return data.map((t: any) => ({
      id: t.id,
      name: t.name,
      tagline: t.tagline || "",
      description: t.description || "",
      status: (t.status || "live") as "live" | "beta" | "coming-soon",
      tags: t.tags || [],
      href: t.href || "#",
      icon: t.icon || "⚡",
      image_url: t.image_url || undefined,
    }));
  } catch (err) {
    console.warn("Supabase connection failed for tools:", err);
    return [];
  }
}

/**
 * Fetches all active products from Supabase.
 */
export async function getDbProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("featured", { ascending: false })  // featured products first
      .order("created_at", { ascending: false }); // then newest first

    if (error || !data) {
      if (error) {
        console.warn("Supabase products database query error:", error.message);
      }
      return [];
    }

    return data.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description || "",
      price: !p.price || Number(p.price) === 0 ? 0 : Number(p.price),
      currency: p.currency || "USD",
      purchase_url: p.purchase_url || "#",
      badge: p.badge || undefined,
      tags: p.tags || [],
      rating: p.rating ? Number(p.rating) : undefined,
      image_url: p.image_url || undefined,
      featured: p.featured || false,
      status: p.status || "active",
      created_at: p.created_at || "",
    }));
  } catch (err) {
    console.warn("Supabase connection failed for products:", err);
    return [];
  }
}

/**
 * Fetches all affiliate links from Supabase.
 */
export async function getDbAffiliates(): Promise<AffiliateLink[]> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("affiliate_links")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data) {
      if (error) {
        console.warn("Supabase affiliates database query error:", error.message);
      }
      return [];
    }

    return data.map((a: any) => ({
      id: a.id,
      name: a.name,
      description: a.description || "",
      url: a.url || "#",
      category: a.category || "Recommendations",
      logo_url: a.logo_url || "🔗",
      image_url: a.image_url || undefined,
      recommendation: a.recommendation || "",
      discount: a.discount || undefined,
      featured: a.featured || false,
      created_at: a.created_at || "",
    }));
  } catch (err) {
    console.warn("Supabase connection failed for affiliates:", err);
    return [];
  }
}

/**
 * Fetches published content/posts from Supabase.
 */
export async function getDbPosts(): Promise<any[]> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data) {
      if (error) {
        console.warn("Supabase posts database query error:", error.message);
      }
      return [];
    }

    return data.map((p: any) => {
      const words = p.content ? p.content.split(/\s+/).length : 150;
      const readTime = `${Math.max(2, Math.ceil(words / 200))} min`;
      const date = p.published_at
        ? new Date(p.published_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Recent";

      return {
        id: p.id,
        title: p.title,
        excerpt: p.excerpt || "",
        href: p.slug ? `/newsletter/${p.slug}` : "#",
        category: p.category || "Article",
        date,
        readTime,
        image: p.image_url || undefined,
        slug: p.slug,
        content: p.content,
      };
    });
  } catch (err) {
    console.warn("Supabase connection failed for posts:", err);
    return [];
  }
}

/**
 * Fetches a single post by slug from Supabase.
 */
export async function getDbPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return null;
    }
    return data;
  } catch (err) {
    return null;
  }
}
