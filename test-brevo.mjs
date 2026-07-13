// Run with: node test-brevo.mjs
// Tests Brevo SMTP connection and sends a test email

import nodemailer from "nodemailer";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const user = process.env.BREVO_SMTP_USER;
const pass = process.env.BREVO_SMTP_KEY;
const testRecipient = process.env.BREVO_SMTP_USER; // send to yourself

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("Brevo SMTP Test");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("BREVO_SMTP_USER:", user || "❌ NOT SET");
console.log("BREVO_SMTP_KEY:", pass ? `✅ SET (${pass.substring(0, 12)}...)` : "❌ NOT SET");
console.log("");

if (!user || !pass || user.includes("your_brevo")) {
  console.error("❌ Credentials not set. Add BREVO_SMTP_USER and BREVO_SMTP_KEY to .env.local first.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: { user, pass },
});

console.log("Testing SMTP connection...");
try {
  await transporter.verify();
  console.log("✅ SMTP connection successful!\n");
} catch (err) {
  console.error("❌ SMTP connection failed:", err.message);
  process.exit(1);
}

console.log(`Sending test email to ${testRecipient}...`);
try {
  const info = await transporter.sendMail({
    from: `"Sunstroke Test" <${user}>`,
    to: testRecipient,
    subject: "✅ Brevo SMTP test — working!",
    text: "If you see this, Brevo SMTP is configured correctly and emails will land in inbox.",
    html: "<p>If you see this, <strong>Brevo SMTP is working correctly</strong>. Welcome emails will now land in inbox instead of spam.</p>",
  });
  console.log("✅ Test email sent! Message ID:", info.messageId);
  console.log("\nCheck your inbox at:", testRecipient);
} catch (err) {
  console.error("❌ Failed to send:", err.message);
}
