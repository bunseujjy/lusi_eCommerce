import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
    const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser) {    
            return NextResponse.json({message: "Need to be logged in"}, {status: 404})
        }
        const body = await request.json();

        const { items, email, name, postcode, address, product, phoneNumber, orderID, productId } = body

        const user = await prisma.user.findUnique({where: {email: email}})

        if(!user) {
            return NextResponse.json({message: "Invalid User"}, {status: 404})
        }

        const extractingItems = items.map((item: any) => ({
            quantity: item.qty,
            price_data: {
                currency: "usd",
                unit_amount: Math.floor(item.price * 100),
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.images],
                }
            }
        }));

        // Update product sold quantity
        for (const item of items) {
            try {
                const updatedProduct = await prisma.product.update({
                    where: { id: item.id },
                    data: { sold: { increment: 1 } }, // Using Prisma's increment operator to increment by 1
                });
                console.log(updatedProduct);// Log the updated product
            } catch (updateError) {
                console.error(`Error updating sold quantity for product with id ${item.id}:`, updateError);
                return NextResponse.json({ error: "Error updating sold quantity for product" }, { status: 500 });
            }
        }
        

        const order = await prisma.order.create({
            data: {
                products: extractingItems,
                productId: product?.id,
                userId: user?.id,
                paid: "unpaid",
                name,
                email,
                postcode,
                address,
                phoneNumber,
                orderID,
                category: items.map((item: any) => item.category.join(',')), // Assuming item.category is an array of strings
            },
        });
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: extractingItems,
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
            metadata: {
                orderId: order.id,
                email,
            }
        });
        

        return NextResponse.json({
            message: "Payment success",
            success: true,
            id: session.id,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
