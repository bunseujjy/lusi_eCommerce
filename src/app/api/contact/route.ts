import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { mailOptions, transporter } from "@/app/config/contact";
import ContactForm from "@/app/emails/ContactForm";
import prisma from "@/lib/db";
import { render } from "@react-email/components";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.json({message: "You need to login to contact us"}, {status: 404})
    }

    try {
        const body = await request.json()

        const {message, subject, rating} = body

        await prisma.contact.create({
            data: {
                message,
                subject,
                rating: parseFloat(rating),
                userId: currentUser.id
            }
        })

        const html = render(
            ContactForm({
            params :{
                username: currentUser.name,
                email: currentUser.email,
                subject,
                message,
            }
        }))

        await transporter.sendMail({
            ...mailOptions,
            html,
            subject
            
        })

        return NextResponse.json({
            status: 200,
            message: "Message sent successfully.please check your email.",
            });
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Bad request"}, {status: 500})
    }
}