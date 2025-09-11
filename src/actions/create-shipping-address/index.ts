"use server"

import { headers } from "next/headers";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";

import { auth } from "@/lib/auth";
import { createShippingAddressSchema, CreateShippingAddressSchema } from "./schema";

export const createShippingAddress = async (data: CreateShippingAddressSchema) => {

  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const [shippingAddress] = await db.insert(shippingAddressTable).values({
    userId: session.user.id,
    recipientName: data.fullName,
    street: data.street,
    number: data.number,
    complement: data.complement || null,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    neighborhood: data.neighborhood,
    country: "Brasil",
    phone: data.phone,
    email: data.email,
    cpfOrCnpj: data.cpfOrCnpj,
  }).returning();

  return shippingAddress;
}
