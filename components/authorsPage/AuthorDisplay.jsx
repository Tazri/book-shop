import Image from "next/image";
import defaultImage from "@/assets/authors/Levi_Ackermann.webp";
import { getDemoAuthor } from "@/data/demoAuthor";
import Link from "next/link";
import Pagination from "../shared/Pagination/Pagination";

function AuthorDisplay({ searchParams }) {
  const demoAuthors = getDemoAuthor();

  return (
    <div className="my-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {demoAuthors?.map((author, index) => {
          return <AuthorCard author={author} key={`${author?.id}+${index}`} />;
        })}
      </div>

      <div className="my-6">
        <Pagination searchParams={searchParams} path="/authors" />
      </div>
    </div>
  );
}

function AuthorCard({ author }) {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-1.5 hover:shadow-md border p-3 duration-150 cursor-pointer">
      <Link
        href={"/authors/" + author?.id}
        className="w-16 s320:max-w-28 aspect-square s320:w-full rounded-full overflow-hidden border border-primary flex justify-center items-center"
      >
        <Image
          width={500}
          height={500}
          src={author?.avatarImg ? author.avatarImg : defaultImage}
          alt="author image"
          className="h-[95%] w-[95%] object-cover rounded-full"
        />
      </Link>

      <div>
        <h3 className="text-primary s320:text-lg s280:text-base s250:text-sm text-xs duration-200 leading-5">
          <Link href={"/authors/" + author?.id}>{author?.name}</Link>
        </h3>
        <p className="text-[#555555] s320:text-base s280:text-sm s250:text-xs text-[0.6rem] whitespace-nowrap">
          {author?.totalPublish} Books
        </p>
      </div>
    </div>
  );
}

export default AuthorDisplay;
