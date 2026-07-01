import { NextResponse } from "next/server";
import { z } from "zod";
import { sendWelcomeEmail } from "@/lib/resend";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  source: z.string().default("website"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = subscribeSchema.parse(body);

    // 1. Store in Supabase
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
          console.error("[Subscribe] Supabase upsert error:", error);
        }
      }
    } catch (err) {
      console.error("[Subscribe] Supabase connection error:", err);
    }

    // 2. Send welcome email via Resend
    const emailResult = await sendWelcomeEmail({
      email: data.email,
      name: data.name,
    });

    if (!emailResult.success) {
      console.warn("[Subscribe] Welcome email not sent:", emailResult.error);
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

    console.error("[Subscribe] Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
