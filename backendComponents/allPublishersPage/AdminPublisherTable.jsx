import Image from "next/image";
import Link from "next/link";
import React from "react";
import defaultImg from "./../../assets/publisher/dimik.png";

function AdminPublisherTable({ allPublishers }) {
  return (
    <div className="overflow-x-scroll max-h-96 overflow-y-auto">
      <table className="min-w-full bg-white text-sm">
        <thead className="text-left">
          <tr className="border-b-2">
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

        <tbody className="">
          {allPublishers?.map((publisher, index) => {
            return (
              <TableRow
                key={`${publisher?._id}-${index}`}
                publisher={publisher}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ publisher }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <tr className="border-y">
      <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">
        {publisher?.name}
      </td>
      <td className="whitespace-nowrap px-2 py-2 text-gray-700">
        {publisher?.totalBooks}
      </td>

      <td className="whitespace-nowrap px-2 py-2 text-gray-700">
        <div className="text-wrap line-clamp-3 w-full max-w-xs overflow-hidden">
          {publisher?.description}
        </div>
      </td>

      <td className="py-2 text-gray-700 w-28 min-w-20">
        <Image
          priority={1}
          width={200}
          height={200}
          className="w-20 h-20 object-cover"
          src={publisher?.imgUrl ? publisher?.imgUrl : defaultImg}
          alt="category-img"
        />
      </td>

      <td className="w-20 px-2">
        <Link
          href={baseUrl + "/xyz/admin/allPublishers/" + publisher?._id}
          className="py-1 px-2 bg-primary text-white mx-auto"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default AdminPublisherTable;
