"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ShoppingBag, ShoppingBasketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";

import formatCentsToBrl from "@/helpers/money";
import CartItem from "./cart-item";

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
        <div className="space-y-4 px-4">
          {cartIsPending && <p>Carregando...</p>}
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
              productVariantPriceInCents={item.productVariant.priceInCents}
              quantity={item.quantity}
            />
            
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
