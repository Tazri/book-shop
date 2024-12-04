import { headers } from "next/headers";

export const getFullUrl = () => {
  const headerList = headers();
  console.log(headerList);
  console.log(headerList.get("x-invoke-path"));
};
