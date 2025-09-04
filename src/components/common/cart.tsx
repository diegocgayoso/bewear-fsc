"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { LoaderCircle, ShoppingBag, ShoppingBasketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";

import formatCentsToBrl from "@/helpers/money";
import CartItem from "./cart-item";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const Cart = () => {
  const { data: cart, isPending: cartIsPending } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag color="gray" /> Seu carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-1/2 max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col">
                {cartIsPending && <LoaderCircle className="animate-spin" />}
                {cart?.items.length === 0 && (
                  <p className="text-center">Seu carrinho está vazio</p>
                )}
                {cart?.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productVariantName={item.productVariant.name}
                    productName={item.productVariant.product.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          {cart?.items && cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Subtotal</p>
                <p className="text-sm font-medium">
                  {formatCentsToBrl(cart?.totalPriceInCents || 0)}
                </p>
              </div>
              <Separator color="gray" />
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Entrega</p>
                <p className="text-sm font-medium">GRÁTIS</p>
              </div>
              <Separator color="gray" />
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Total</p>
                <p className="text-sm font-medium">
                  {formatCentsToBrl(cart?.totalPriceInCents || 0)}
                </p>
              </div>

              <Button className="rounded-full">Finalizar compra</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
