import Image from "next/image";

interface BrandItemProps {
  id: number;
  name: string;
  imageUrl: string;
}
const BrandItem = (brand: BrandItemProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[80px] h-[80px] rounded-2xl border p-4">
        <Image
          src={brand.imageUrl}
          alt="nike"
          width={32}
          height={32}
          className="w-full h-full"
        />
      </div>
      <p className="text-xs">{brand.name}</p>
    </div>
  );
};

export default BrandItem;
