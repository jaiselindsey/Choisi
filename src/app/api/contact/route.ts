import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function POST (req: Request) {
    try {
        const body = await req.json()

        if (!body.name || !body.email || !body.phone) {
            return Response.json(
                { error: "Name, email, and phone number are required" },
                { status: 400 }
            )
        }

        const lead = await prisma.lead.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                businessName: body.businessName || null,
                location: body.location || null,
                service: body.service || null,
                message: body.message || null,
            },
        })

        return Response.json(
            {
                message: "Contact submission received",
                lead,
            },
            { status: 201 }
        )
    } catch (error) {
        return Response.json(
            { error: "Failed to submit contact form" },
            { status: 500 }
        )
    }
}

export async function GET () {
    try {
        const contacts = await prisma.lead.findMany({
            orderBy: { createdAt: "desc"},
        })

        return Response.json(contacts)
    } catch(err) {
        return Response.json(
            { err: "Failed to fetch contact submission"},
            { status: 500 }
        )
    }
}