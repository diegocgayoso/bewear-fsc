import { useQuery } from "@tanstack/react-query";
import { getShippingAddresses } from "@/actions/get-shipping-addresses";

export const shippingAddressesQueryKey = ["shippingAddresses"] as const;

export const useShippingAddresses = () => {
  return useQuery({
    queryKey: shippingAddressesQueryKey,
    queryFn: async () => {
      try {
        const addresses = await getShippingAddresses();
        return addresses;
      } catch (error) {
        throw error;
      }
    },
  });
};