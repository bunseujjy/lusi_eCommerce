import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(request: Request): Promise<NextResponse<any>> {
    try {
        const body = await request.json()

        const {secure_url,public_id, email} = body

        const userId = await prisma.user.findUnique({where: {email: email}})
        
        const publicId = userId?.public_id

        if(userId?.public_id) {
            await cloudinary.uploader.destroy(publicId as string)
        }

            const user = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    image: secure_url,
                    public_id: public_id,
                }
            })
                if(!user) {
                    return NextResponse.json({message: "Failed to upload profile"}, {status: 500})
                }
                
            return NextResponse.json({message: "Profile avatar updated successfully"}, {status: 200})
                
        } catch (error) {
        return NextResponse.json({message: "Failed to upload profile"}, {status: 500})
    }
}