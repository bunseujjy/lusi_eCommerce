import {  getAllProduct } from "@/app/actions/getAllProduct"
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()
    
    if(!currentUser || currentUser.role !== 'ADMIN') {	
        return NextResponse.json({message: "Need to be admin"}, {status: 401})
    }

    const body = await request.json()

    const {
        title,
        description,
        price,   
        category, 
        inStock,
        images,
        discount,
    } = body

    if(images) {
        const uploadRes = await cloudinary.uploader.upload(images, {
            upload_preset: "product"
        })

        if(uploadRes) {
        const products = await prisma.product.create({
            data: {
                title: title as string,
                description: description as string,
                price: parseFloat(price),
                discount: parseFloat(discount),
                images: uploadRes.url,
                public_id: uploadRes.public_id as string,
                category: category as string[],
                inStock: inStock as string,
            }, 
        })


        return NextResponse.json(products)
        }
    }
}

export async function GET(request: Request) {
    try {
        const product = await getAllProduct()
        return NextResponse.json(product, {status:200})
    } catch (error) {
        return NextResponse.json({message: "Error fetching product"}, {status: 401})
    }
}


