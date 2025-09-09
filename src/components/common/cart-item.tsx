import formatCentsToBrl from "@/helpers/money";
import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { useCartMutations } from "@/hooks/mutations/use-cart";

interface CartItem {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

interface CartItemProps {
  item: CartItem;
}
const CartItem = ({ item }: CartItemProps) => {
  const { handleIncrease, handleDecrease } = useCartMutations({
    cartItemId: item.id,
    productVariantId: item.productVariantId,
    quantity: item.quantity,
  });
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <Image
          src={item.productVariantImageUrl}
          alt={item.productVariantName}
          width={78}
          height={78}
          className="rounded object-cover"
        />
      </div>
      <div className="ml-2 flex flex-col gap-1">
        <p className="text-sm font-semibold">{item.productName}</p>
        <p className="text-muted-foreground text-xs font-medium">
          {item.productVariantName}
        </p>
        <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
          <Button className="h-4 w-4" variant="ghost" onClick={handleDecrease}>
            {item.quantity === 1 ? (
              <Trash color="gray" className="text-destructive" size={16} />
            ) : (
              <MinusIcon size={16} />
            )}
          </Button>
          <p className="font-medium">{item.quantity}</p>
          <Button
            className="h-4 w-4"
            variant="ghost"
            onClick={() => handleIncrease()}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="ml-auto text-right">
        <p className="text-lg font-semibold">
          {formatCentsToBrl(item.productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
