import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/common/header";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await db.query.productTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      variants: true,
    },
  });
  if (!product) return notFound();

  return (
    <>
      <Header />
      <Image
        src={product.variants[0].imageUrl}
        alt={product.name}
        sizes="100vw"
        height={0}
        width={0}
        style={{ width: "100%", height: "auto" }}
        className="h-aut0 w-full rounded-3xl"
      />
    </>
  );
};

export default ProductPage;
