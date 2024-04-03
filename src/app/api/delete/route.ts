import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/db"
import { NextResponse } from "next/server"


export async function DELETE(request: Request, id: string) {
    try {
        const user = await prisma.user.findUnique({where: {id: id}})
        await cloudinary.uploader.destroy(user?.public_id as string)
        const userId = await prisma.user.delete(
            {
                where: {
                    id: user?.id
                }
            })
            console.log(userId)
    } catch (error) {
        return NextResponse.json({message: "Error"}, {status: 500})
    }
}