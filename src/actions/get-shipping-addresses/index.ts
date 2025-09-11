"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getShippingAddresses = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const shippingAddresses = await db
    .select()
    .from(shippingAddressTable)
    .where(eq(shippingAddressTable.userId, session.user.id));

  return shippingAddresses;
};