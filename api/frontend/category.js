export async function getAllCategory() {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/category";
  const response = await fetch(url);

  return response;
}

export async function getCategoryPage(page, perPage = 5) {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL +
    `/api/category?perPage=${perPage}&page=${page}`;
  const response = await fetch(url);

  return response;
}

export async function getSingleCategoryApi(id) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/category/${id}`;
  const response = await fetch(url);

  return response;
}
