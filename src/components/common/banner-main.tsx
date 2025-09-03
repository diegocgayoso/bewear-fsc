"use client";
import Image from "next/image";
import { Anton } from "next/font/google";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

const BannerMain = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="container mx-auto space-y-6 p-5">
      <div className="relative m-auto h-[75vh] w-full rounded-2xl bg-[url(/banner-main-bg-mobile.png)] bg-contain bg-no-repeat py-24 md:bg-[url(/banner-main-bg.png)] md:bg-cover md:bg-no-repeat">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index} className="flex items-center justify-center">
                <div className="relative h-[57vh] w-full">
                  <Image
                    src={`/man-banner0${index + 1}.svg`}
                    alt={`Banner Main ${index + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="z-10"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 z-20" />
          <CarouselNext className="right-2 z-20" />
        </Carousel>

        {/* <div className="mx-auto mt-4 w-3/4 text-center md:hidden">
          <p className="font-thin text-white uppercase">
            Leve uma <br />
            <span className={`${anton.className} text-6xl font-bold`}>
              vida com estilo
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default BannerMain;