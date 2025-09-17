import { addProductToCart } from "@/actions/add-cart-product";
import { decreaseQuantityToProduct } from "@/actions/decrease-cart-product-quantity";
import { getCart } from "@/actions/get-cart";
import { removeProductToCart } from "@/actions/remove-cart-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseCartMutationsParams {
    cartItemId: string;
    productVariantId: string;
    quantity: number;
}

export const getCartQueryKey = () => ["cart"] as const;

export const useCartMutations = ({ cartItemId, productVariantId, quantity }: UseCartMutationsParams) => {
    const queryClient = useQueryClient();

    const onMutationSuccess = (successMessage: string) => {
        queryClient.invalidateQueries({ queryKey: getCartQueryKey() });
        toast.success(successMessage);
    }

    const onMutationError = (errorMessage: string) => {
        toast.error(errorMessage);
    }

    const { mutate: increaseQuantity } = useMutation({
        mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
        onSuccess: () => onMutationSuccess("Produto adicionado ao carrinho"),
        onError: () => onMutationError("Erro ao adicionar produto ao carrinho"),
    })
    const { mutate: decreaseQuantity } = useMutation({
        mutationFn: () => decreaseQuantityToProduct({cartItemId}),
        onSuccess: () => onMutationSuccess("Quantidade do produto diminuída"),
        onError: () => onMutationError("Erro ao diminuir a quantidade do produto"),
    })

    const { mutate: removeProduct } = useMutation({
        mutationFn: () => removeProductToCart({ cartItemId }),
        onSuccess: () => onMutationSuccess("Produto removido do carrinho"),
        onError: () => onMutationError("Erro ao remover produto do carrinho"),
    })

    const handleDecrease = () => {
        if (quantity > 1) {
            decreaseQuantity();
        } else {
            removeProduct();
        }
    }

    return {
        handleIncrease: increaseQuantity,
        handleDecrease,
        handleRemove: removeProduct
    }

};
