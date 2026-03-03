import { NextRequest, NextResponse } from "next/server";
import { sendEmail, emailHeader, emailFooter } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, institutionName, role, programInterest } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 400 }
      );
    }

    // Map raw select values to human-readable labels (matching the UI)
    const roleLabels: Record<string, string> = {
      principal: "Principal",
      dean: "Dean / HOD",
      faculty: "Faculty",
      placement: "Placement Officer",
      management: "Management",
    };
    const roleDisplay = role ? (roleLabels[role] || role) : "";

    const programLabels: Record<string, string> = {
      "institutional-general": "Institutional Programs in General",
      "college-programs": "College Programs",
      "school-programs": "School Programs",
      "empower": "Empower - Emotional Agility",
      "neurolift": "NeuroLift - Cognitive Readiness through Power Skills",
      "catalyst": "Catalyst - Job Readiness Program",
      "techorbit": "TechOrbit - Creation of Digital Eco System",
      "stemgrid": "STEMGRID - Creation and Support in STEM Lab",
      "futurefit": "FutureFit - Psychometry based Personalized Career Counselling",
      "proforge": "ProForge - Internships and Projects",
      "complimentary": "Complimentary Programs",
    };
    const programDisplay = programInterest ? (programLabels[programInterest] || programInterest) : "";

    // Build user confirmation email — personalized with request details
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        ${emailHeader("Your Free Demo Request is Confirmed!", "linear-gradient(135deg, #10b981, #059669)")}
        <div style="padding: 24px;">
          <p style="margin: 0 0 16px 0; font-size: 15px;">Dear <strong>${name}</strong>,</p>
          <p style="margin: 0 0 16px 0; color: #374151;">Thank you for your interest in ${programDisplay ? `<strong>${programDisplay}</strong>` : "our programs"}! We're excited to give you a first-hand look at how North Star Academy can make a difference.</p>

          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
            <p style="margin: 0 0 8px 0; font-weight: 600; color: #065f46; font-size: 14px;">Your Request Details</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              ${programDisplay ? `<tr><td style="padding: 4px 0; color: #6b7280; width: 130px;">Program:</td><td style="padding: 4px 0; color: #374151;">${programDisplay}</td></tr>` : ""}
              ${institutionName ? `<tr><td style="padding: 4px 0; color: #6b7280;">Institution:</td><td style="padding: 4px 0; color: #374151;">${institutionName}</td></tr>` : ""}
              ${roleDisplay ? `<tr><td style="padding: 4px 0; color: #6b7280;">Your Role:</td><td style="padding: 4px 0; color: #374151;">${roleDisplay}</td></tr>` : ""}
            </table>
          </div>

          <div style="margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #374151;">What Happens Next?</p>
            <table style="border-collapse: collapse;">
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #10b981;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">Our team will reach out within <strong>24 hours</strong> to schedule your demo</td></tr>
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #10b981;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">The demo typically lasts <strong>30–45 minutes</strong></td></tr>
              <tr><td style="padding: 4px 8px 4px 0; vertical-align: top; color: #10b981;">&#10003;</td><td style="padding: 4px 0; color: #4b5563; font-size: 14px;">Feel free to prepare any questions you'd like to discuss</td></tr>
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
        ${emailHeader("New Free Demo Request", "linear-gradient(135deg, #10b981, #059669)")}
        <div style="padding: 24px;">
          <p>A new free demo has been requested:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Full Name:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phone || "N/A"}</td></tr>
            ${institutionName ? `<tr><td style="padding: 8px 0; font-weight: bold;">Institution Name:</td><td style="padding: 8px 0;">${institutionName}</td></tr>` : ""}
            ${roleDisplay ? `<tr><td style="padding: 8px 0; font-weight: bold;">Role:</td><td style="padding: 8px 0;">${roleDisplay}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; font-weight: bold;">Program of Interest:</td><td style="padding: 8px 0;">${programDisplay || "N/A"}</td></tr>
          </table>
        </div>
        ${emailFooter()}
      </div>`;

    // Send both emails in parallel instead of sequentially
    await Promise.allSettled([
      sendEmail({
        to: email,
        subject: "Free Demo Request Received — North Star Academy",
        html,
      }),
      sendEmail({
        to: adminEmail,
        subject: `[Free Demo Request] ${name} — ${programDisplay || "General"}`,
        html: adminHtml,
        replyTo: email,
      }),
    ]);

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
