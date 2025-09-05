import z from "zod";

export const removeProductToCartSchema = z.object({
    cartItemId: z.string().uuid(),
})

export type RemoveProductToCartSchema = z.infer<typeof removeProductToCartSchema>