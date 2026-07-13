import nodemailer from "nodemailer";

// ─── Gmail SMTP Transporter ───────────────────────────────────────────────────
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass || pass === "your_16_digit_app_password_here") {
    console.warn("[Mailer] Gmail credentials not configured.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

// ─── Shared Send Helper ────────────────────────────────────────────────────────
// Always sends multipart (text + html) — critical for inbox delivery.
// HTML-only emails are treated as spam by Gmail filters.
export async function sendMail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text: string; // plain text version — required for deliverability
}): Promise<{ success: boolean; error?: string }> {
  const transporter = createTransporter();
  if (!transporter) return { success: false, error: "Mailer not configured" };

  const user = process.env.GMAIL_USER!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app";

  try {
    await transporter.sendMail({
      from: `"Sahil (Sunstroke)" <${user}>`,
      to,
      subject,
      // Multipart: Gmail spam filters treat HTML-only as suspicious
      text,
      html,
      headers: {
        // Proper RFC 2369 List-Unsubscribe header — required for bulk senders
        "List-Unsubscribe": `<mailto:${user}?subject=unsubscribe>, <${siteUrl}/unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "Precedence": "bulk",
      },
    });
    return { success: true };
  } catch (err: any) {
    console.error("[Mailer] Send failed:", err.message);
    return { success: false, error: err.message };
  }
}

// ─── Welcome Email ────────────────────────────────────────────────────────────
// Keep it personal and conversational first.
// OTO is mentioned naturally in a P.S. — not as a styled sales block.
export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string;
  name?: string;
}) {
  const firstName = name?.split(" ")[0] || "";
  const greeting = firstName ? `Hey ${firstName}` : "Hey";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app";
  const OTO_LINK = process.env.OTO_CHECKOUT_LINK || siteUrl;

  // ── Plain text version (the most important deliverability fix) ──────────────
  const text = `
${greeting},

You're in. Welcome to Sunstroke.

I'm Sahil — I build AI-powered tools, ship digital products, and share
everything I learn along the way. No filters, no fluff.

Here's what to expect from me:

- Real breakdowns of the tools I build and how I build them
- Early access to products before anyone else
- Honest notes on building solo in the AI era
- One email when I have something worth saying (never noise)

Hit reply and tell me what you're working on right now.
I read every single reply personally.

Explore everything at: ${siteUrl}

---

P.S. As a thank-you for joining, I'm making my LinkedIn Visibility Playbook
available to new subscribers for just $2 (normally $19). It's a step-by-step
guide to turning your LinkedIn profile into something that actually brings in
leads — without posting every day.

Grab it here if you're interested: ${OTO_LINK}

---

You subscribed at sunstroke-gules.vercel.app
To stop receiving emails, reply with "unsubscribe"
`.trim();

  // ── HTML version ────────────────────────────────────────────────────────────
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Welcome to Sunstroke</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

        <!-- Header -->
        <tr>
          <td style="background:#000;border-radius:8px 8px 0 0;padding:24px 32px;text-align:center;">
            <span style="font-family:Arial,sans-serif;font-size:18px;font-weight:bold;color:#ffe566;letter-spacing:3px;">
              SUNSTROKE
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 32px;border-left:1px solid #ddd;border-right:1px solid #ddd;">

            <p style="margin:0 0 16px;font-size:22px;font-weight:bold;color:#111;line-height:1.3;">
              ${greeting} — welcome.
            </p>

            <p style="margin:0 0 16px;font-size:15px;color:#444;line-height:1.8;">
              I'm <strong>Sahil</strong>. I build AI-powered tools, ship digital products,
              and share everything I learn along the way — the wins, the failures, and the
              exact stack I use.
            </p>

            <p style="margin:0 0 8px;font-size:14px;font-weight:bold;color:#111;">
              What to expect:
            </p>
            <p style="margin:2px 0;font-size:14px;color:#555;line-height:1.7;">- Real breakdowns of the tools I build</p>
            <p style="margin:2px 0;font-size:14px;color:#555;line-height:1.7;">- Early access before public launch</p>
            <p style="margin:2px 0;font-size:14px;color:#555;line-height:1.7;">- Honest notes on building solo in the AI era</p>
            <p style="margin:2px 0 24px;font-size:14px;color:#555;line-height:1.7;">- One email when I have something worth saying</p>

            <p style="margin:0 0 28px;font-size:15px;color:#444;line-height:1.8;">
              Hit reply and tell me what you're working on right now —
              I read every reply personally.
            </p>

            <p style="margin:0;text-align:center;">
              <a href="${siteUrl}"
                 style="display:inline-block;background:#111;color:#ffe566;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;padding:13px 28px;border-radius:6px;text-decoration:none;">
                Explore Sunstroke
              </a>
            </p>

          </td>
        </tr>

        <!-- P.S. / OTO (plain, not promotional) -->
        <tr>
          <td style="background:#fffef5;border:1px solid #ddd;border-top:none;padding:24px 32px;">
            <p style="margin:0 0 8px;font-size:13px;color:#888;font-family:Arial,sans-serif;">
              P.S.
            </p>
            <p style="margin:0 0 12px;font-size:14px;color:#333;line-height:1.7;font-family:Arial,sans-serif;">
              As a thank-you for joining, I'm sharing my
              <strong>LinkedIn Visibility Playbook</strong> with new subscribers at a reduced price.
              It walks through the exact steps to make your profile actually attract people —
              without posting every day. Available for <strong>$2</strong> if you want it.
            </p>
            <p style="margin:0;">
              <a href="${OTO_LINK}"
                 style="font-size:14px;color:#111;font-family:Arial,sans-serif;font-weight:bold;text-decoration:underline;">
                Check it out here
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f0f0f0;border-radius:0 0 8px 8px;padding:16px 32px;text-align:center;border:1px solid #ddd;border-top:none;">
            <p style="margin:0;font-size:11px;color:#999;font-family:Arial,sans-serif;line-height:1.7;">
              You signed up at
              <a href="${siteUrl}" style="color:#888;">sunstroke-gules.vercel.app</a>
              <br>
              To unsubscribe, reply to this email with the word "unsubscribe"
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return sendMail({
    to: email,
    subject: `${greeting}, you're in`,
    text,
    html,
  });
}

// ─── Broadcast Email ──────────────────────────────────────────────────────────
export async function sendBroadcast({
  recipients,
  subject,
  html,
  text,
}: {
  recipients: string[];
  subject: string;
  html: string;
  text: string;
}) {
  const transporter = createTransporter();
  if (!transporter) return { success: false, sent: 0, error: "Mailer not configured" };

  const user = process.env.GMAIL_USER!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app";
  let sent = 0;
  const errors: string[] = [];

  const BATCH_SIZE = 10;
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (emailAddr) => {
        try {
          await transporter.sendMail({
            from: `"Sahil (Sunstroke)" <${user}>`,
            to: emailAddr,
            subject,
            text,
            html,
            headers: {
              "List-Unsubscribe": `<mailto:${user}?subject=unsubscribe>, <${siteUrl}/unsubscribe>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              "Precedence": "bulk",
            },
          });
          sent++;
        } catch (err: any) {
          console.error(`[Broadcast] Failed for ${emailAddr}:`, err.message);
          errors.push(emailAddr);
        }
      })
    );
    if (i + BATCH_SIZE < recipients.length) {
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  return { success: true, sent, failed: errors.length };
}
