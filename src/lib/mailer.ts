import nodemailer from "nodemailer";
import { welcomeEmailHtml, broadcastEmailHtml } from "@/lib/emailTemplates";

// ─── Brevo SMTP Transporter ───────────────────────────────────────────────────
function createTransporter() {
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_KEY;

  if (!user || !pass) {
    console.warn("[Mailer] Brevo SMTP credentials not configured.");
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

// Visible "From" address — must be a verified sender in your Brevo account
function getFromAddress() {
  const email = process.env.BREVO_SENDER_EMAIL || "hello@sunstroke.tech";
  return `"Sahil (Sunstroke)" <${email}>`;
}

// ─── Core Send Helper ─────────────────────────────────────────────────────────
export async function sendMail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}): Promise<{ success: boolean; error?: string }> {
  const transporter = createTransporter();
  if (!transporter) return { success: false, error: "Mailer not configured" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app";
  const replyTo = process.env.BREVO_SENDER_EMAIL || "hello@sunstroke.tech";

  try {
    await transporter.sendMail({
      from: getFromAddress(),
      to,
      replyTo,
      subject,
      text,   // Plain text — critical for spam score
      html,   // Branded HTML
      headers: {
        "List-Unsubscribe": `<mailto:${replyTo}?subject=unsubscribe>, <${siteUrl}/unsubscribe>`,
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
  const otoLink = process.env.OTO_CHECKOUT_LINK || siteUrl;

  const html = welcomeEmailHtml({ greeting, siteUrl, otoLink });

  const text = `${greeting},

You're in. Welcome to Sunstroke.

I'm Sahil — I build AI-powered tools, ship digital products, and share everything
I learn along the way. No filters, no fluff.

Here's what to expect:
- Real breakdowns of AI tools (how I actually build them)
- Early access to products before public launch
- Honest notes on building solo in the AI era
- One email when I have something worth saying — never noise

Hit reply and tell me what you're working on right now.
I read every single reply personally.

Explore everything: ${siteUrl}

---

P.S. As a thank-you for joining, my LinkedIn Visibility Playbook is available
to new subscribers for just $2 (normally $19). Step-by-step guide to turning
your LinkedIn profile into something that actually attracts leads.

Grab it here: ${otoLink}

---

You subscribed at sunstroke-gules.vercel.app
To unsubscribe, reply with the word "unsubscribe"`.trim();

  return sendMail({
    to: email,
    subject: `${greeting}, you're officially in ⚡`,
    html,
    text,
  });
}

// ─── Broadcast Email ──────────────────────────────────────────────────────────
// Admin writes plain text; this wraps it in the branded template automatically.
export async function sendBroadcast({
  recipients,
  subject,
  bodyText,
  ctaLabel,
  ctaUrl,
}: {
  recipients: string[];
  subject: string;
  bodyText: string;       // Plain text content from admin
  ctaLabel?: string;      // Optional CTA button label
  ctaUrl?: string;        // Optional CTA button URL
}) {
  const transporter = createTransporter();
  if (!transporter) return { success: false, sent: 0, error: "Mailer not configured" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app";
  const replyTo = process.env.BREVO_SENDER_EMAIL || "hello@sunstroke.tech";

  // Generate branded HTML from admin's plain text
  const html = broadcastEmailHtml({ subject, bodyText, ctaLabel, ctaUrl, siteUrl });

  // Plain text fallback: strip to simple text
  const text = `${subject}\n\nFrom Sahil at Sunstroke\n\n${bodyText}${ctaLabel && ctaUrl ? `\n\n${ctaLabel}: ${ctaUrl}` : ""}\n\n---\nSunstroke · ${siteUrl}\nTo unsubscribe, reply with "unsubscribe"`;

  let sent = 0;
  const errors: string[] = [];

  // Brevo allows higher throughput — batch 20 at a time
  const BATCH_SIZE = 20;
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (emailAddr) => {
        try {
          await transporter.sendMail({
            from: getFromAddress(),
            to: emailAddr,
            replyTo,
            subject,
            text,
            html,
            headers: {
              "List-Unsubscribe": `<mailto:${replyTo}?subject=unsubscribe>, <${siteUrl}/unsubscribe>`,
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

    // Brief pause between batches
    if (i + BATCH_SIZE < recipients.length) {
      await new Promise((r) => setTimeout(r, 800));
    }
  }

  return { success: true, sent, failed: errors.length };
}
