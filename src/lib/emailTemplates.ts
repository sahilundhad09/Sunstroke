// ─── Sunstroke Branded Email Templates ────────────────────────────────────────
// All transactional & broadcast emails use these templates for consistent
// brand identity. Built with table-based HTML for maximum email client support.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke-gules.vercel.app";
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "hello@sunstroke.tech";

// ─── Shared Shell ─────────────────────────────────────────────────────────────
// Wraps any inner content with the Sunstroke header + footer
export function emailShell({
  title,
  preheader,
  body,
}: {
  title: string;
  preheader: string; // Shows in inbox preview (after subject line)
  body: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .fluid { max-width: 100% !important; height: auto !important; }
      .stack-column, .stack-column-center { display: block !important; width: 100% !important; }
      .body-pad { padding: 24px 20px !important; }
      .ps-pad { padding: 20px 20px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F4F1EA;word-break:break-word;">

  <!-- Preheader (hidden inbox preview text) -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;">
    ${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#F4F1EA;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Email card -->
        <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0"
               style="max-width:600px;width:100%;border:2px solid #000000;border-radius:16px;overflow:hidden;box-shadow:5px 5px 0px #000000;">

          <!-- ── HEADER ─────────────────────────────────────────────────── -->
          <tr>
            <td style="background-color:#000000;padding:24px 32px;text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background-color:#FFE566;padding:8px 22px;border-radius:8px;border:2px solid #000000;">
                      <span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:900;color:#000000;letter-spacing:4px;text-transform:uppercase;">
                        SUNSTROKE
                      </span>
                    </div>
                    <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#888888;letter-spacing:2px;text-transform:uppercase;">
                      AI &middot; Tools &middot; Products &middot; Creator Resources
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── BODY (injected) ────────────────────────────────────────── -->
          ${body}

          <!-- ── FOOTER ────────────────────────────────────────────────── -->
          <tr>
            <td style="background-color:#111111;padding:20px 32px;text-align:center;border-top:2px solid #000000;">
              <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;">
                You're receiving this because you subscribed at
                <a href="${SITE_URL}" style="color:#FFE566;text-decoration:none;">sunstroke-gules.vercel.app</a>
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#444444;">
                &copy; 2026 Sunstroke &middot; Built by Sahil &middot;
                <a href="mailto:${SENDER_EMAIL}?subject=unsubscribe" style="color:#555555;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Email card -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Welcome Email Template ───────────────────────────────────────────────────
export function welcomeEmailHtml({
  greeting,
  siteUrl,
  otoLink,
}: {
  greeting: string;
  siteUrl: string;
  otoLink: string;
}): string {
  const body = `
    <!-- Main body -->
    <tr>
      <td class="body-pad" style="background-color:#ffffff;padding:40px 36px;border-top:2px solid #000000;">

        <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:bold;color:#000000;line-height:1.3;">
          ${greeting} — you're in. 🎉
        </h1>

        <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#333333;line-height:1.8;">
          I'm <strong>Sahil</strong>. I build AI-powered tools, ship digital products,
          and share everything I learn along the way — the wins, the failures,
          and the exact stack behind all of it.
        </p>

        <!-- What to expect box -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
               style="background-color:#F4F1EA;border:2px solid #000000;border-radius:10px;margin:24px 0;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:900;color:#000000;text-transform:uppercase;letter-spacing:1px;">
                What you'll get
              </p>
              <p style="margin:4px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#333333;line-height:1.7;">
                &rarr; Real breakdowns of AI tools (how I actually build them)
              </p>
              <p style="margin:4px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#333333;line-height:1.7;">
                &rarr; Early access to products before public launch
              </p>
              <p style="margin:4px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#333333;line-height:1.7;">
                &rarr; Honest notes on building solo in the AI era
              </p>
              <p style="margin:4px 0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#333333;line-height:1.7;">
                &rarr; One email when I have something worth saying — no noise
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 28px;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#444444;line-height:1.8;">
          Hit reply and tell me what you're building right now.
          I read every single reply personally — that's a real commitment, not a line.
        </p>

        <!-- CTA -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 auto;">
          <tr>
            <td style="background-color:#000000;border-radius:8px;border:2px solid #000000;box-shadow:3px 3px 0 #000000;">
              <a href="${siteUrl}" target="_blank"
                 style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:900;color:#FFE566;text-decoration:none;letter-spacing:1px;text-transform:uppercase;">
                Explore Sunstroke &rarr;
              </a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- OTO / P.S. section -->
    <tr>
      <td class="ps-pad" style="background-color:#FFFEF5;padding:28px 36px;border-top:2px solid #000000;">
        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:900;color:#999999;text-transform:uppercase;letter-spacing:2px;">
          P.S. — Welcome Gift
        </p>
        <p style="margin:8px 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-weight:bold;color:#000000;">
          The LinkedIn Visibility Playbook
        </p>
        <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#444444;line-height:1.7;">
          As a thank-you for joining, I'm making this available to new subscribers at a
          special price. It walks through the exact steps to turn your LinkedIn profile
          into something that actually attracts leads — without posting every day.
        </p>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="background-color:#FFE566;border:2px solid #000000;border-radius:6px;padding:8px 16px;margin-right:12px;">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:900;color:#000000;">$2</span>
            </td>
            <td style="padding-left:12px;">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#888888;text-decoration:line-through;">Regular: $19</span><br/>
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#000000;">New subscriber pricing</span>
            </td>
          </tr>
        </table>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:18px;">
          <tr>
            <td style="background-color:#000000;border-radius:6px;border:2px solid #000000;">
              <a href="${otoLink}" target="_blank"
                 style="display:inline-block;padding:11px 24px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#FFE566;text-decoration:none;">
                Get the Playbook for $2 &rarr;
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return emailShell({
    title: "Welcome to Sunstroke",
    preheader: "You're officially in. Here's what happens next...",
    body,
  });
}

// ─── Broadcast Email Template ─────────────────────────────────────────────────
// Wraps admin-written content in the Sunstroke brand shell.
// Admin writes plain text paragraphs; this renders them as branded HTML.
export function broadcastEmailHtml({
  subject,
  bodyText,    // plain text content written by admin (supports \n\n for paragraphs)
  ctaLabel,    // optional CTA button label
  ctaUrl,      // optional CTA button URL
  siteUrl,
}: {
  subject: string;
  bodyText: string;
  ctaLabel?: string;
  ctaUrl?: string;
  siteUrl: string;
}): string {
  // Convert plain text paragraphs → HTML paragraphs
  const paragraphs = bodyText
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#333333;line-height:1.8;">${p.replace(/\n/g, "<br/>")}</p>`
    )
    .join("\n");

  const ctaBlock =
    ctaLabel && ctaUrl
      ? `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:28px auto 0;">
      <tr>
        <td style="background-color:#000000;border-radius:8px;border:2px solid #000000;box-shadow:3px 3px 0 #000000;">
          <a href="${ctaUrl}" target="_blank"
             style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:900;color:#FFE566;text-decoration:none;letter-spacing:1px;">
            ${ctaLabel} &rarr;
          </a>
        </td>
      </tr>
    </table>`
      : "";

  const body = `
    <tr>
      <td class="body-pad" style="background-color:#ffffff;padding:40px 36px;border-top:2px solid #000000;">

        <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:900;color:#999999;text-transform:uppercase;letter-spacing:2px;">
          From Sahil
        </p>
        <h1 style="margin:8px 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:bold;color:#000000;line-height:1.3;border-bottom:2px solid #FFE566;padding-bottom:16px;">
          ${subject}
        </h1>

        ${paragraphs}

        ${ctaBlock}

      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="background-color:#FFE566;height:4px;border-top:2px solid #000000;"></td>
    </tr>

    <!-- Signature -->
    <tr>
      <td style="background-color:#ffffff;padding:20px 36px;border-top:none;">
        <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#555555;line-height:1.7;">
          — Sahil<br/>
          <span style="font-size:12px;color:#888888;">Founder, Sunstroke &middot; <a href="${siteUrl}" style="color:#888888;text-decoration:none;">${siteUrl.replace("https://", "")}</a></span>
        </p>
      </td>
    </tr>`;

  return emailShell({
    title: subject,
    preheader: `${subject} — from Sahil at Sunstroke`,
    body,
  });
}
