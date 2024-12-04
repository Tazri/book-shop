import Link from "next/link";

const defaultLinks = {
  title: "Title",
  links: [
    {
      link: "#about",
      name: "About",
    },
    {
      link: "#home",
      name: "Home",
    },
    {
      link: "#category",
      name: "category",
    },
    {
      link: "#contact",
      name: "contact",
    },
  ],
};

function FooterUlList({ links = defaultLinks }) {
  return (
    <div>
      <p className="font-medium text-white">{links?.title}</p>
      <nav className="flex flex-col mt-4 space-y-2 text-sm text-footer-text">
        {links?.links?.map(({ link, name }, index) => {
          return (
            <Link
              href={link}
              key={link + name + index}
              className="hover:text-white duration-150"
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default FooterUlList;
