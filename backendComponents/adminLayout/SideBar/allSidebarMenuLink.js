import { BiCategory } from "react-icons/bi";
import { FaUserPen } from "react-icons/fa6";

const allSidebarMenuLink = [
  {
    name: "Categories",
    Icon: BiCategory,
    allLinks: [
      {
        name: "All Category",
        link: "/xyz/admin/allCategory",
      },
      {
        name: "Add Category",
        link: "/xyz/admin/addCategory",
      },
    ],
  },
  {
    name: "Authors",
    Icon: FaUserPen,
    allLinks: [
      {
        name: "All Authors",
        link: "#",
      },
      {
        name: "Add Author",
        link: "#",
      },
    ],
  },
];

export default allSidebarMenuLink;
