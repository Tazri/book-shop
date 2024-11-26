"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import defaultImage from "./../../../assets/authors/Levi_Ackermann.webp";
import Link from "next/link";

function AuthorSwiper({ authors }) {
  if (authors?.length <= 0) {
    return (
      <div className="text-primary text-center text-sm sm:text-base md:text-lg lg:text-xl uppercase">
        There is no author
      </div>
    );
  }
  const displayAuthors = [...authors];

  while (displayAuthors.length < 8) {
    displayAuthors.push(...authors);
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
      {displayAuthors?.map((author, index) => {
        return (
          <SwiperSlide key={author?._id + `${index}`} className="h-full">
            <AuthorCard author={author} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

function AuthorCard({ author }) {
  return (
    <Link
      href={`/authors/${author?._id}`}
      className="flex flex-col justify-center items-center text-center gap-1.5"
    >
      <div className="w-16 s320:max-w-24 aspect-square s320:w-full rounded-full overflow-hidden border border-primary flex justify-center items-center">
        <Image
          width={500}
          height={500}
          src={author?.imgUrl ? author.imgUrl : defaultImage}
          alt="author image"
          priority={1}
          className="h-[95%] w-[95%] object-cover rounded-full"
        />
      </div>

      <div>
        <h3 className="text-primary s320:text-lg s280:text-base s250:text-sm text-xs duration-200 font-semibold leading-5 text-center">
          {author?.name}
        </h3>
        <p className="text-[#555555] s320:text-base s280:text-sm s250:text-xs text-[0.6rem] whitespace-nowrap">
          {author?.totalBooks} Books
        </p>
      </div>
    </Link>
  );
}

export default AuthorSwiper;
