export async function signInApi(payload) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/signup";
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

export async function resendOTPApi(email) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/resendOTP";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    return response;
  } catch (err) {
    return null;
  }
}

export async function verifyEmailApi(payload) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/verifyEmail";
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
