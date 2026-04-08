import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc"}
        })
        return Response.json(users)
    } catch {
        return Response.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        if(!body.email || typeof body.email !== "string") {
            return Response.json(
                { error: "Email is required" },
                { status: 400 }
            )
        }

        const user = await prisma.user.create({
            data: {
                email: body.email.toLowerCase().trim(),
                name:
                    typeof body.name === "string"
                    ? body.name.trim()
                    : null,
            }
        })
        return Response.json(user, { status: 201})
    } catch (error: any) {
        if(error?.code === "P2002") {
            return Response.json(
                { error: "Email already exist"},
                { status: 409 }
            )
        }
        return Response.json(
            {error: "Failed to create user" },
            { status: 500}
        )
    }
}