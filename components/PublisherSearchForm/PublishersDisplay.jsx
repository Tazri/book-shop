import Image from "next/image";
import Pagination from "../shared/Pagination/Pagination";
import defaultImage from "@/assets/publisher/dimik.png";
import { getDemoPublisher } from "@/data/demoPublisher";
import Link from "next/link";

function PublishersDisplay({ searchParams }) {
  const demoPublisher = getDemoPublisher();

  return (
    <div className="my-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {demoPublisher?.map((publisher, index) => {
          return (
            <PublisherCard
              key={`${publisher?.id}+${index}`}
              publisher={publisher}
            />
          );
        })}
      </div>

      <div className="my-6">
        <Pagination searchParams={searchParams} path="/publishers" />
      </div>
    </div>
  );
}

function PublisherCard({ publisher }) {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-1.5 cursor-pointer border p-3 hover:shadow-md duration-150">
      <Link
        href={"/publishers/" + publisher?.id}
        className="w-16 s320:max-w-28 aspect-square s320:w-full flex justify-center items-center bg-[#f5f6f8] duration-200"
      >
        <Image
          width={500}
          height={500}
          src={publisher?.img ? publisher.img : defaultImage}
          alt={publisher?.name}
          className="h-[75%] w-[75%] object-cover"
        />
      </Link>

      <div>
        <h3 className="text-primary s280:text-base s250:text-xs text-xs duration-200 leading-5">
          {publisher?.name}
        </h3>
        <p className="text-[#555555] s320:text-base s280:text-sm s250:text-xs text-[0.6rem] whitespace-nowrap">
          {publisher?.totalBooks} Books
        </p>
      </div>
    </div>
  );
}

export default PublishersDisplay;
