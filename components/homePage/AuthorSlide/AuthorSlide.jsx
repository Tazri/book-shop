import Link from "next/link";
import HomeLoadAuthor from "./HomeLoadAuthor";
import { Suspense } from "react";

function AuthorSlide({ authors }) {
  return (
    <div className="my-7 container mx-auto px-1">
      <div className="flex items-center justify-between py-2 px-1 s550:px-7 text-primary text-xs s220:text-base s550:text-lg shadow-md my-5 duration-150">
        <h1 className="s500:text-lg s240:text-base text-sm duration-200">
          Authors
        </h1>{" "}
        <Link
          href="authors"
          className="bg-primary text-white s500:px-4 s500:py-2 px-2 py-1 s500:text-base   s410:text-sm text-xs duration-200 rounded-sm"
        >
          See All
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-center animate-pulse uppercase">
            Author is loading...
          </div>
        }
      >
        <HomeLoadAuthor />
      </Suspense>
    </div>
  );
}

export default AuthorSlide;
