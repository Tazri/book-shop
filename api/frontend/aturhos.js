export async function getAuthorsPage(page, perPage = 5, searchText = "") {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/authors`;
    const searchParams = new URLSearchParams();
    searchParams.set("page", page);
    searchParams.set("perPage", perPage);
    searchParams.set("search", searchText);
    const urlWithSearchParams = url + "?" + searchParams.toString();
    const response = await fetch(urlWithSearchParams);

    return response;
  } catch (err) {
    return null;
  }
}

export async function getSingleAuthorApi(id) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/authors/${id}`;
    const response = await fetch(url);

    return response;
  } catch (err) {
    return null;
  }
}
