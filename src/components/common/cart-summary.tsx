import formatCentsToBrl from "@/helpers/money";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";

interface CartSummaryProps {
  totalPriceInCents: number;
}

// Este componente só se preocupa em exibir o resumo. Simples e reutilizável.
export const CartSummary = ({ totalPriceInCents }: CartSummaryProps) => {
  return (
    <div className="flex flex-col gap-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <p className="text-sm">Subtotal</p>
        <p className="text-sm font-medium">
          {formatCentsToBrl(totalPriceInCents)}
        </p>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <p className="text-sm">Entrega</p>
        <p className="text-sm font-medium">GRÁTIS</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between font-bold">
        <p className="text-sm">Total</p>
        <p className="text-sm">
          {formatCentsToBrl(totalPriceInCents)}
        </p>
      </div>

      <Button className="mt-2 rounded-full font-bold ">
        <Link href="/cart/identification">
          Finalizar compra
        </Link>
      </Button>
    </div>
  );
};