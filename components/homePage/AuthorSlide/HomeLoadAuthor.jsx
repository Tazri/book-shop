import { getAuthorsPage } from "@/api/frontend/aturhos";
import AuthorSwiper from "./AuthorSwiper";

async function HomeLoadAuthor() {
  const response = await getAuthorsPage(1, 7);

  if (response === null) {
    return (
      <div className="text-red-500 text-center text-sm sm:text-base md:text-lg lg:text-xl uppercase">
        Author load to failed.
      </div>
    );
  }

  const json = await response.json();
  const status = 200;

  if (status !== 200) {
    return (
      <div className="text-red-500 text-center text-sm sm:text-base md:text-lg lg:text-xl uppercase">
        Author load to failed.
      </div>
    );
  }

  return <AuthorSwiper authors={json?.allAuthors || []} />;
}

export default HomeLoadAuthor;
