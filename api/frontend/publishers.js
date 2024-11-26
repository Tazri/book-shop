export async function getPublishersPageAPI(
  page = 1,
  perPage = 5,
  searchText = ""
) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/publishers`;
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);
  searchParams.set("perPage", perPage);
  searchParams.set("search", searchText);
  const urlWithSearchParams = url + "?" + searchParams.toString();
  const response = await fetch(urlWithSearchParams);

  return response;
}

export async function getSinglePublisherApi(id) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/publishers/${id}`;
  const response = await fetch(url);

  return response;
}
