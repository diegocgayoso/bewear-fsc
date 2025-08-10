import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Image from "next/image";

import { db } from "@/db";
import ProductsList from "@/components/common/products-list";
import PartnerBrands from "@/components/common/partner-brands";
import Banner from "@/components/common/banner";
import CategoryList from "@/components/common/category-list";

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
      <Banner imageUrl="/banner01.png" />
      <PartnerBrands />
      <ProductsList title="Mais vendidos" products={products} />
      <CategoryList />
      <Banner imageUrl="/banner02.png" />
      <Footer />
    </>
  );
};
export default Home;
