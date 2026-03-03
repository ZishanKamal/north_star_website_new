import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailHeader, emailFooter } from "@/lib/email";

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

    // Build admin notification email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        ${emailHeader(`New ${enquiryType}`, "linear-gradient(135deg, #3b82f6, #6366f1)")}
        <div style="padding: 24px;">
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
        ${emailFooter()}
      </div>
    `;

    const adminEmail = process.env.ADMIN_EMAIL || "connect@northstaronline.in";

    // Build user acknowledgement email — personalized with inquiry summary
    const replyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        ${emailHeader("Thank You for Reaching Out!", "linear-gradient(135deg, #3b82f6, #6366f1)")}
        <div style="padding: 24px;">
          <p style="margin: 0 0 16px 0; font-size: 15px;">Dear <strong>${name}</strong>,</p>
          <p style="margin: 0 0 16px 0; color: #374151;">We appreciate you contacting North Star Academy${isInstitutional ? " regarding a partnership opportunity" : ""}. Your inquiry has been received and our team is reviewing it.</p>

          <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e40af; font-size: 14px;">Your Inquiry Summary</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              ${isInstitutional && institution ? `<tr><td style="padding: 4px 0; color: #6b7280; width: 130px;">Institution:</td><td style="padding: 4px 0; color: #374151;">${institution}</td></tr>` : ""}
              ${isInstitutional && roleDisplay ? `<tr><td style="padding: 4px 0; color: #6b7280;">Your Role:</td><td style="padding: 4px 0; color: #374151;">${roleDisplay}</td></tr>` : ""}
              ${!isInstitutional && subjectDisplay ? `<tr><td style="padding: 4px 0; color: #6b7280;">Subject:</td><td style="padding: 4px 0; color: #374151;">${subjectDisplay}</td></tr>` : ""}
            </table>
          </div>

          <div style="margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #374151;">What Happens Next?</p>
            <table style="border-collapse: collapse;">
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #3b82f6;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">Our team will review your inquiry carefully</td></tr>
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #3b82f6;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">You can expect a response within <strong>24 hours</strong></td></tr>
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #3b82f6;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">For urgent matters, call us at <strong>+91 9241959311</strong></td></tr>
            </table>
          </div>

          <p style="margin: 16px 0 0 0; color: #6b7280; font-size: 14px;">Warm regards,<br/><strong>The North Star Academy Team</strong></p>
        </div>
        ${emailFooter()}
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
