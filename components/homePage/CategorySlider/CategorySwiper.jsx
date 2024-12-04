"use client";
import Image from "next/image";
import defaultImage from "@/assets/category/fantasy.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const defaultAllCategory = [
  {
    id: 7,
    name: "Fantasy",
    img: defaultImage.src,
    totalBooks: 12,
  },
];

function CategorySwiper({ displayAllCategory }) {
  if (displayAllCategory.length <= 0) {
    return (
      <h3 className="my-3 text-base s320:text-lg  s410:text-xl text-gray-600  uppercase duration-150 select-none">
        Category is loading...
      </h3>
    );
  }

  if (displayAllCategory.length < 7) {
    while (displayAllCategory.length < 7) {
      displayAllCategory.push(...displayAllCategory);
    }
  }

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
      }}
      slidesPerView={2}
      loop={true}
      spaceBetween={10}
      breakpoints={{
        1400: {
          slidesPerView: 7,
        },
        1024: {
          spaceBetween: 20,
          slidesPerView: 6,
        },
        768: {
          slidesPerView: 5,
        },
        650: {
          slidesPerView: 4,
        },
        500: {
          slidesPerView: 3,
        },
      }}
    >
      {displayAllCategory?.map((category, index) => {
        return (
          <SwiperSlide key={`${category?._id}${index}`}>
            <CategoryCard category={category} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

function CategoryCard({ category = defaultAllCategory[0] }) {
  const imgUrl = category?.imgUrl ? category?.imgUrl : defaultImage;

  return (
    <div className="flex flex-col justify-center items-center text-center gap-1.5">
      <div className="w-16 s320:max-w-24 aspect-square s320:w-full flex justify-center items-center bg-[#f5f6f8] duration-200 rounded-full border border-primary">
        <Image
          width={500}
          height={500}
          src={imgUrl}
          alt={category?.name}
          className="h-[95%] w-[95%] object-cover rounded-full"
        />
      </div>

      <div>
        <h3 className="text-primary s280:text-base s250:text-xs text-xs duration-200 font-semibold leading-5 capitalize">
          {category?.name}
        </h3>
        <p className="text-[#555555] s320:text-base s280:text-sm s250:text-xs text-[0.6rem] whitespace-nowrap">
          {category?.totalBooks} Books
        </p>
      </div>
    </div>
  );
}

export default CategorySwiper;
