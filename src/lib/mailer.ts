import { Resend } from "resend";

// ─── Resend Client ────────────────────────────────────────────────────────────
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[Mailer] RESEND_API_KEY not set.");
    return null;
  }
  return new Resend(key);
}

const FROM_ADDRESS = "Sunstroke <onboarding@resend.dev>";

// ─── Shared Send Helper ────────────────────────────────────────────────────────
export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) return { success: false, error: "Mailer not configured" };

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
    headers: {
      "List-Unsubscribe": `<${process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app"}>`,
    },
  });

  if (error) {
    console.error("[Mailer] Send failed:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app";
  const OTO_LINK = process.env.OTO_CHECKOUT_LINK || siteUrl;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Sunstroke</title>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:580px;margin:32px auto;padding:0 16px;">

    <!-- HEADER -->
    <div style="background:#000;border-radius:14px 14px 0 0;padding:28px 32px;text-align:center;">
      <span style="background:#ffe566;color:#000;font-weight:900;font-size:20px;letter-spacing:2px;padding:7px 18px;border-radius:8px;display:inline-block;">
        SUNSTROKE
      </span>
      <p style="color:#888;font-size:11px;margin:10px 0 0;letter-spacing:1px;text-transform:uppercase;">
        AI · Tools · Products · Creator Resources
      </p>
    </div>

    <!-- WELCOME BODY -->
    <div style="background:#fff;border-left:2px solid #000;border-right:2px solid #000;padding:36px 32px;">
      <h1 style="margin:0 0 6px;font-size:26px;font-weight:900;color:#000;line-height:1.2;">
        ${greeting} — welcome aboard! 🎉
      </h1>
      <p style="color:#555;font-size:15px;line-height:1.8;margin:16px 0;">
        I'm <strong style="color:#000;">Sahil</strong>. I build AI-powered tools, ship digital products, 
        and share everything I learn along the way — the wins, the failures, and the exact stack I use.
      </p>

      <div style="background:#f4f1ea;border-left:4px solid #ffe566;border-radius:0 8px 8px 0;padding:16px 20px;margin:24px 0;">
        <p style="margin:0 0 10px;font-weight:900;color:#000;font-size:14px;">What's coming your way:</p>
        <p style="margin:4px 0;color:#333;font-size:13px;line-height:1.7;">→ Real breakdowns of AI tools (how I actually build them)</p>
        <p style="margin:4px 0;color:#333;font-size:13px;line-height:1.7;">→ Early access to products before public launch</p>
        <p style="margin:4px 0;color:#333;font-size:13px;line-height:1.7;">→ Honest insights on building solo in the AI era</p>
        <p style="margin:4px 0;color:#333;font-size:13px;line-height:1.7;">→ No filler — only things worth your time</p>
      </div>

      <p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 28px;">
        Hit reply and tell me what you're building — I personally read every message.
      </p>

      <div style="text-align:center;margin-bottom:8px;">
        <a href="${siteUrl}" style="display:inline-block;background:#000;color:#ffe566;font-weight:900;padding:14px 30px;border-radius:10px;text-decoration:none;font-size:14px;letter-spacing:0.5px;">
          Explore Sunstroke →
        </a>
      </div>
    </div>

    <!-- DIVIDER -->
    <div style="background:#ffe566;height:4px;border-left:2px solid #000;border-right:2px solid #000;"></div>

    <!-- OTO SECTION -->
    <div style="background:#fff;border:2px solid #000;border-top:none;padding:28px 32px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#666;">
        Welcome gift — new subscriber offer
      </p>
      <h2 style="margin:8px 0 10px;font-size:20px;font-weight:900;color:#000;line-height:1.3;">
        The LinkedIn Visibility Playbook
      </h2>
      <p style="font-size:14px;font-weight:700;color:#333;margin:0 0 4px;">
        Turn Your Profile Into a Lead Magnet
      </p>
      <p style="font-size:13px;color:#555;line-height:1.7;margin:0 0 18px;">
        Most LinkedIn profiles go unnoticed. This playbook walks you through the exact 
        steps to position yourself as an authority, attract the right people, and 
        grow your network — without posting every single day.
      </p>

      <p style="margin:0 0 12px;font-size:13px;color:#333;font-weight:600;">What's inside:</p>
      <p style="margin:3px 0;font-size:13px;color:#333;">✓ Profile optimization checklist (section by section)</p>
      <p style="margin:3px 0;font-size:13px;color:#333;">✓ Headline formulas that help you get found</p>
      <p style="margin:3px 0;font-size:13px;color:#333;">✓ Content strategy for people who don't write daily</p>
      <p style="margin:3px 0;font-size:13px;color:#333;">✓ DM scripts that actually get replies</p>
      <p style="margin:3px 0 20px;font-size:13px;color:#333;">✓ Real profile examples that convert</p>

      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;">
        <span style="background:#000;color:#ffe566;font-size:26px;font-weight:900;padding:8px 18px;border-radius:8px;display:inline-block;">
          $2
        </span>
        <div>
          <p style="margin:0;font-size:12px;color:#888;text-decoration:line-through;">Regular price: $19</p>
          <p style="margin:2px 0 0;font-size:11px;font-weight:700;color:#000;">Special welcome pricing</p>
        </div>
      </div>

      <a href="${OTO_LINK}" style="display:block;text-align:center;background:#000;color:#ffe566;font-weight:900;font-size:15px;padding:15px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">
        Get The Playbook for $2
      </a>
      <p style="font-size:11px;color:#999;text-align:center;margin:10px 0 0;">
        This pricing is available as a welcome gift for new subscribers only.
      </p>
    </div>

    <!-- FOOTER -->
    <div style="background:#111;border-radius:0 0 14px 14px;padding:20px 32px;text-align:center;">
      <p style="color:#555;font-size:12px;margin:0 0 4px;">
        You signed up at
        <a href="${siteUrl}" style="color:#ffe566;text-decoration:none;">sunstroke-gules.vercel.app</a>
      </p>
      <p style="color:#444;font-size:11px;margin:0;">
        © 2026 Sunstroke · Built by Sahil ·
        <a href="${siteUrl}" style="color:#555;text-decoration:none;">Unsubscribe</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();

  return sendMail({
    to: email,
    subject: "Welcome to Sunstroke — here's a gift for you",
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
  const resend = getResend();
  if (!resend) return { success: false, sent: 0, error: "Mailer not configured" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app";
  let sent = 0;
  const errors: string[] = [];

  // Resend supports up to 100 emails per batch request
  const BATCH_SIZE = 50;
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);

    const batchPayload = batch.map((email) => ({
      from: FROM_ADDRESS,
      to: email,
      subject,
      html,
      headers: {
        "List-Unsubscribe": `<${siteUrl}>`,
      },
    }));

    try {
      const { data, error } = await resend.batch.send(batchPayload);
      if (error) {
        console.error("[Broadcast] Batch error:", error);
        errors.push(...batch);
      } else {
        sent += data?.data?.length ?? batch.length;
      }
    } catch (err: any) {
      console.error("[Broadcast] Batch send failed:", err.message);
      errors.push(...batch);
    }

    // Brief pause between batches to respect rate limits
    if (i + BATCH_SIZE < recipients.length) {
      await new Promise((r) => setTimeout(r, 1200));
    }
  }

  return { success: true, sent, failed: errors.length };
}
