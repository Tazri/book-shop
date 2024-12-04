export async function revlidatePathApi(path) {
  try {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/api/revlidatePath?path=" + path;
    const response = await fetch(url);

    return response;
  } catch (err) {
    return null;
  }
}
