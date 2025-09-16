import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getShippingAddressesQueryKey } from "../queries/use-get-shipping-addresses";
import { createShippingAddress } from "@/actions/create-shipping-address";

export const getCreateShippingAddressKey = () => ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getCreateShippingAddressKey(),
    mutationFn: createShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getShippingAddressesQueryKey });
    }
  });
};       
