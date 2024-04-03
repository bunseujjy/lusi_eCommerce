import { getCurrentUser } from "@/app/actions/getCurrentUser"
import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, {params} : {params: {id: string}}) {
    const currentUser = await getCurrentUser()
    
    if(!currentUser || currentUser.role !== 'ADMIN') {	
        return NextResponse.json({message: "Need to be admin"}, {status: 401})
    }

    try {
    const body = await request.json()

    const {email, name, password, image, role} = body

    if(image) {
        const userId = await prisma.user.findUnique({where: {id: params.id}})
        const imgId = userId?.public_id
        if(imgId) {
            await cloudinary.uploader.destroy(imgId as string)
        }
    }
        const updateImg = await cloudinary.uploader.upload(image, {
            upload_preset: "profileupload"
        })
    
        if(updateImg) {
            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await prisma.user.update({
                where: {
                    id: params.id
                },
                data: {
                    name,
                    email,
                    hashedPassword,
                    image: updateImg.secure_url,
                    public_id: updateImg.public_id,
                    role
                }
            })
            return NextResponse.json({user,message: "User updated successfully"}, {status: 200})
        }
    } catch (error) {
        return NextResponse.json({message: "Error updating"}, {status: 500})
    }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    const currentUser = await getCurrentUser()
    
    if(!currentUser || currentUser.role !== 'ADMIN') {	
        return NextResponse.json({message: "Need to be admin"}, {status: 401})
    }

    try {
        const userId = await prisma.user.findUnique({where: {id: params.id}})
        const imgId = userId?.public_id
        if(imgId) {
            await cloudinary.uploader.destroy(imgId as string)
        }
        const user = await prisma.user.delete({where: {id: params.id}})

        return NextResponse.json({user, message: "User deleted"}, {status: 200})
    } catch (error) {   
        return NextResponse.json({message: "Failed deleted user"}, {status: 500})
    }
}