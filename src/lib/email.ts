import nodemailer from "nodemailer";

// ── Shared email template helpers ──────────────────────────────────

const LOGO_URL = "https://northstaronline.in/brand-logo-header-darkmode.png";

/**
 * Returns branded email header with logo + title on a gradient banner.
 * @param title  Heading text shown below the logo
 * @param gradient  CSS gradient (default: blue/indigo)
 */
export function emailHeader(
  title: string,
  gradient = "linear-gradient(135deg, #3b82f6, #6366f1)"
): string {
  return `
    <div style="background: ${gradient}; padding: 28px 24px 20px; border-radius: 12px 12px 0 0; text-align: center;">
      <img src="${LOGO_URL}" alt="North Star Academy" style="height: 48px; margin-bottom: 14px; display: inline-block;" />
      <h1 style="color: white; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 0.3px;">${title}</h1>
    </div>`;
}

/**
 * Returns branded email footer with tagline, website link and contact email.
 */
export function emailFooter(): string {
  return `
    <div style="text-align: center; padding: 20px 24px; border-top: 1px solid #e5e7eb; background: #f9fafb; border-radius: 0 0 12px 12px;">
      <p style="margin: 0 0 6px 0; color: #374151; font-size: 13px; font-weight: 600;">North Star Academy</p>
      <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px;">Developing Leaders | Empowering Institutions</p>
      <p style="margin: 0; color: #9ca3af; font-size: 12px;">
        <a href="https://northstaronline.in" style="color: #3b82f6; text-decoration: none;">northstaronline.in</a>
        &nbsp;&bull;&nbsp;
        <a href="mailto:connect@northstaronline.in" style="color: #3b82f6; text-decoration: none;">connect@northstaronline.in</a>
        &nbsp;&bull;&nbsp;
        +91 9241959311
      </p>
    </div>`;
}

// ── Cached transporter ─────────────────────────────────────────────
// Created once, reused across all requests.
// Uses connection pooling to avoid repeated TCP/TLS/AUTH handshakes.
let cachedTransporter: nodemailer.Transporter | null | undefined;

function getTransporter() {
  // Return cached transporter if already created
  if (cachedTransporter !== undefined) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    cachedTransporter = null; // No SMTP configured — will log to console instead
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port: Number(port) || 587,
    secure: Number(port) === 465,
    auth: { user, pass },
    pool: true,         // Reuse connections instead of opening new ones
    maxConnections: 3,  // Allow up to 3 simultaneous connections
    maxMessages: 100,   // Send up to 100 messages per connection before reconnecting
  });

  return cachedTransporter;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@northstaronline.in";

  if (!transporter) {
    // Fallback: log to console when SMTP is not configured
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 EMAIL (SMTP not configured — logging instead)");
    console.log(`   To: ${to}`);
    console.log(`   From: ${from}`);
    if (replyTo) console.log(`   Reply-To: ${replyTo}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body:\n${html.replace(/<[^>]*>/g, "")}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    return { success: true, mode: "console" };
  }

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      replyTo,
    });
    return { success: true, mode: "smtp" };
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}
