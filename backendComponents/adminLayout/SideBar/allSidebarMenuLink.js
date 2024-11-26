import { BiCategory } from "react-icons/bi";
import { FaUserPen } from "react-icons/fa6";
import { CiPen } from "react-icons/ci";

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
        link: "/xyz/admin/authors",
      },
      {
        name: "Add Author",
        link: "/xyz/admin/addAuthor",
      },
    ],
  },
  {
    name: "Publishers",
    Icon: CiPen,
    allLinks: [
      {
        name: "All Publishers",
        link: "/xyz/admin/allPublishers",
      },
      {
        name: "Add Publishers",
        link: "/xyz/admin/addPublisher",
      },
    ],
  },
];

export default allSidebarMenuLink;
