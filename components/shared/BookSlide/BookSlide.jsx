"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

import "swiper/css";
import { useRef } from "react";
import Link from "next/link";
import BookCard from "@/components/shared/BookCard/BookCard";

function BookSlide({ link, books, title = "Give me title :(" }) {
  const displayedBooks = [...books];

  while (displayedBooks.length < 7) {
    displayedBooks.push(...books);
  }

  const swiperRef = useRef();
  return (
    <div className="my-7 container mx-auto px-1">
      <div className="flex items-center justify-between py-2 px-1 s550:px-7 text-primary text-xs s220:text-base s550:text-lg shadow-md my-5 duration-150">
        <h1>{title}</h1>{" "}
        <div className="s550:text-2xl s220:text-lg text-base text-[#303030] flex gap-1 s550:gap-2 duration-200">
          <button
            className=" opacity-50 hover:opacity-100 duration-150"
            onClick={() => {
              swiperRef.current?.slidePrev();
            }}
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={() => {
              swiperRef.current?.slideNext();
            }}
            className=" opacity-50 hover:opacity-100 duration-150"
          >
            <GrFormNext />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={2}
        loop={true}
        spaceBetween={10}
        breakpoints={{
          1400: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 4,
          },
          690: {
            slidesPerView: 4,
          },
          410: {
            slidesPerView: 3,
          },
        }}
      >
        {displayedBooks?.map((book, index) => {
          return (
            <SwiperSlide key={book?.id + `${index}`} className="h-full ">
              <BookCard book={book} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {link && (
        <Link
          href="#see-more"
          className="mx-auto py-1 px-2 s340:py-2 s340:px-4 rounded-sm my-2 bg-primary-tint-10 hover:bg-primary duration-100 text-white block w-fit text-xs s220:text-base s550:text-lg"
        >
          See More
        </Link>
      )}
    </div>
  );
}

export default BookSlide;
