import { NextResponse } from "next/server";
import { z } from "zod";
import { addSubscriberToConvertKit } from "@/lib/convertkit";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  source: z.string().default("website"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = subscribeSchema.parse(body);

    // 1. Store in Supabase (with graceful fallback)
    let supabaseSuccess = false;
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { error } = await supabase.from("subscribers").upsert(
          {
            email: data.email,
            name: data.name || null,
            source: data.source,
            status: "active",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        );

        if (error) {
          console.error("Supabase insert error:", error);
        } else {
          supabaseSuccess = true;
        }
      }
    } catch (err) {
      console.error("Supabase connection error:", err);
    }

    // 2. Add to ConvertKit
    const ckResult = await addSubscriberToConvertKit(data.email, data.name);

    // 3. Update Supabase with ConvertKit ID if available
    if (supabaseSuccess && ckResult.subscriberId) {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        
        if (supabaseUrl && supabaseKey) {
          const { createClient } = await import("@supabase/supabase-js");
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          await supabase
            .from("subscribers")
            .update({ convertkit_id: ckResult.subscriberId })
            .eq("email", data.email);
        }
      } catch {
        // Non-critical error
      }
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
