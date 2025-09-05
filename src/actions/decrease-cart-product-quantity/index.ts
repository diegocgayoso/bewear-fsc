"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { decreaseCartProductQuantitySchema, DecreaseCartProductQuantitySchema } from "./schema";
import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const decreaseQuantityToProduct = async (data: DecreaseCartProductQuantitySchema) => {
    decreaseCartProductQuantitySchema.parse(data);
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session?.user) {
        throw new Error("Unauthorized-")
    }
    // Verifica se o item do carrinho existe
    const cartItem = await db.query.cartItemTable.findFirst({
        where: (cartItem, { eq }) =>
            eq(cartItem.id, data.cartItemId),
        with: { cart: true }
    })

    if (!cartItem) {
        throw new Error("Product not found in Cart-")
    }

    const cartDoesBelongsToUser = cartItem.cart.userId === session.user.id;
    if (!cartDoesBelongsToUser) {
        throw new Error("Unauthorized--")
    }
    if (cartItem.quantity === 1) {
        await db.delete(cartItemTable).where(
            eq(cartItemTable.id, cartItem.id)
        )
        return;
    }
    // diminuir a quantidade do item
    await db.update(cartItemTable).set({
        quantity: cartItem.quantity - 1
    }).where(
        eq(cartItemTable.id, cartItem.id)
    )
}