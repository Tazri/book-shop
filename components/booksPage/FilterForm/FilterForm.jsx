"use client";

import { useRouter } from "next/navigation";

const filterFields = ["authors", "category", "publishers", "price", "page"];

function FilterForm({ children, searchParams, closeRef }) {
  const router = useRouter();
  const queryObj = new URLSearchParams(searchParams);

  // delete default fieds
  for (const fieldsName of filterFields) {
    queryObj.delete(fieldsName);
  }

  const submitAction = async (formData) => {
    "use client";
    const filter = {};

    const keyValues = [...formData.keys()];

    // set authors, category, publishers like category : a+b+c
    for (const keyValue of keyValues) {
      const [key, value] = keyValue.split("-");

      if (!["price"].includes(key)) {
        if (filter[key]) filter[key].push(value);
        else filter[key] = [value];
      }
    }

    for (const key of Object.keys(filter)) {
      filter[key] = filter[key].join(" ");
    }

    // set others
    filter.price = formData.get("price-filter");

    // modify query object with filter data
    for (const key of Object.keys(filter)) {
      queryObj.set(key, filter[key]);
    }

    const queryString = queryObj.toString();

    closeRef?.current?.click();

    router.replace("/books?" + queryString);
  };

  return (
    <form className="flex flex-col gap-2" action={submitAction}>
      {children}
    </form>
  );
}

export default FilterForm;
