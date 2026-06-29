import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const countTable = async (table: string) => {
      try {
        const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
        if (error) return 0;
        return count || 0;
      } catch {
        return 0;
      }
    };

    const [
      tools,
      products,
      affiliates,
      posts,
      subscribers,
      messages
    ] = await Promise.all([
      countTable("tools"),
      countTable("products"),
      countTable("affiliate_links"),
      countTable("posts"),
      countTable("subscribers"),
      countTable("contact_messages")
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        tools,
        products,
        affiliates,
        posts,
        subscribers,
        messages
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
