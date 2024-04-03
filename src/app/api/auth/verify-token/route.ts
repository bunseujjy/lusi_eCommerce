import prisma from "@/lib/db";
import Cryptr from "cryptr";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const payload = await request.json()

    
    const crypter = new Cryptr(process.env.NEXTAUTH_SECRET!);
    const email = crypter.decrypt(payload.email);

    const userToken = await prisma.user.findFirst({
        where: {
            email,
            passwordResetTokenExpiry: {
                gt: new Date()  } 
        }
    })


    if (!userToken) {
        return NextResponse.json({message: "Invalid Token"}, {status: 501})
    }

    return new NextResponse(JSON.stringify(userToken), {status: 200})
}