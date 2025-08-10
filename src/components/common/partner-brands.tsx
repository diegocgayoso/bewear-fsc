import BrandItem from "./brand-item";

const PartnerBrands = () => {
  const brands = [{
    id: 1,
    name: "Nike",
    imageUrl: "/icon_nike.svg",
  }, {
    id: 2,
    name: "Adidas",
    imageUrl: "/icon_adidas.svg",
  }, {
    id: 3,
    name: "Puma",
    imageUrl: "/icon_puma.svg",
  }, {
    id: 4,
    name: "New Balance",
    imageUrl: "/icon_newbalance.svg",
  },
  {
    id: 5,
    name: "Converse",
    imageUrl: "/icon_converse.svg",
  },
  {
    id: 6,
    name: "Polo",
    imageUrl: "/icon_polo.svg",
  },
  {
    id: 7,
    name: "Zara",
    imageUrl: "/icon_zara.svg",
  },
  
];
  return (
    <div className="space-y-6 mb-8">
      <h3 className="font-semibold px-6">Marcas parceiras</h3>
      <div className="flex w-full gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <BrandItem key={brand.id} {...brand} />
        ))}
      </div>
    </div>
  );
};

export default PartnerBrands;
