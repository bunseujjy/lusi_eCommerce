import { getCurrentUser } from "@/app/actions/getCurrentUser"
import prisma from "@/lib/db"
import { Review } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
   try {
    const currentUser = await getCurrentUser()
        if(!currentUser) {
            return NextResponse.json({message: "Invalid User"}, {status: 401})
        }

        const {comment, rating, product, userId} = await request.json()
        const userReview = product?.reviews.find(((review: Review) => {
            return review.userId === currentUser.id
        }))
    
        if(userReview) {
            return NextResponse.json({message: "Failed"}, {status: 500})
        }
        const review = await prisma.review.create({
            data: {
                comment,
                rating: parseFloat(rating),
                productId: product.id,
                userId,
            },include: {product: true}
        })
            return NextResponse.json({review}, {status: 200})
   } catch (error) {
        return NextResponse.json({message : "Need to login to review this product!"},{status: 404})
   }
}