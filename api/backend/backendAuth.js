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

export async function adminResetPasswordAPI(payload) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/resetPassword";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
}

export async function adminLoginApi(payload) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
}

export async function adminCheckingAuth() {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/checkingAuth";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function adminLogoutApi() {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/logout";

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
