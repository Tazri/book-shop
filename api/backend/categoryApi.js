export async function addCategoryApi(payload) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/category";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response;
  } catch (err) {
    return null;
  }
}

export async function updateCategoryApi(id, payload) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/category/" + id;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response;
  } catch (err) {
    return null;
  }
}

export async function deleteCategoryApi(id) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/category";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    return response;
  } catch (err) {
    return null;
  }
}
