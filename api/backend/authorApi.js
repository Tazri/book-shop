export async function addAuthorAPi(payload) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/authors";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
}

export async function updateAuthorImgApi(id, img) {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/authors/updateImg/" + id;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ img }),
  });

  return response;
}

export async function updateAuthorDataApi(id, payload) {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/authors/updateData/" + id;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
}

export async function deleteAuthorApi(id) {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/authors/delete/" + id;
  const response = await fetch(url, {
    method: "DELETE",
  });

  return response;
}
