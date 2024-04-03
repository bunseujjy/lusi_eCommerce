import Stripe from "stripe";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const text = await req.body();
    const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
    const signature = headers().get("stripe-signature") ?? "";
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(text, signature, process.env.STRIPE_WEBHOOK_SECRET!);

      if (event?.type === "checkout.session.completed") {
        const metadata = event.data?.object?.metadata;
        const paymentStatus = event.data?.object?.payment_status;
        if (metadata?.orderId && paymentStatus === "paid") {
          const order = await prisma.order.update({
            where: {
              id: metadata.orderId
            },
            data: {
              paid: "paid"
            }
          });
          return NextResponse.json({ order, message: "Order updated successfully" }, { status: 200 });
        }
      }
      return NextResponse.json({ message: "Payment paid successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else {
    console.log("Error")
  }
}
