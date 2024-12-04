import Link from "next/link";
import defaultImage from "@/assets/category/fantasy.webp";
import { Suspense } from "react";
import LoadHomePageCategory from "./LoadHomePageCategory";
import HomepageCategorySliderLoading from "./HomepageCategorySliderLoading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

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

      <ErrorBoundary
        fallback={
          <h3 className="my-3 text-base s320:text-lg  s410:text-xl text-red-400 uppercase duration-150 select-none text-center">
            Failed to load.
          </h3>
        }
      >
        <Suspense fallback={<HomepageCategorySliderLoading />}>
          <LoadHomePageCategory />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default CategorySlider;
