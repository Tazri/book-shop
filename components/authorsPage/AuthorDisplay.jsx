import Image from "next/image";
import defaultImage from "@/assets/authors/Levi_Ackermann.webp";
import Link from "next/link";

function AuthorDisplay({ allAuthors }) {
  if (!allAuthors?.length) {
    return (
      <div className="text-center text-gray-600 uppercase text-base sm:text-lg md:text-xl lg:text-2xl my-3 duration-150 mt-9">
        There is no author
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-6">
      {allAuthors?.map((author, index) => {
        return <AuthorCard author={author} key={`${author?._id}+${index}`} />;
      })}
    </div>
  );
}

function AuthorCard({ author }) {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-1.5 hover:shadow-md border p-3 duration-150 cursor-pointer">
      <Link
        href={"/authors/" + author?._id}
        className="w-16 s320:max-w-28 aspect-square s320:w-full rounded-full overflow-hidden border border-primary flex justify-center items-center"
      >
        <Image
          priority={1}
          width={500}
          height={500}
          src={author?.imgUrl ? author?.imgUrl : defaultImage}
          alt={author?.name}
          className="h-[95%] w-[95%] object-cover rounded-full"
        />
      </Link>

      <div>
        <h3 className="text-primary s320:text-lg s280:text-base s250:text-sm text-xs duration-200 leading-5">
          <Link href={"/authors/" + author?._id}>{author?.name}</Link>
        </h3>
        <p className="text-[#555555] s320:text-base s280:text-sm s250:text-xs text-[0.6rem] whitespace-nowrap">
          {author?.totalBooks} Books
        </p>
      </div>
    </div>
  );
}

export default AuthorDisplay;
