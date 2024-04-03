import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request,{params}: {params: {id: string}}): Promise<void | NextResponse<any>>  {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser || currentUser.role !== 'ADMIN') {	
            return NextResponse.json({message: "Need to be admin"}, {status: 401})
        }

        const order = await prisma.order.findUnique({
            where: {
                id: params.id
            }
        })

        if(order) {
            return NextResponse.json({order, message: "Fetch order successfully"}, {status: 200})
        }
        return NextResponse.json({order, message: "Invalid order details"}, {status: 404})
    } catch (error) {
        return NextResponse.json({error})
    }
}

export async function DELETE(request: Request, {params} : {params: {id: string}}): Promise<NextResponse<any>> {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser || currentUser.role !== 'ADMIN') {	
            return NextResponse.json({message: "Need to be admin"}, {status: 401})
        }

        const order = await prisma.order.delete({
            where: {
                id: params.id
            }
        })

        if(order) {
            return NextResponse.json({order, message: "Deleted successfully"}, {status: 200})
        }
        return NextResponse.json({order, message: "Deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Bad request"}, {status: 500})
    }
}