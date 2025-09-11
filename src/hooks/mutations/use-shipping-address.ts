import { useMutation } from "@tanstack/react-query";

import { createShippingAddress } from "@/actions/create-shipping-address";
import { toast } from "sonner";


export const getCreateShippingAddressKey = () => ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  return useMutation({
    mutationKey: getCreateShippingAddressKey(),
    mutationFn: createShippingAddress,
  });
};
