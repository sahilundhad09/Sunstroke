/**
 * Resend email helper — all email templates live here.
 * Uses the Resend sandbox sender (onboarding@resend.dev) which works
 * for sending to your own verified Resend account email only.
 *
 * To send to ANY email address (like sunstrokeai@gmail.com), you must
 * verify a custom domain inside your Resend dashboard and change RESEND_FROM_EMAIL
 * in your environment to something like "hello@yourdomain.com".
 *
 * Until then, set RESEND_FROM_EMAIL=onboarding@resend.dev and
 * NOTIFICATION_EMAIL to the email you signed up to Resend with.
 */

const RESEND_API_URL = "https://api.resend.com/emails";

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    console.warn("[Resend] RESEND_API_KEY not configured. Skipping email.");
    return { success: false, error: "Resend not configured" };
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("[Resend] API error:", json);
      return { success: false, error: json?.message || "Resend API error" };
    }

    return { success: true };
  } catch (err) {
    console.error("[Resend] Fetch failed:", err);
    return { success: false, error: "Resend fetch failed" };
  }
}

// ─────────────────────────────────────────────
// EMAIL TEMPLATE: Contact form notification to owner
// ─────────────────────────────────────────────
export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  if (!notificationEmail) {
    console.warn("[Resend] NOTIFICATION_EMAIL not set. Skipping contact notification.");
    return { success: false };
  }

  const html = `
    <div style="font-family:'Helvetica Neue',sans-serif;background:#f4f1ea;padding:32px;max-width:600px;margin:0 auto;border:3px solid #000;border-radius:12px;box-shadow:6px 6px 0 #000;">
      <div style="background:#ff90e8;border:2px solid #000;border-radius:8px;padding:12px 20px;display:inline-block;margin-bottom:24px;">
        <h1 style="margin:0;font-size:20px;font-weight:900;font-family:'Courier New',monospace;color:#000;">
          📩 New Sunstroke Message
        </h1>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr>
          <td style="padding:8px 12px;background:#fff;border:2px solid #000;border-radius:6px 6px 0 0;font-weight:700;width:100px;">From</td>
          <td style="padding:8px 12px;background:#fff;border:2px solid #000;border-top:none;border-radius:0 0 6px 6px;">${name} &lt;${email}&gt;</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;background:#fff;border:2px solid #000;border-top:none;font-weight:700;">Subject</td>
          <td style="padding:8px 12px;background:#fff;border:2px solid #000;border-top:none;">${subject || "No subject"}</td>
        </tr>
      </table>

      <div style="background:#fff;border:2px solid #000;border-radius:8px;padding:20px;line-height:1.7;font-size:15px;white-space:pre-wrap;">
        ${message.replace(/\n/g, "<br/>")}
      </div>

      <p style="margin-top:20px;font-size:12px;color:#666;text-align:center;">
        This notification was sent automatically by <strong>Sunstroke</strong>
      </p>
    </div>
  `;

  return sendEmail({
    to: notificationEmail,
    subject: `📩 New Contact: ${subject || "Inquiry from " + name}`,
    html,
  });
}

// ─────────────────────────────────────────────
// EMAIL TEMPLATE: Welcome email to new subscriber
// ─────────────────────────────────────────────
export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string;
  name?: string;
}) {
  const greeting = name ? `Hey ${name}` : "Hey there";

  const html = `
    <div style="font-family:'Helvetica Neue',sans-serif;background:#f4f1ea;padding:32px;max-width:600px;margin:0 auto;border:3px solid #000;border-radius:12px;box-shadow:6px 6px 0 #000;">

      <div style="text-align:center;margin-bottom:28px;">
        <div style="background:#ffe566;border:3px solid #000;border-radius:12px;padding:16px 24px;display:inline-block;">
          <h1 style="margin:0;font-size:28px;font-weight:900;font-family:'Courier New',monospace;color:#000;">
            ⚡ SUNSTROKE
          </h1>
          <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#333;letter-spacing:1px;">
            AI · TOOLS · PRODUCTS
          </p>
        </div>
      </div>

      <h2 style="font-size:22px;font-weight:900;color:#000;margin-bottom:8px;">
        ${greeting}, welcome aboard! 🎉
      </h2>
      <p style="font-size:15px;line-height:1.7;color:#333;margin-bottom:20px;">
        You just joined a growing community of builders, creators, and AI enthusiasts.
        I'm <strong>Sahil</strong> — I build AI-powered tools and share everything I learn along the way.
      </p>

      <div style="background:#fff;border:2px solid #000;border-radius:10px;padding:20px;margin-bottom:20px;">
        <h3 style="margin:0 0 12px;font-size:16px;font-weight:900;color:#000;">
          🎁 Here's what you can expect:
        </h3>
        <ul style="margin:0;padding-left:20px;line-height:1.9;font-size:14px;color:#333;">
          <li>Real-world breakdowns of AI tools I build &amp; use</li>
          <li>Early access to products before they launch</li>
          <li>Honest insights on building solo in the AI era</li>
          <li>No fluff — only things actually worth your time</li>
        </ul>
      </div>

      <div style="background:#b8f5b0;border:2px solid #000;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;font-size:14px;font-weight:700;color:#000;">
          💡 Want to reply? Just hit reply on this email — I personally read every message.
        </p>
      </div>

      <div style="text-align:center;margin-bottom:20px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app"}"
           style="display:inline-block;background:#000;color:#ffe566;font-weight:900;font-family:'Courier New',monospace;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:15px;border:2px solid #000;box-shadow:4px 4px 0 #ffe566;">
          → Explore Sunstroke
        </a>
      </div>

      <p style="font-size:12px;color:#888;text-align:center;margin:0;">
        You're receiving this because you subscribed at sunstroke-gules.vercel.app<br/>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app"}" style="color:#888;">Unsubscribe</a>
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: `⚡ Welcome to Sunstroke, ${name || "friend"}!`,
    html,
  });
}
