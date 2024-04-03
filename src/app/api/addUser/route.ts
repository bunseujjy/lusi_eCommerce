import { getCurrentUser } from "@/app/actions/getCurrentUser"
import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import * as z from "zod"

const userSchma = z.object({
    name: z.string().min(3, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    image: z.any(),
    role: z.any(),
    public_id: z.any()
})


export async function POST(request: Request) {
    
    const currentUser = await getCurrentUser()
    
    if(!currentUser || currentUser.role !== 'ADMIN') {	
        return NextResponse.json({message: "Need to be admin"}, {status: 401})
    }

    const body = await request.json()

    const {email, name, password, image, role} = userSchma.parse(body)

    if(image) {
        const uploadProfile = await cloudinary.uploader.upload(image, {
            upload_preset: "profileupload"
        })

        const hashedPassword = await bcrypt.hash(password, 12)

        if(uploadProfile) {
            const createUser = await prisma.user.create({
                data: {
                    email: email as string,
                    name: name as string,
                    hashedPassword,
                    image: uploadProfile.secure_url,
                    role: role,
                    public_id: uploadProfile.public_id
                }
            })
            return NextResponse.json(createUser)
        }
    }
}