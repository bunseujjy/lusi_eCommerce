import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET({params}: {params: {id: string}}) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: params.id
            }
        })

        if(product) {
            return NextResponse.json({product, message: "Fetch product successfully"}, {status: 200})
        }
        return NextResponse.json({product, message: "Invalid Product"}, {status: 401})
    } catch (error) {
        return NextResponse.json({error})
    }
}