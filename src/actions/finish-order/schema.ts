import z from "zod";

export const finishOrderSchema = z.object({
    shippingAddressId: z.string().uuid(),
    items: z.array(
        z.object({
            productVariantId: z.string().uuid(),
            quantity: z.number().min(1),
        }),
    ),
});

export type FinishOrderSchema = z.infer<typeof finishOrderSchema>;