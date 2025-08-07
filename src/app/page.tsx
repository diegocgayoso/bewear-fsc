import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Image from "next/image";

import { db } from "@/db";
import ProductsList from "@/components/common/products-list";
import PartnerBrands from "@/components/common/partner-brands";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
      category: true,
    },
  });
  console.log(products);

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner01.png"
            alt="Bewear"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      <PartnerBrands />
      <ProductsList title="Mais vendidos" products={products} />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner02.png"
            alt="Bewear"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Home;
