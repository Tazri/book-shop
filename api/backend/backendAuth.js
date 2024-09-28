export async function resetPasswordLinkApi(email) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/resetLink";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return response;
}
