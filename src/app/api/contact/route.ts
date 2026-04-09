import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

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
      return Response.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    if (!contactToEmail) {
      return Response.json(
        { error: "CONTACT_TO_EMAIL is not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        businessName: body.businessName || null,
        message: body.message || null,
      },
    });

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
      return Response.json(
        {
          message: "Lead created, but failed to send email notification",
          lead,
          resendError,
        },
        { status: 201 }
      );
    }

    return Response.json(
      {
        message: "Lead created and email notification sent successfully",
        lead,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contacts = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(contacts);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
}