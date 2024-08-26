import offerImage from "@/assets/banner/offer/offer-book-5.webp";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function OfferBanner() {
  return (
    <div className="container mx-auto my-3">
      <Link href="offer" className="block aspect-[295/44]">
        <Image
          src={offerImage}
          width={1000}
          height={1000}
          alt="offer banner"
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  );
}

export default OfferBanner;
