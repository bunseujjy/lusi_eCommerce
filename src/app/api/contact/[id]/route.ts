import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
    const user = await getCurrentUser()

    if(!user) {
        return NextResponse.json({message: "You need to login to edit this comment"}, {status: 400})
    }

    try {
        const {message, subject, rating} = await request.json()

        const contact = await prisma.contact.update({
            where: {
                id: params.id
            },
            data: {
                message,
                subject,
                rating: parseFloat(rating)
            }
        })

        if(contact) {
            return NextResponse.json({message: "Contact updated successfully"}, {status: 200})
        }
    } catch (error) {
        return NextResponse.json({message: "Bad request"}, {status: 404})
    }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    try {
        const userID = await prisma.contact.findUnique({where: {id: params.id}})
        const user = await getCurrentUser()
    
        if(user?.id !== userID?.userId) {
            return NextResponse.json({message: "You're not owner of this comment"}, {status: 400})
        }
    
    const contact = await prisma.contact.delete({where: {id: params.id}})

    if(contact) {
        return NextResponse.json({message: "Contact deleted successfully"}, {status: 200})
    }
    } catch (error) {
        return NextResponse.json({message: "Bad request"}, {status: 404})
    }
}

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
   
    // Check if the user has already liked the customer comment
    
    const hasLiked = userComment.likedBy.includes(currentUser. id);
    // Check if the user has already liked the customer comment
    
    const hasDisliked = userComment.dislikedBy.includes(currentUser. id);

   // If the user has already liked the customer comment, unlike it
    if(hasDisliked) {
        return NextResponse.json({message: "Undo to disliked"}, {status: 505})
    } else if(hasLiked) {       
    await prisma.contact.update({
        where: { id: params.id },           
        data: {               
            like: { decrement: 1},
            likedBy: { set: userComment.likedBy.filter(id=>id !== currentUser.id) }           
        }
    }); 
        return NextResponse.json({ message: "You unliked this review"}, { status: 201});   
    }

    // Update the contact to increase the like count and add the user to likedBy array

    const updatedComment = await prisma.contact.update({        
        where: { id: params.id },
        data: {
            like: (userComment.like || 0) + 1,
            likedBy: { push: currentUser.id}
        }
    });
        return NextResponse.json({ review: updatedComment, message: "Customer comment liked successfully" }, { status: 200 });    
    } catch (error) {
        console.error("Error liking customer comment:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const contact = await prisma.contact.findUnique({where: {id: params.id}})
        return contact
    } catch (error) {
        return NextResponse.json({message: "Bad request"}, {status: 500})
    }
}