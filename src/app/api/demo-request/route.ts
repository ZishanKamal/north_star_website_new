import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, programInterest } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Free Demo Request — North Star Academy</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p>Thank you for your interest in a free demo!</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
            ${programInterest ? `<tr><td style="padding: 8px 0; font-weight: bold;">Interest:</td><td style="padding: 8px 0;">${programInterest}</td></tr>` : ""}
          </table>
          <p>Our team will reach out to you shortly to schedule your free demo session.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">— The North Star Academy Team</p>
        </div>
      </div>
    `;

    // Send acknowledgement to user
    await sendEmail({
      to: email,
      subject: "Free Demo Request Received — North Star Academy",
      html,
    });

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL || "connect@northstaronline.in";
    await sendEmail({
      to: adminEmail,
      subject: `[Free Demo Request] ${name} — ${programInterest || "General"}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Free Demo Request</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p>A new free demo has been requested:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phone || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Interest:</td><td style="padding: 8px 0;">${programInterest || "N/A"}</td></tr>
          </table>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">— The North Star Academy Team</p>
        </div>
      </div>`,
      replyTo: email,
    });

    return NextResponse.json({
      message: "Demo request received! We'll contact you shortly to schedule your session.",
    });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
