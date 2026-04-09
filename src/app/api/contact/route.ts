import { prisma } from "@/lib/prisma";
import test from "node:test";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Contact route hit", {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasToEmail: !!process.env.CONTACT_TO_EMAIL,
      hasFromEmail: !!process.env.CONTACT_FROM_EMAIL,
    });

    if (!body.name || !body.email || !body.phone) {
      return Response.json(
        { error: "Name, email, and phone number are required" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail =
      process.env.CONTACT_FROM_EMAIL || "Choisi <onboarding@resend.dev>";

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is missing");
    }

    if (!contactToEmail) {
      throw new Error("CONTACT_TO_EMAIL is missing");
    }

    const resend = new Resend(resendApiKey);
/*
    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        businessName: body.businessName || null,
        message: body.message || null,
      },
    });
*/
    const lead = { test: true}
    const { error: resendError } = await resend.emails.send({
      from: contactFromEmail,
      to: [contactToEmail],
      subject: `New Choisi inquiry from ${body.name}`,
      html: `
        <h2>New Choisi inquiry</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Business:</strong> ${body.businessName || "N/A"}</p>
        <p><strong>Message:</strong> ${body.message || "N/A"}</p>
      `,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return Response.json(
        { message: "Lead saved, but email failed", lead, resendError },
        { status: 201 }
      );
    }

    return Response.json(
      { message: "Lead created and email sent", lead },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact route error:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to submit contact form",
      },
      { status: 500 }
    );
  }
}