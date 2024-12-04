import Image from "next/image";
import defaultImage from "@/assets/category/fantasy.webp";
import { getDemoCategory } from "@/data/demoCategory";

function CategoryDisplay() {
  const demoCategoryList = getDemoCategory();

  return (
    <div className="my-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {demoCategoryList?.map((category, index) => {
          return (
            <CategoryCard
              category={category}
              key={`${index}+${category?.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-1.5 border p-3 cursor-pointer hover:shadow-md duration-150">
      <div className="w-16 s320:max-w-28 aspect-square s320:w-full flex justify-center items-center bg-[#f5f6f8] duration-200 rounded-full border border-primary">
        <Image
          width={500}
          height={500}
          src={category?.img ? category.img : defaultImage}
          alt={category?.name}
          className="h-[95%] w-[95%] object-cover rounded-full"
        />
      </div>

      <div>
        <h3 className="text-primary s280:text-base s250:text-xs text-xs duration-200  leading-5 capitalize">
          {category?.name}
        </h3>
        <p className="text-[#555555] s320:text-base s280:text-sm s250:text-xs text-[0.6rem] whitespace-nowrap">
          {category?.totalBooks} Books
        </p>
      </div>
    </div>
  );
}

export default CategoryDisplay;
