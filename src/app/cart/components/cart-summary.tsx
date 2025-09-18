import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import formatCentsToBrl from "@/helpers/money";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    priceInCents: number;
    quantity: number;
    imageUrl: string;
  }>;
}
const CartSummary = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBrl(subtotalInCents)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Frete</p>
          <p className="text-muted-foreground text-sm font-medium">GRÁTIS</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Total</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBrl(totalInCents)}
          </p>
        </div>

        <Separator />
        {products.map((product) => (
          <div
            className="flex items-center justify-between pb-4"
            key={product.id}
          >
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl}
                alt={product.variantName}
                width={78}
                height={78}
                className="rounded object-cover"
              />
            </div>
            <div className="ml-2 flex flex-col gap-1">
              <p className="text-sm font-semibold">{product.name}</p>
              <p className="text-muted-foreground text-xs font-medium">
                {product.variantName}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-lg font-semibold">
                {formatCentsToBrl(product.priceInCents)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CartSummary;
