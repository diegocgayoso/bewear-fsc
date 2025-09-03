"use client";
import Image from "next/image";
import { Anton } from "next/font/google";

import React from "react";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const BannerMain = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container mx-auto space-y-6 p-5">
      <div className="relative h-auto w-full">
        <Image
          src="/banner-main-bg-mobile.png"
          width={365}
          height={460}
          alt="Banner Leve a vida com estilo"
          className="mx-auto md:hidden"
        />
        <Image
          src="/banner-main-bg.png"
          alt="Bewear"
          width={0}
          height={0}
          sizes="100vw"
          className="hidden h-auto w-full md:block"
        />

        <Image
          src={`/man-banner0${index + 1}.svg`}
          alt={`Banner Main ${index + 1}`}
          width={0}
          height={0}
          sizes="100vw"
          className="absolute bottom-0 z-10 h-[75vh] md:h-auto w-full"
        />
      </div>
    </div>
  );
};

export default BannerMain;
