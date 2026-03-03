import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailHeader, emailFooter } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, certificateId } = body;

    if (!email || !certificateId) {
      return NextResponse.json(
        { message: "Email and Certificate ID are required." },
        { status: 400 }
      );
    }

    // In production, you'd query a database here to validate the certificate.
    // For now, we send an acknowledgement email.

    // Build user confirmation email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        ${emailHeader("Certificate Validation in Progress", "linear-gradient(135deg, #f59e0b, #d97706)")}
        <div style="padding: 24px;">
          <p style="margin: 0 0 16px 0; color: #374151;">We've received your certificate validation request and our team is on it.</p>

          <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #92400e; font-size: 14px;">Request Details</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 4px 0; color: #6b7280; width: 130px;">Certificate ID:</td><td style="padding: 4px 0; color: #374151; font-weight: 600;">${certificateId}</td></tr>
              <tr><td style="padding: 4px 0; color: #6b7280;">Email:</td><td style="padding: 4px 0; color: #374151;">${email}</td></tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #374151;">What Happens Next?</p>
            <table style="border-collapse: collapse;">
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #f59e0b;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">Our team will verify the certificate against our records</td></tr>
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #f59e0b;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">Validation results will be emailed within <strong>24–48 hours</strong></td></tr>
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #f59e0b;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">For urgent requests, contact us at <strong>+91 9241959311</strong></td></tr>
            </table>
          </div>

          <p style="margin: 16px 0 0 0; color: #6b7280; font-size: 14px;">Warm regards,<br/><strong>The North Star Academy Team</strong></p>
        </div>
        ${emailFooter()}
      </div>
    `;

    // Build admin notification email
    const adminEmail = process.env.ADMIN_EMAIL || "connect@northstaronline.in";
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        ${emailHeader("Certificate Validation Request", "linear-gradient(135deg, #f59e0b, #d97706)")}
        <div style="padding: 24px;">
          <p>A certificate validation has been requested:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Certificate ID:</td><td style="padding: 8px 0;">${certificateId}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
          </table>
        </div>
        ${emailFooter()}
      </div>`;

    // Send both emails in parallel instead of sequentially
    await Promise.allSettled([
      sendEmail({
        to: email,
        subject: `Certificate Validation Request — ${certificateId}`,
        html,
      }),
      sendEmail({
        to: adminEmail,
        subject: `[Certificate Validation] ${certificateId} — from ${email}`,
        html: adminHtml,
        replyTo: email,
      }),
    ]);

    return NextResponse.json({
      message: "Validation request received. We'll email you the results within 24-48 hours.",
    });
  } catch (error) {
    console.error("Certificate validation error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
