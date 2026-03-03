import nodemailer from "nodemailer";

// Cached transporter — created once, reused across all requests.
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
