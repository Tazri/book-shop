import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

function AdminBackButton({ path, text = "Go Back" }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <Link
      className="text-sm flex gap-1 items-center hover:text-primary duration-150 text-gray-700 w-fit"
      href={baseUrl + `${path}`}
    >
      <BiArrowBack />
      {text}
    </Link>
  );
}

export default AdminBackButton;
