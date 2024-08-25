"use client";
import img1 from "@/assets/banner/banner-1.webp";
import img2 from "@/assets/banner/banner-3.webp";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { Autoplay } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

const defaultImages = [img1, img2];

// h-20 s310:h-28 s420:h-32 sm:h-40 md:h-48 lg:h-52

function Banner({ images = defaultImages }) {
  return (
    <div className="container mx-auto my-3 aspect-[127/26] w-full duration-200 px-1">
      <Swiper
        className="h-full w-full relative -z-50"
        slidesPerView={1}
        spaceBetween={10}
        modules={[Autoplay]}
        autoplay={{
          delay: 7000,
        }}
        loop={true}
      >
        {images.map((img, index) => {
          return (
            <SwiperSlide
              key={index + Date.now()}
              className="h-full w-full -z-50"
            >
              <SlideImage img={img} />
            </SwiperSlide>
          );
        })}

        <LeftButton />
        <RightButton />
      </Swiper>
    </div>
  );
}

function LeftButton() {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => {
        swiper.slidePrev();
      }}
      className="text-sm s310:text-xl lg:text-3xl absolute left-[0.1rem] top-1/2 -translate-y-1/2 z-50 text-black opacity-20 hover:opacity-45 duration-150"
    >
      <RiArrowLeftSLine />
    </button>
  );
}

function RightButton() {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => {
        swiper.slideNext();
      }}
      className="text-sm s310:text-xl lg:text-3xl absolute right-[0.1rem] top-1/2 -translate-y-1/2 z-50 text-black opacity-20 hover:opacity-45 duration-150"
    >
      <RiArrowRightSLine />
    </button>
  );
}

function SlideImage({ img }) {
  return (
    <Link href="#offer">
      <Image
        src={img}
        alt="banner image"
        width={2000}
        height={2000}
        priority={3}
        className="w-full h-full object-fill"
      />
    </Link>
  );
}

export default Banner;
