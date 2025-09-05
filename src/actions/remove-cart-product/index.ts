"use server"

import { auth } from "@/lib/auth";
import { removeProductToCartSchema, RemoveProductToCartSchema } from "./schema"
import { headers } from "next/headers";
import { db } from "@/db";
import { cartItemTable, CartTable } from "@/db/schema";
import { eq } from "drizzle-orm";
export const removeProductToCart = async (data: RemoveProductToCartSchema) => {
    // produto segue o schema
    removeProductToCartSchema.parse(data);
    // verifica se o usuario esta logado
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

    if(cartItem?.cart.userId !== session.user.id){
        throw new Error("Unauthorized--")
    }
    if (!cartItem) {
        throw new Error("Product not found in Cart-")
    }
    // delete item
    await db.delete(cartItemTable).where(
        eq(cartItemTable.id, cartItem.id)
    )
}