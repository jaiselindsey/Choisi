import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Contact route hit", {
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

    const { data, error: resendError } = await resend.emails.send({
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

    console.log("Resend data:", data);
    console.log("Resend error:", resendError);

    if (resendError) {
      return Response.json({ error: resendError }, { status: 500 });
    }

    return Response.json(
      { message: "Email sent successfully", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact route error:", error);

    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to submit contact form",
      },
      { status: 500 }
    );
  }
}