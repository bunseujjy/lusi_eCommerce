import prisma from "@/lib/db";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    try {

        const body = await request.json()

        const {email, password} = body

        const hashedPassword = await bcrypt.hash(password, 12)
        

    // check if username is existed and update password
        const findUserAndUpdate = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                 hashedPassword,
            }
        });

        if(!findUserAndUpdate) {
            return NextResponse.json({message: "User not existed"}, {status: 404})
        }
        
        return NextResponse.json({user: findUserAndUpdate, message: "User updated successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Failed to update user"}, {status: 404})
    }
}