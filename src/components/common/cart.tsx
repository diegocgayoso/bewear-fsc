"use client";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ShoppingBasketIcon } from "lucide-react";
const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
};

export default Cart;
