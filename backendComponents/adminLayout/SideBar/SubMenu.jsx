import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const defaultLinks = [
  {
    name: "All Category",
    link: "#",
  },
  {
    name: "Add Category",
    link: "#",
  },
];

function SubMenu({
  Icon = BiCategory,
  name = "Sub Menu",
  links = defaultLinks,
  onClick = () => {},
  active,
}) {
  const pathname = usePathname();

  return (
    <div>
      <div
        className={`flex  gap-2 items-center cursor-pointer p-2 duration-150 select-none ${
          active ? "bg-primary" : "bg-transparent hover:bg-slate-600"
        }`}
        onClick={onClick}
      >
        <Icon /> <span>{name}</span>{" "}
        <IoIosArrowDown
          className={`ml-auto ${active ? "" : "-rotate-180"} duration-150`}
        />
      </div>

      <ul
        className={`pl-4 pr-2 flex flex-col gap-2 text-sm bg-slate-600 text-[#dddddd] duration-150 overflow-hidden ${
          active ? "h-auto py-1.5" : "h-0"
        }`}
      >
        {links.map(({ name, link }, index) => {
          const isActive = link === pathname;
          return (
            <li key={link + index + name} className="w-full">
              <Link
                href={link}
                className={`hover:translate-x-1 w-full block duration-500 ${
                  isActive ? "translate-x-1 text-primary" : ""
                }`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SubMenu;
