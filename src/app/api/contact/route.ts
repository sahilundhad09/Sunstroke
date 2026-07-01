import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactNotification } from "@/lib/resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // 1. Store in Supabase
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase.from("contact_messages").insert({
          name: data.name,
          email: data.email,
          subject: data.subject || null,
          message: data.message,
          status: "unread",
        });
      }
    } catch (err) {
      console.error("[Contact] Supabase insert error:", err);
    }

    // 2. Send notification email to owner via Resend
    const emailResult = await sendContactNotification({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    if (!emailResult.success) {
      console.warn("[Contact] Notification email not sent:", emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("[Contact] Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
