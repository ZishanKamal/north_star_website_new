import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

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

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Certificate Validation Request</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p>We've received your certificate validation request.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Certificate ID:</td><td style="padding: 8px 0;">${certificateId}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
          </table>
          <p>Our team will verify this certificate and send you the validation details within 24-48 hours.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">— The North Star Academy Team</p>
        </div>
      </div>
    `;

    // Send to user
    await sendEmail({
      to: email,
      subject: `Certificate Validation Request — ${certificateId}`,
      html,
    });

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL || "connect@northstaronline.in";
    await sendEmail({
      to: adminEmail,
      subject: `[Certificate Validation] ${certificateId} — from ${email}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Certificate Validation Request</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p>A certificate validation has been requested:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Certificate ID:</td><td style="padding: 8px 0;">${certificateId}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
          </table>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">— The North Star Academy Team</p>
        </div>
      </div>`,
      replyTo: email,
    });

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
