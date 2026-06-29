import { NextResponse } from "next/server";
import { z } from "zod";

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
      console.error("Supabase contact insert error:", err);
    }

    // 2. Send email notification via Resend API
    const resendKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (resendKey && notificationEmail) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Sunstroke Alert <onboarding@resend.dev>",
            to: notificationEmail,
            subject: `📩 New Message: ${data.subject || "Contact Form Inquiry"}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 3px solid #000; border-radius: 12px; background-color: #f4f1ea; box-shadow: 6px 6px 0px #000;">
                <h2 style="margin-top: 0; font-family: 'Courier New', monospace; font-weight: 900; background: #ff90e8; padding: 10px; border: 2px solid #000; display: inline-block;">
                  New Sunstroke Inquiry
                </h2>
                <p style="font-size: 16px; margin-top: 15px;"><strong>From:</strong> ${data.name} (${data.email})</p>
                <p style="font-size: 16px;"><strong>Subject:</strong> ${data.subject || "N/A"}</p>
                <hr style="border: 1px solid #000; margin: 20px 0;" />
                <p style="font-size: 16px; line-height: 1.6; font-weight: bold; background: white; padding: 15px; border: 2px solid #000; border-radius: 8px;">
                  ${data.message.replace(/\n/g, "<br />")}
                </p>
              </div>
            `,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Resend API warning:", errorText);
        }
      } catch (emailErr) {
        console.error("Resend notification failed to send:", emailErr);
      }
    } else {
      console.warn("Resend keys not fully configured in env. Skipping notification email...");
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

    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
