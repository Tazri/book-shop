"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import defaultImage from "@/assets/category/fantasy.webp";
import Image from "next/image";

const defaultAllCategory = [
  {
    id: 7,
    name: "Fantasy",
    img: defaultImage.src,
    totalBooks: 12,
  },
];

function CategorySlider({ allCategory = defaultAllCategory }) {
  const displayAllCategory = [...allCategory];

  while (displayAllCategory.length < 8) {
    displayAllCategory.push(...allCategory);
  }

  return (
    <div className="my-7 container mx-auto px-1">
      <div className="flex items-center justify-between py-2 px-1 s550:px-7 text-primary text-xs s220:text-base s550:text-lg shadow-md my-5 duration-150">
        <h1 className="s500:text-lg s240:text-base text-sm duration-200">
          Categories
        </h1>{" "}
        <Link
          href="/category"
          className="bg-primary text-white s500:px-4 s500:py-2 px-2 py-1 s500:text-base   s410:text-sm text-xs duration-200 rounded-sm"
        >
          See All
        </Link>
      </div>
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
            <SwiperSlide key={`${category?.id}${index}`}>
              <CategoryCard category={category} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

function CategoryCard({ category = defaultAllCategory[0] }) {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-1.5">
      <div className="w-16 s320:max-w-24 aspect-square s320:w-full flex justify-center items-center bg-[#f5f6f8] duration-200 rounded-full border border-primary">
        <Image
          width={500}
          height={500}
          src={category?.img ? category.img : defaultImage}
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

export default CategorySlider;
