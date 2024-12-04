export async function revlidatePathApi(path) {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL + "/api/revlidatePath?path=" + path;
  const response = await fetch(url);

  return response;
}
