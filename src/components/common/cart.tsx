"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-cart";

import formatCentsToBrl from "@/helpers/money";

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
          <SheetTitle>Seu carrinho</SheetTitle>
        </SheetHeader>
        {cartIsPending && <p>Carregando...</p>}
        {cart?.items.length === 0 && (
          <div className="px-4 mx-auto text-center">
            <p>Seu carrinho está vazio</p>
          </div>
        )}
        {cart?.items.map((item) => (
          <div key={item.id} className="mb-4 flex items-center space-x-4">
            <img
              src={item.productVariant.imageUrl}
              alt={item.productVariant.name}
              className="h-16 w-16 rounded object-cover"
            />
            <div>
              <h3 className="text-lg font-medium">
                {item.productVariant.name}
              </h3>
              <p className="text-sm text-gray-500">
                {item.quantity} x{" "}
                {formatCentsToBrl(item.productVariant.priceInCents)}
              </p>
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
