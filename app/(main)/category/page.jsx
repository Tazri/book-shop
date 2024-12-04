import CategoryDisplay from "@/components/CategoryPage/CategoryDisplay";

function CategoryPage() {
  return (
    <div className="mx-auto container my-2 px-1">
      <h2 className="text-xl font-light text-[#202020]">All Category</h2>

      <CategoryDisplay />
    </div>
  );
}

export default CategoryPage;
