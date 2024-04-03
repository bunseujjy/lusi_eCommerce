
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import cloudinary from "@/lib/cloudinary"
import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, {params}: {params: {id: string}}): Promise<void | NextResponse<any>> {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser || currentUser.role !== 'ADMIN') {	
            return NextResponse.json({message: "Need to be admin"}, {status: 401})
        }

        const product = await prisma.product.findUnique({
            where: {
                id: params.id
            }
        })

        return NextResponse.json({product, message: "Product fetched successfully"}, {status:200})
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch product"}, {status:500})
        
    }
}

export async function PATCH(request: Request, {params}: {params: {id: string}}): Promise<NextResponse<any>> {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser || currentUser.role !== 'ADMIN') {	
            return NextResponse.json({message: "Need to be admin"}, {status: 401})
        }

        const body = await request.json()

        const {
            title,
            description,
            price,
            discount,
            category, 
            inStock,
            images,
        } = body

        const productId = await prisma.product.findUnique({where: {id: params.id}})

        if(images) {
            const imgId = productId?.public_id
            if(imgId) {
                await cloudinary.uploader.destroy(imgId)
            }
        }
            const newImg = await cloudinary.uploader.upload(images, {
                upload_preset: "product",
            })

            if(newImg) {
                const products = await prisma.product.update({
                    where: {
                        id: params.id
                    },
                    data: {
                        title: title as string,
                        description: description as string,
                        price: parseFloat(price),
                        discount: parseFloat(discount),
                        images: newImg.url,
                        public_id: newImg.public_id as string,
                        category: category as string[],
                        inStock: inStock as string,
                    }
                })
                    if(!products) {
                        console.log("Error")
                    }
                return NextResponse.json({message: "Product updated successfully"}, {status: 200})
            }
                return NextResponse.json({message: "Success"})
    } catch (error) {
        return NextResponse.json({message: "Failed to update product"}, {status:500})
    }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}): Promise<NextResponse<any>> {
        const currentUser = await getCurrentUser()

        if(!currentUser || currentUser.role !== 'ADMIN') {	
            return NextResponse.json({message: "Need to be admin"}, {status: 401})
        }

        try {
        const products = await prisma.product.findUnique({where: {id: params.id}})

        const public_id = products?.public_id

        await cloudinary.uploader.destroy(public_id as string)

        const product = await prisma.product.delete({
                where: {
                    id: params.id,
                }
        })
        return NextResponse.json({product, message: "Product deleted successfully"}, {status:204})
        } catch (error) {
            return NextResponse.json({message: "Failed to delete product"}, {status:500})
        }
}
