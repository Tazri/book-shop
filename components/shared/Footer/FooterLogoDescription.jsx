import { IoBookOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaDribbble } from "react-icons/fa";
import Link from "next/link";

const defaultLinks = [
  {
    link: "#facebook",
    Icon: FaFacebook,
  },

  {
    link: "#instagram",
    Icon: FaInstagram,
  },
  {
    link: "#twitter",
    Icon: FaXTwitter,
  },
  {
    link: "#github",
    Icon: FaGithub,
  },
  {
    link: "#dribbble",
    Icon: FaDribbble,
  },
];

function FooterLogoDescription({ links = defaultLinks }) {
  return (
    <div>
      <span className="flex gap-1 items-center">
        <IoBookOutline className="text-3xl text-primary" />{" "}
        <span className="text-white text-xl">Logo</span>
      </span>
      <p className="max-w-xs mt-4 text-sm text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        accusantium.
      </p>

      <div className="flex flex-wrap mt-8 s240:space-x-4 s260:space-x-6 space-x-3 text-gray-600">
        {links?.map(({ link, Icon }, index) => {
          return (
            <Link
              key={link + index}
              className="s280:text-3xl s220:text-2xl s185:text-xl text-base hover:text-white duration-150"
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FooterLogoDescription;
