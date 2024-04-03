import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, {params} : {params : {id: string}}) {
    const body = await request.json()

    const {comment, rating} = body
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.json({message: "Invalid User"}, {status: 401})
    }

    const userReview = await prisma.review.findUnique({where: {id: params.id}})

    if(currentUser.id !== userReview?.userId) {
        return NextResponse.json({message: "You're not owner of this review!"}, {status: 404})
    }

    const review = await prisma.review.update({
        where: {
            id: params.id
        },
        data: {
            rating: rating,
            comment: comment
        }
    })
    return NextResponse.json({review, message: "Review edited successfully"}, {status: 200},)
}

export async function DELETE(request: Request,{params} : {params: {id: string}}) {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.json({message: "Invalid User"}, {status: 401})
    }

    const userReview = await prisma.review.findUnique({where: {id: params.id}})

    if(currentUser.id !== userReview?.userId) {
        return NextResponse.json({message: "You're not owner of this review!"}, {status: 404})
    }

    const review = await prisma.review.delete({
        where: {
            id: params.id
        }
    })

    return NextResponse.json({review, message: "Review deleted successfully"}, {status: 200})
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return NextResponse.json({ message: "Invalid User" }, { status: 401 });
    }

    try {    
        const userReview = await prisma.review.findUnique({
            where: {
                id: params.id
            }
        });

        if (!userReview) {
            return NextResponse.json({ message: "Review not found" }, { status: 404 });
        }
       
        // Check if the user has already liked or disliked the review
        const hasLiked = userReview.likedBy.includes(currentUser.id);
        const hasDisliked = userReview.dislikedBy.includes(currentUser.id);

        // If the user has already disliked the review, undo it
        if (hasDisliked) {
            await prisma.review.update({
                where: { id: params.id },           
                data: {               
                    dislike: { increment: -1 },
                    dislikedBy: { set: userReview.dislikedBy.filter(id => id !== currentUser.id) }           
                }
            }); 
            return NextResponse.json({ message: "You un-disliked this review" }, { status: 201 });   
        } else if (hasLiked) {
            // If the user has already liked the review, unlike it
            await prisma.review.update({
                where: { id: params.id },           
                data: {               
                    like: { decrement: 1 },
                    likedBy: { set: userReview.likedBy.filter(id => id !== currentUser.id) }           
                }
            }); 
            return NextResponse.json({ message: "You unliked this review" }, { status: 201 });   
        }

        // Update the review to increase the like count and add the user to likedBy array
        const updatedReview = await prisma.review.update({        
            where: { id: params.id },
            data: {
                like: (userReview.like || 0) + 1,
                likedBy: { push: currentUser.id }
            }
        });
        
        return NextResponse.json({ review: updatedReview, message: "Review liked successfully" }, { status: 200 });    
    } catch (error) {
        console.error("Error liking review:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
