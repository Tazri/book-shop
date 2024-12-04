export async function addPublishersAPi(payload) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/publishers";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
}
