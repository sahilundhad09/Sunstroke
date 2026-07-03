import { NextResponse } from "next/server";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  source: z.string().default("website"),
});

// Add subscriber to ConvertKit form — triggers welcome sequence automatically
async function addToConvertKit(email: string, name?: string) {
  const apiSecret = process.env.CONVERTKIT_API_SECRET;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiSecret || !formId) {
    console.warn("[ConvertKit] Credentials not configured. Skipping.");
    return { success: false };
  }

  try {
    const res = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiSecret,
      },
      body: JSON.stringify({
        email_address: email,
        ...(name && { first_name: name }),
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("[ConvertKit] API error:", json);
      return { success: false, error: json?.message };
    }

    console.log("[ConvertKit] Subscriber added successfully:", email);
    return { success: true, subscriberId: json?.subscriber?.id?.toString() };
  } catch (err) {
    console.error("[ConvertKit] Fetch failed:", err);
    return { success: false };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = subscribeSchema.parse(body);

    // 1. Store in Supabase
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
          console.error("[Subscribe] Supabase upsert error:", error);
        } else {
          supabaseSuccess = true;
        }
      }
    } catch (err) {
      console.error("[Subscribe] Supabase connection error:", err);
    }

    // 2. Add to ConvertKit — this automatically triggers the welcome sequence
    const ckResult = await addToConvertKit(data.email, data.name);

    // 3. Store ConvertKit subscriber ID in Supabase if available
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
        // Non-critical — don't fail the request
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

    console.error("[Subscribe] Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
