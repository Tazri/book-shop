import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { RxSlash } from "react-icons/rx";

function BreadCrumb({ path = "/books/book/id", lastPathWord }) {
  const pathArr = path.split("/");
  if (!pathArr[0]) pathArr.shift();
  const last = pathArr.pop();

  let pathname = "";

  const links = [];

  for (const word of pathArr) {
    pathname += "/" + word;
    links.push(<Slash key={word + "/"} />);
    links.push(
      <Link
        className="cursor-pointer hover:underline hover:text-primary underline-offset-2"
        key={word + "links"}
        href={pathname}
      >
        {word}
      </Link>
    );
  }

  if (lastPathWord) {
    links.push(<Slash key={"/last"} />);
    links.push(
      <span key={"last"} className="text-primary">
        {lastPathWord}
      </span>
    );
  } else {
    links.push(<Slash key={"/last"} />);
    links.push(
      <span className="text-primary" key={"last"}>
        {last}
      </span>
    );
  }

  return (
    <div className="container mx-auto my-1 mb-3 px-1 text-xs  s380:text-sm text-[#666666] flex items-center duration-150">
      <Link href="/" className="cursor-pointer hover:text-primary">
        <IoMdHome />
      </Link>
      {links}
    </div>
  );
}

function Slash() {
  return (
    <span>
      <RxSlash />
    </span>
  );
}

export default BreadCrumb;
