import React from "react";
import defaultImg from "@/assets/category/adventure.webp";
import Image from "next/image";
import Link from "next/link";

function AllCategoryTable({ categories }) {
  if (categories.length <= 0) {
    return (
      <h2 className="text-center text-2xl text-gray-600 py-2 ">Out of Page</h2>
    );
  }

  return (
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="text-left">
        <tr className="">
          <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900 ">
            Name
          </th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
            Total Books
          </th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
            Description
          </th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
            Image
          </th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
            View
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {categories?.map((category) => {
          return <TableRow key={category?._id} category={category} />;
        })}
      </tbody>
    </table>
  );
}

function TableRow({ category }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <tr>
      <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
        {category?.name}
      </td>
      <td className="whitespace-nowrap px-2 py-2 text-gray-700">
        {category?.totalBooks}
      </td>

      <td className="whitespace-nowrap px-2 py-2 text-gray-700">
        <div className="w-full max-w-5xl text-wrap line-clamp-3">
          {category?.description}
        </div>
      </td>

      <td className="py-2 text-gray-700 w-28 min-w-20">
        <Image
          priority={1}
          width={200}
          height={200}
          className="w-20 h-20 object-cover"
          src={category?.imgUrl ? category.imgUrl : defaultImg}
          alt="category-img"
        />
      </td>

      <td className="w-20">
        <Link
          href={baseUrl + `/xyz/admin/allCategory/${category?._id}`}
          className="py-1 px-2 bg-primary text-white mx-auto"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default AllCategoryTable;
