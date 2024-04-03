import Stripe from "stripe";

export async function getAllCustomer(){
    const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
    const customer = await stripe.checkout.sessions.retrieve("cs_test_b155Pf70THh5xol9drcNqUevltocUWvDdFmFhJopuGvO9UE4HZe8uphqzD", {expand: ['line_items']})

    return customer
}