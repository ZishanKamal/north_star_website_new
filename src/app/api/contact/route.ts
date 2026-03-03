import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, institution, role, subject, message, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const isInstitutional = type === "institutional";
    const enquiryType = isInstitutional ? "Institutional Partnership" : "Individual Inquiry";

    // Map raw select values to human-readable labels (matching the UI)
    const roleLabels: Record<string, string> = {
      principal: "Principal",
      dean: "Dean / HOD",
      faculty: "Faculty",
      placement: "Placement Officer",
      management: "Management",
      other: "Other",
    };
    const subjectLabels: Record<string, string> = {
      enrollment: "Program Enrollment",
      counselling: "Career Counselling",
      demo: "Free Demo",
      certificate: "Certificate Validation",
      other: "Other",
    };
    const roleDisplay = role ? (roleLabels[role] || role) : "";
    const subjectDisplay = subject ? (subjectLabels[subject] || subject) : "";

    // Build email HTML
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #6366f1); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New ${enquiryType} — North Star Academy</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Full Name:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
            ${isInstitutional && institution ? `<tr><td style="padding: 8px 0; font-weight: bold;">Institution Name:</td><td style="padding: 8px 0;">${institution}</td></tr>` : ""}
            ${isInstitutional && roleDisplay ? `<tr><td style="padding: 8px 0; font-weight: bold;">Role:</td><td style="padding: 8px 0;">${roleDisplay}</td></tr>` : ""}
            ${!isInstitutional && subjectDisplay ? `<tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">${subjectDisplay}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="font-weight: bold; margin: 0 0 8px 0;">Message:</p>
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `;

    const adminEmail = process.env.ADMIN_EMAIL || "connect@northstaronline.in";

    const replyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #6366f1); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Thank You, ${name}!</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p>Thank you for reaching out to North Star Academy. We've received your ${isInstitutional ? "partnership inquiry" : "inquiry"} and will get back to you within 24 hours.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">— The North Star Academy Team</p>
        </div>
      </div>
    `;

    // Send both emails in parallel instead of sequentially
    await Promise.allSettled([
      sendEmail({
        to: adminEmail,
        subject: `[${enquiryType}] New inquiry from ${name}`,
        html,
        replyTo: email,
      }),
      sendEmail({
        to: email,
        subject: "Thank you for contacting North Star Academy",
        html: replyHtml,
      }),
    ]);

    return NextResponse.json({
      message: "Your message has been sent successfully. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
