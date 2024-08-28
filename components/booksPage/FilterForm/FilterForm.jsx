"use client";
import { getDemoAuthor } from "@/data/demoAuthor";
import FilterList from "./FilterList";
import { getDemoCategory } from "@/data/demoCategory";
import { getDemoPublisher } from "@/data/demoPublisher";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import PriceRange from "./PriceRange";

function FilterForm() {
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
    ],
  };

  const submitAction = async (formData) => {
    "use client";
    const filter = {};

    const keyValues = [...formData.keys()];

    for (const keyValue of keyValues) {
      const [key, value] = keyValue.split("-");

      if (filter[key]) filter[key].push(value);
      else filter[key] = [value];
    }

    console.log(filter);
  };

  return (
    <form className="flex flex-col gap-2" action={submitAction}>
      <FilterList defaultOpen filterList={authorFilterList} />
      <FilterList defaultOpen filterList={categoryFilterList} />
      <FilterList defaultOpen filterList={publisherFilterList} />
      <FilterList defaultOpen filterList={ratingFilterList} />
      <PriceRange />
      <button className="border text-white py-1 bg-primary">Filter</button>
    </form>
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

export default FilterForm;
