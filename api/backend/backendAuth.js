export async function resetPasswordLinkApi(email) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/resetLink";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return response;
  } catch (err) {
    return null;
  }
}

export async function adminResetPasswordAPI(payload) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/resetPassword";

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

export async function adminLoginApi(payload) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/login";

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

export async function adminCheckingAuth() {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/checkingAuth";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return null;
  }
}

export async function adminLogoutApi() {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/admin/logout";

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return null;
  }
}
