import nodemailer from "nodemailer";

// ─── SMTP Transporter ─────────────────────────────────────────────────────────
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("[Mailer] GMAIL_USER or GMAIL_APP_PASSWORD not set.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

// ─── Shared Send Helper ────────────────────────────────────────────────────────
export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  const transporter = createTransporter();
  if (!transporter) return { success: false, error: "Mailer not configured" };

  const from = `"Sunstroke by Sahil" <${process.env.GMAIL_USER}>`;

  try {
    await transporter.sendMail({ from, to, subject, html });
    return { success: true };
  } catch (err: any) {
    console.error("[Mailer] Send failed:", err.message);
    return { success: false, error: err.message };
  }
}

// ─── Welcome Email with OTO ───────────────────────────────────────────────────
export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string;
  name?: string;
}) {
  const greeting = name ? `Hey ${name}` : "Hey there";
  const OTO_LINK = process.env.OTO_CHECKOUT_LINK || "https://sahilundhad.gumroad.com";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Sunstroke ⚡</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;padding:0 16px;">

    <!-- HEADER -->
    <div style="background:#000;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
      <span style="background:#ffe566;color:#000;font-weight:900;font-size:22px;letter-spacing:2px;padding:8px 20px;border-radius:8px;display:inline-block;">
        ⚡ SUNSTROKE
      </span>
      <p style="color:#aaa;font-size:12px;margin:10px 0 0;letter-spacing:1px;text-transform:uppercase;">
        AI · Tools · Products · Creator Resources
      </p>
    </div>

    <!-- WELCOME BODY -->
    <div style="background:#fff;border-left:3px solid #000;border-right:3px solid #000;padding:36px 32px;">
      <h1 style="margin:0 0 8px;font-size:28px;font-weight:900;color:#000;line-height:1.2;">
        ${greeting}, welcome to the crew! 🎉
      </h1>
      <p style="color:#444;font-size:15px;line-height:1.7;margin:16px 0;">
        You just joined a growing community of builders, creators, and AI enthusiasts. 
        I'm <strong>Sahil</strong> — I build AI-powered tools, ship digital products, 
        and document every step of the journey.
      </p>

      <div style="background:#f4f1ea;border:2px solid #000;border-radius:12px;padding:20px 24px;margin:24px 0;">
        <p style="margin:0 0 12px;font-weight:900;color:#000;font-size:15px;">🎁 What's coming your way:</p>
        <ul style="margin:0;padding-left:20px;color:#333;font-size:14px;line-height:2;">
          <li>Real-world AI tool breakdowns — how I build them, what works</li>
          <li>Early access to products before public launch</li>
          <li>Honest insights on building solo in the AI era</li>
          <li>No fluff — only things actually worth your time</li>
        </ul>
      </div>

      <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Hit reply anytime — I personally read every message. 
        That's a promise, not just a line.
      </p>

      <div style="text-align:center;margin-bottom:8px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app"}"
           style="display:inline-block;background:#000;color:#ffe566;font-weight:900;padding:14px 32px;border-radius:10px;text-decoration:none;font-size:14px;letter-spacing:1px;">
          → Explore Sunstroke
        </a>
      </div>
    </div>

    <!-- OTO SECTION -->
    <div style="background:#ffe566;border:3px solid #000;border-top:none;border-radius:0 0 0 0;padding:32px;position:relative;">
      <div style="background:#ff3c3c;color:#fff;font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;display:inline-block;padding:4px 12px;border-radius:4px;margin-bottom:14px;">
        ⏰ One-Time Offer — For New Subscribers Only
      </div>
      <h2 style="margin:0 0 10px;font-size:22px;font-weight:900;color:#000;line-height:1.3;">
        The LinkedIn Visibility Playbook
      </h2>
      <p style="font-size:15px;font-weight:700;color:#222;margin:0 0 6px;">
        Turn Your Profile Into a Lead Magnet
      </p>
      <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 20px;">
        Most LinkedIn profiles are invisible. This playbook shows you the exact 
        system to position yourself as an authority, attract inbound leads, and 
        grow your network — without posting every single day.
      </p>

      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:20px;">
        <div style="background:#000;color:#ffe566;font-size:28px;font-weight:900;padding:8px 20px;border-radius:8px;display:inline-block;">
          $2
        </div>
        <div style="color:#666;text-decoration:line-through;font-size:16px;font-weight:700;">$19</div>
        <div style="background:#000;color:#fff;font-size:11px;font-weight:900;padding:4px 10px;border-radius:4px;">90% OFF</div>
      </div>

      <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#333;line-height:2;font-weight:600;">
        <li>Profile optimization checklist (section by section)</li>
        <li>Headline formulas that get you found</li>
        <li>Content strategy for non-writers</li>
        <li>DM scripts that actually get replies</li>
        <li>Real examples from profiles that convert</li>
      </ul>

      <div style="text-align:center;">
        <a href="${OTO_LINK}"
           style="display:inline-block;background:#000;color:#ffe566;font-weight:900;font-size:16px;padding:16px 40px;border-radius:10px;text-decoration:none;box-shadow:4px 4px 0 #000;letter-spacing:0.5px;">
          🚀 Get It for $2 — Limited Time
        </a>
        <p style="font-size:11px;color:#666;margin:12px 0 0;">
          This price disappears after you close this email. No regrets.
        </p>
      </div>
    </div>

    <!-- FOOTER -->
    <div style="background:#000;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
      <p style="color:#666;font-size:12px;margin:0;">
        You subscribed at <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app"}" style="color:#ffe566;">sunstroke-gules.vercel.app</a>
        &nbsp;·&nbsp;
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app"}" style="color:#aaa;">Unsubscribe</a>
      </p>
      <p style="color:#555;font-size:11px;margin:8px 0 0;">
        © 2026 Sunstroke. Built by Sahil.
      </p>
    </div>

  </div>
</body>
</html>
  `;

  return sendMail({
    to: email,
    subject: "⚡ Welcome to Sunstroke + a special offer just for you",
    html,
  });
}

// ─── Broadcast Email ──────────────────────────────────────────────────────────
export async function sendBroadcast({
  recipients,
  subject,
  html,
}: {
  recipients: string[];
  subject: string;
  html: string;
}) {
  const transporter = createTransporter();
  if (!transporter) return { success: false, sent: 0, error: "Mailer not configured" };

  const from = `"Sunstroke by Sahil" <${process.env.GMAIL_USER}>`;
  let sent = 0;
  const errors: string[] = [];

  // Send in batches of 10 to avoid rate limits
  const BATCH_SIZE = 10;
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (email) => {
        try {
          await transporter.sendMail({ from, to: email, subject, html });
          sent++;
        } catch (err: any) {
          console.error(`[Broadcast] Failed to send to ${email}:`, err.message);
          errors.push(email);
        }
      })
    );
    // Small delay between batches
    if (i + BATCH_SIZE < recipients.length) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  return { success: true, sent, failed: errors.length };
}
