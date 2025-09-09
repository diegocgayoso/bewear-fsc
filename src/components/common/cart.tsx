"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { LoaderCircle, ShoppingBag, ShoppingBasketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";
import { ScrollArea } from "../ui/scroll-area";
import CartItem from "./cart-item";
import { CartSummary } from "./cart-summary"; 
import { useMemo } from "react";

const Cart = () => {
  const { data: cart, isPending: cartIsPending } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  
  const cartItems = useMemo(() => {
    return cart?.items.map(item => ({
      id: item.id,
      productName: item.productVariant.product.name,
      productVariantId: item.productVariant.id,
      productVariantName: item.productVariant.name,
      productVariantImageUrl: item.productVariant.imageUrl,
      productVariantPriceInCents: item.productVariant.priceInCents,
      quantity: item.quantity,
    })) ?? []; 
  }, [cart?.items]);
  
  const hasItems = cartItems.length > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag color="gray" /> Seu carrinho
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col justify-between overflow-hidden p-4">
          {cartIsPending ? (
            <div className="flex h-full items-center justify-center">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : !hasItems ? (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <p className="font-medium">Seu carrinho está vazio.</p>
              <ShoppingBasketIcon size={48} className="text-muted-foreground" />
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 pr-4">
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </ScrollArea>
              <CartSummary totalPriceInCents={cart?.totalPriceInCents ?? 0} />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;