import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {id: string}}): Promise<NextResponse<any>> {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: params.id
            }
        })

        if(product) {
            return NextResponse.json({product, message: "Fetch product successfully"}, {status: 200})
        }
        return NextResponse.json({product, message: "Invalid Product"}, {status: 404})
    } catch (error) {
        return NextResponse.json({error})
    }
}