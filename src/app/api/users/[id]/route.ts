import { prisma } from "@/lib/prisma";
import { error } from "console";

type Context = {
    params: { id: string }
}

export async function GET(
    _req: Request,
    { params }: Context
) {
    const { id } = await params
    const user = await prisma.user.findUnique({
        where: { id }
    })

    if (!user) {
        return Response.json(
            { error: "User not found"},
            { status: 404}
        )
    }
    return Response.json(user)
}

export async function PATCH (
    req: Request,
    { params }: Context
) {
   const body = await req.json()

   const { id } = await params

   const user = await prisma.user.update({
    where: { id },
    data: {
        email: body.email,
        name: body.name
    }
   })

   return Response.json(user)
}

export async function DELETE(
    _req: Request,
    { params }: Context 
) {
    await prisma.user.delete({
        where: { id: params.id }
    })
    return Response.json({
        message: "User deleted "
    })
}