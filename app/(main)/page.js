import AuthorSlide from "@/components/homePage/AuthorSlide/AuthorSlide";
import Banner from "@/components/homePage/Banner/Banner";
import HomeCategory from "@/components/shared/Category/HomeCategory";
import OfferBanner from "@/components/homePage/OfferBanner";
import PublisherSlide from "@/components/homePage/PublisherSlide/PublisherSlide";
import BookSlide from "@/components/shared/BookSlide/BookSlide";
import { getDemoAuthor } from "@/data/demoAuthor";
import { getDemoCategory } from "@/data/demoCategory";
import { getDemoBook } from "@/data/demoData";
import { getDemoPublisher } from "@/data/demoPublisher";
import CategorySlider from "@/components/homePage/CategorySlider/CategorySlider";
import HomeFeatured from "@/components/homePage/HomeFeatured";

export default function HomePage() {
  const books = getDemoBook();
  const authors = getDemoAuthor();
  const publishers = getDemoPublisher();
  const allCategory = getDemoCategory();
  return (
    <>
      <Banner />

      <BookSlide title="New Release Books" link="#top-category" books={books} />
      <BookSlide title="Trandings Books" books={books} />

      <OfferBanner />
      <AuthorSlide authors={authors} />
      <PublisherSlide publishers={publishers} />

      <BookSlide title="Top Rated Book" books={books} />

      <HomeCategory allCategory={allCategory} />

      <BookSlide title="Anime Book" books={books} />

      <CategorySlider allCategory={allCategory} />

      <HomeFeatured />
    </>
  );
}
