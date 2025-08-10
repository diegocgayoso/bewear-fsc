import Image from "next/image";

interface BannerProps {
  title?: string;
  imageUrl: string;
}
const Banner = (props: BannerProps) => {
  return (
    <div className="space-y-6 py-4">
      <div className="px-5">
        <Image
          src={props.imageUrl}
          alt="Bewear"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};

export default Banner;
