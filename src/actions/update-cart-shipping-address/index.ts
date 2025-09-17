"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { CartTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateCartShippingAddressSchema, UpdateCartShippingAddressSchema } from "./schema";

export const updateCartShippingAddress = async (data: UpdateCartShippingAddressSchema) => {
  // Valida os dados
  updateCartShippingAddressSchema.parse(data);

  // Verifica se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Verifica se o carrinho existe
  const cart = await db.query.CartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where : (shippingAddress, { eq, and}) => and(
        eq(shippingAddress.id, data.shippingAddressId),
        eq(shippingAddress.userId, session.user.id)
    )
  })

  if (!shippingAddress) {
    throw new Error("Shipping address not found");
  }

  // Atualiza o endereço de entrega do carrinho
  await db
    .update(CartTable)
    .set({
      shippingAddressId: data.shippingAddressId,
    })
    .where(eq(CartTable.id, cart.id));
};