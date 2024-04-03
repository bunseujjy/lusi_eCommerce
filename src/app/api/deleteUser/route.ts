import prisma from "@/lib/db";
import { NextResponse } from "next/server";



export async function DELETE(request: Request): Promise<NextResponse<any>>  {
    try {

        const body = await request.json()

        const {id} = body
        

    // check if username is existed and delete it
        const existingUser = await prisma.user.delete({
            where: {
                id: id
            },
        });

        if(!existingUser) {
            return NextResponse.json({message: "Failed to delete user"}, {status: 404})
        }
        
        return NextResponse.json({user: existingUser, message: "User deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to delete user"}, {status: 404})
    }
}