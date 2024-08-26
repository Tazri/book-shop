import Link from "next/link";
import defaultImg from "@/assets/category/history.webp";

function HomeCategory({ allCategory }) {
  return (
    <div className="container mx-auto">
      <div className="px-1 s690:px-0 mx-auto grid-cols-1  s280:grid-cols-2 s580:grid-cols-5 grid gap-4 my-3">
        {allCategory?.map((category) => {
          return (
            <CategoryCard key={category?.id} img={category?.img}>
              {category?.name}
            </CategoryCard>
          );
        })}
      </div>
    </div>
  );
}

function CategoryCard({ children = "Category", img }) {
  return (
    <Link
      href="#category"
      style={{
        background: `linear-gradient(#00000084, #00000084), url("${
          img ? img : defaultImg?.src
        }") center center no-repeat`,
      }}
      className="text-white py-3 bg-black text-center rounded-md group relative overflow-hidden"
    >
      <div className="h-full w-full bg-primary absolute bottom-0 left-0 translate-y-full group-hover:translate-y-0 duration-200"></div>
      <span className="relative">{children}</span>
    </Link>
  );
}

export default HomeCategory;
