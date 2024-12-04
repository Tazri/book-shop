export async function getAllCategory() {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/category";
    const response = await fetch(url);

    return response;
  } catch (err) {
    return null;
  }
}

export async function getCategoryPage(page, perPage = 5) {
  try {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL +
      `/api/category?perPage=${perPage}&page=${page}`;
    const response = await fetch(url);

    return response;
  } catch (err) {
    return null;
  }
}

export async function getSingleCategoryApi(id) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/category/${id}`;
    const response = await fetch(url);

    return response;
  } catch (err) {
    return null;
  }
}
