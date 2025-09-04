import formatCentsToBrl from "@/helpers/money";
import Image from "next/image";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";

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
          <Button className="w-4 h-4" variant="ghost" onClick={() => {}}>
            {quantity === 1 ? <Trash color="gray"/> : <MinusIcon />}
          </Button>
          <p className="font-medium">{quantity}</p>
          <Button className="w-4 h-4" variant="ghost" onClick={() => {}}>
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="ml-auto text-right">
        <p className="text-lg font-semibold">
          {formatCentsToBrl(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
