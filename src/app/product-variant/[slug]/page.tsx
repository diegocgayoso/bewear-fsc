import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/common/header";
import { format } from "path";
import formatCentsToBrl from "@/helpers/money";
import { Button } from "@/components/ui/button";
import ProductsList from "@/components/common/products-list";
import Footer from "@/components/common/footer";
<<<<<<< HEAD
import VariantSelector from "@/app/product/[slug]/components/variant-selector";
=======
>>>>>>> c7183bf43307b805b7149197807688e64cd22dc5

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
<<<<<<< HEAD
      product: {
        with: {
          variants: true,
        },
      },
=======
      product: true,
>>>>>>> c7183bf43307b805b7149197807688e64cd22dc5
    },
  });
  if (!productVariant) return notFound();

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
<<<<<<< HEAD
      category: true,
    },
  });

  if (!likelyProducts)
    return (
      <>
        <p>Nenhum produto encontrado</p>
      </>
    );
=======
    },
  });

  if (!likelyProducts) return (<>
  <p>Nenhum produto encontrado</p>
  </>);
>>>>>>> c7183bf43307b805b7149197807688e64cd22dc5

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        {/* <div className="w-full h-[300px] relative rounded 3xl"></div>
        tira todos os tamanhos e add object-... e fill na Image */}

        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          height={0}
          width={0}
<<<<<<< HEAD
          className="h-auto w-full rounded-3xl p-4"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="px-6">
          <VariantSelector selectedVariantSlug={productVariant.slug} variants={productVariant.product.variants} />
        </div>
=======
          className="h-auto w-full rounded-3xl"
        />
      </div>
      <div className="flex flex-col space-y-6">
        <div className="px-6">{/* Variantes */}</div>

>>>>>>> c7183bf43307b805b7149197807688e64cd22dc5
        <div className="px-6">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBrl(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-6">{/* Qiantidade */}</div>

        <div className="flex flex-col gap-2 px-6">
          <Button variant="outline" className="rounded-full" size="lg">
            Adicionar ao carrinho
          </Button>
          <Button className="rounded-full" size="lg">
            Comprar agora
          </Button>
        </div>
        <div className="px-6">
          {/* Descrição */}
          <p className="text-shadow-amber-600">
            {productVariant.product.description}{" "}
          </p>
        </div>
        <div className="space-y-6">
<<<<<<< HEAD
          <ProductsList title="Mais vendidos" products={likelyProducts} />
=======
            <ProductsList title="Mais vendidos" products={likelyProducts}/>
>>>>>>> c7183bf43307b805b7149197807688e64cd22dc5
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
