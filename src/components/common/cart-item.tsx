import formatCentsToBrl from "@/helpers/money";
import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProductToCart } from "@/actions/remove-cart-product";
import { toast } from "sonner";
import { decreaseQuantityToProduct } from "@/actions/decrease-cart-product-quantity";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}
const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const queryClient = useQueryClient();
  const removeProductFromCartMutation = useMutation({
    mutationKey: ["remove-product-cart"],
    mutationFn: () => removeProductToCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const decreaseProductQuantityMutation = useMutation({
    mutationKey: ["decrease-product-quantity"],
    mutationFn: () => decreaseQuantityToProduct({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleRemoveProduct = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho");
      },
    });
  };

  const handleDecreaseQuantity = () => {
    decreaseProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto atualizada");
      },
      onError: () => {
        toast.error("Erro ao atualizar quantidade do produto");
      },
    });
  };
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded object-cover"
        />
      </div>
      <div className="ml-2 flex flex-col gap-1">
        <p className="text-sm font-semibold">{productName}</p>
        <p className="text-muted-foreground text-xs font-medium">
          {productVariantName}
        </p>
        <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
          {quantity === 1 ? (
            <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleRemoveProduct}
            >
              <Trash color="gray" size={16} />
            </Button>
          ) : (
              <Button
              className="h-4 w-4"
              variant="ghost"
              onClick={handleDecreaseQuantity}
            >
              <MinusIcon />
            </Button>
          )}
          <p className="font-medium">{quantity}</p>
          <Button className="h-4 w-4" variant="ghost" onClick={() => {}}>
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="ml-auto text-right">
        {/* <Trash color="gray" size={16} onClick={handleRemoveProduct} /> */}
        <p className="text-lg font-semibold">
          {formatCentsToBrl(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
