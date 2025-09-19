import { finishOrder } from "@/actions/finish-order"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getUserCartQueryKey } from "../queries/use-cart"

export const getUseFinishOrderMutationKey = () => ['finish-order']

export const useFinishOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: getUseFinishOrderMutationKey(),
        mutationFn: async () => {
            return await finishOrder();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getUserCartQueryKey() })
        }
    })
}