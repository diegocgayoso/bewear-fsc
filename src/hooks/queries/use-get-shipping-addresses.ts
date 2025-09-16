import { useQuery } from "@tanstack/react-query";
import { getUserAddresses } from "@/actions/get-user-addresses";

export const getShippingAddressesQueryKey = ["get-shipping-addresses"] as const;

export const useShippingAddresses = () => {
  return useQuery({
    queryKey: getShippingAddressesQueryKey,
    queryFn: async () => {
      try {
        const addresses = await getUserAddresses();
        return addresses;
      } catch (error) {
        throw error;
      }
    },
  });
};