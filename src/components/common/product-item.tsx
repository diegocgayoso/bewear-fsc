"use client";
import { productTable, productVariantTable } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";
import formatCentsToBrl from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

const Product = ({ product, textContainerClassName }: ProductProps) => {
  const firstVariant = product.variants[0];
  return (
    <Link href={`/product-variant/${firstVariant.slug}`} className="flex flex-col gap-4">
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        sizes="100vw"
        height={0}
        width={0}
        className="rounded-3xl h-aut0 w-full"
      />
      <div className={cn("flex max-w-[200px] flex-col gap-1", textContainerClassName)}>
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBrl(firstVariant.priceInCents)}
        </p>
        {/* <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p> */}
      </div>
    </Link>
  );
};

export default Product;
