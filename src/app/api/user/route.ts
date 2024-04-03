import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod"
import bcrypt from "bcrypt";

const userSchma = z.object({
    name: z.string().min(3, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
      image: z.any(),
})

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const {email, name, password, image} = userSchma.parse(body)
    
        const findUserByUsernameAndEmail = await prisma.user.findUnique({
            where: {
                email,
            }
        })
    
        if(findUserByUsernameAndEmail) {
            return NextResponse.json({user: null, message: "Username or Email already exists"}, {status: 401})
        }
    
        const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = await prisma.user.create({
                data: {
                    email,
                    name,
                    hashedPassword,
                    image: image
                }
            })
                const {hashedPassword: newUserPassword, ...rest} = newUser
                return NextResponse.json({user: rest, message: "User created successfully"}, {status: 200})

    }catch (err) {
        return NextResponse.json({message: "Failed to create user"}, {status: 500})
    }
}