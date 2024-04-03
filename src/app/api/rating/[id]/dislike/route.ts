import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) { 
    const currentUser = await getCurrentUser();
    
    if(!currentUser) {
        return NextResponse.json({ message: "Invalid User"}, { status: 404});
    }

    try {    
    const userReview = await prisma.review.findUnique({ 
        where: { 
            id
            : params.id
        } 
    });

    if (!userReview) {            
        return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }
    // Check if the user has already liked the review
    
    const hasLiked = userReview.likedBy.includes(currentUser.id);
    // Check if the user has already liked the review
    
    const hasDisliked = userReview.dislikedBy.includes(currentUser.id);

   // If the user has already liked the review, unlike it
    if(hasLiked) {
        return NextResponse.json({message: "Undo to"}, {status: 500})
    } else if (hasDisliked) {       
    await prisma.review.update({           
        where: { id: params.id },           
        data: {               
            dislike: { decrement: 1},               
            dislikedBy: { set: userReview.dislikedBy.filter(id=>id !== currentUser.id) }           
        }       
    });       
        return NextResponse.json({ message: "You unliked this review"}, { status: 200});   
    }

        
    // Update the review to increase the like count and add the user to dislikedBy array

    const updatedReview = await prisma.review.update({            
        where: { id: params.id },            
        data: {                
            dislike: (userReview.dislike || 0) + 1,                
            dislikedBy: { push: currentUser.id}
        }
    });
        return NextResponse.json({ review: updatedReview, message: "Review liked successfully" }, { status: 200 });    
    } catch (error) {        
        console.error("Error liking review:", error);        
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });    
}}