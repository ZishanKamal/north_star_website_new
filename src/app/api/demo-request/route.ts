import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

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

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">Free Demo Request — North Star Academy</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p>Thank you for your interest in a free demo!</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Full Name:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
            ${institutionName ? `<tr><td style="padding: 8px 0; font-weight: bold;">Institution Name:</td><td style="padding: 8px 0;">${institutionName}</td></tr>` : ""}
            ${roleDisplay ? `<tr><td style="padding: 8px 0; font-weight: bold;">Role:</td><td style="padding: 8px 0;">${roleDisplay}</td></tr>` : ""}
            ${programDisplay ? `<tr><td style="padding: 8px 0; font-weight: bold;">Program of Interest:</td><td style="padding: 8px 0;">${programDisplay}</td></tr>` : ""}
          </table>
          <p>Our team will reach out to you shortly to schedule your free demo session.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">— The North Star Academy Team</p>
        </div>
      </div>
    `;

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL || "connect@northstaronline.in";
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Free Demo Request</h1>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
          <p>A new free demo has been requested:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Full Name:</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phone || "N/A"}</td></tr>
            ${institutionName ? `<tr><td style="padding: 8px 0; font-weight: bold;">Institution Name:</td><td style="padding: 8px 0;">${institutionName}</td></tr>` : ""}
            ${roleDisplay ? `<tr><td style="padding: 8px 0; font-weight: bold;">Role:</td><td style="padding: 8px 0;">${roleDisplay}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; font-weight: bold;">Program of Interest:</td><td style="padding: 8px 0;">${programDisplay || "N/A"}</td></tr>
          </table>
          <p style="color: #6b7280; font-size: 14px; margin-top: 16px;">— The North Star Academy Team</p>
        </div>
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
