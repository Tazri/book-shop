import { FaRegStar, FaStar } from "react-icons/fa";
import FilterList from "./FilterList";
import PriceRange from "./PriceRange";
import { getDemoAuthor } from "@/data/demoAuthor";
import { getDemoCategory } from "@/data/demoCategory";
import { getDemoPublisher } from "@/data/demoPublisher";

function FilterFormContent() {
  const authors = getDemoAuthor();
  const categoryList = getDemoCategory();
  const publisherList = getDemoPublisher();

  const authorFilterList = {
    fieldName: "authors",
    title: "Authors",
    filterFields: authors?.map((author) => {
      return {
        name: author?.name,
        value: author?.name?.split(" ").join("_").toLocaleLowerCase(),
      };
    }),
  };

  const categoryFilterList = {
    fieldName: "category",
    title: "Category",
    filterFields: categoryList?.map((category) => {
      return {
        name: category?.name,
        value: category?.name?.split(" ").join("_").toLocaleLowerCase(),
      };
    }),
  };

  const publisherFilterList = {
    fieldName: "publishers",
    title: "Publishers",
    filterFields: publisherList?.map((publisher) => {
      return {
        name: publisher?.name,
        value: publisher?.name?.split(" ")?.join("_")?.toLocaleLowerCase(),
      };
    }),
  };

  const ratingFilterList = {
    fieldName: "rating",
    title: "Ratings",
    filterFields: [
      {
        name: <StarSpan star={5} />,
        value: 5,
      },
      {
        name: <StarSpan star={4} />,
        value: 4,
      },
      {
        name: <StarSpan star={3} />,
        value: 3,
      },
      {
        name: <StarSpan star={2} />,
        value: 2,
      },
      {
        name: <StarSpan star={1} />,
        value: 1,
      },
      {
        name: <StarSpan star={0} />,
        value: 0,
      },
    ].reverse(),
  };
  return (
    <>
      <FilterList defaultOpen filterList={authorFilterList} />
      <FilterList defaultOpen filterList={categoryFilterList} />
      <FilterList defaultOpen filterList={publisherFilterList} />
      <FilterList defaultOpen filterList={ratingFilterList} />
      <PriceRange />
      <button className="border text-white py-1 bg-primary">Filter</button>
    </>
  );
}

function StarSpan({ star }) {
  const stars = [];

  for (let i = 0; i < star; i++) {
    stars.push(<FaStar key={`filter-fill-star-${i}`} />);
  }

  for (let i = 0; i < 5 - star; i++) {
    stars.push(<FaRegStar key={`filter-unfill-star-${i}`} />);
  }
  return (
    <span className="flex gap-0.5 text-primary items-center">{stars}</span>
  );
}

export default FilterFormContent;
