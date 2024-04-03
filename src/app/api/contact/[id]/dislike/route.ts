import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) { 
    const currentUser = await getCurrentUser();
    
    if(!currentUser) {
        return NextResponse.json({ message: "Invalid User"}, { status: 401});
    }

    try {    
    const userComment = await prisma.contact.findUnique({ 
        where: { 
            id
            : params.id
        } 
    });

    if (!userComment) {            
        return NextResponse.json({ message: "Customer comment not found" }, { status: 404 });
    }
    // Check if the user has already liked the Customer comment
    
    const hasLiked = userComment.likedBy.includes(currentUser.id);
    // Check if the user has already liked the Customer comment
    
    const hasDisliked = userComment.dislikedBy.includes(currentUser.id);

   // If the user has already liked the Customer comment, unlike it
    if(hasLiked) {
        return NextResponse.json({message: "Undo to"}, {status: 505})
    } else if (hasDisliked) {       
    await prisma.contact.update({           
        where: { id: params.id },           
        data: {               
            dislike: { decrement: 1},               
            dislikedBy: { set: userComment.dislikedBy.filter(id=>id !== currentUser.id) }           
        }       
    });       
        return NextResponse.json({ message: "You unliked this customer comment"}, { status: 201});   
    }

        
    // Update the customer comment to increase the like count and add the user to dislikedBy array

    const updatedComment= await prisma.contact.update({            
        where: { id: params.id },            
        data: {                
            dislike: (userComment.dislike || 0) + 1,                
            dislikedBy: { push: currentUser.id}
        }
    });
        return NextResponse.json({ review: updatedComment, message: "Customer comment liked successfully" }, { status: 200 });    
    } catch (error) {        
        console.error("Error liking customer comment:", error);        
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });    
}}