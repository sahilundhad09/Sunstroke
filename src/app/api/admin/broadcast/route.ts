import { NextResponse } from "next/server";
import { z } from "zod";
import { sendBroadcast } from "@/lib/mailer";

const broadcastSchema = z.object({
  subject: z.string().min(3, "Subject is required"),
  html: z.string().min(10, "Email body is required"),
  text: z.string().optional(), // plain text fallback
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = broadcastSchema.parse(body);

    // Fetch all active subscribers
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 500 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: subscribers, error } = await supabase
      .from("subscribers")
      .select("email")
      .eq("status", "active");

    if (error) {
      console.error("[Broadcast] Failed to fetch subscribers:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch subscribers" },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { success: false, error: "No active subscribers found" },
        { status: 400 }
      );
    }

    const emails = subscribers.map((s: any) => s.email);
    const result = await sendBroadcast({
      recipients: emails,
      subject: data.subject,
      html: data.html,
      // Strip HTML tags to generate plain text fallback if not provided
      text: data.text || data.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    });

    return NextResponse.json({
      success: true,
      message: `Broadcast sent to ${result.sent} of ${emails.length} subscribers.`,
      sent: result.sent,
      failed: result.failed,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("[Broadcast] Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
