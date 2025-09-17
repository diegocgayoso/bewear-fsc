import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";
import { getCartQueryKey } from "./use-cart";

export const getUpdateCartShippingAddressKey = () => ["update-cart-shipping-address"] as const;

export const useUpdateCartShippingAddress = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUpdateCartShippingAddressKey(),
    mutationFn: updateCartShippingAddress,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getCartQueryKey() });
    },
  });
};