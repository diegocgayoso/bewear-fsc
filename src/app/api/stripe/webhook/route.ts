import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: Request) => {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) { return NextResponse.error(); }

    const sig = req.headers.get("stripe-signature");
    if (!sig) { return NextResponse.error(); }

    const text = await req.text();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const event = stripe.webhooks.constructEvent(
        text,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
    );
    if (event.type === "checkout.session.completed") {
        console.log("Checkout session completed");
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        if (!orderId) { return NextResponse.error(); }
        await db.update(orderTable).set({
            status: "PAID",
        }).where(eq(orderTable.id, orderId));
    }
    return NextResponse.json({ received: true });
}