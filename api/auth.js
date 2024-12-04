export async function signInApi(payload) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/signup";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
}

export async function resendOTPApi(email) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/resendOTP";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });

  return response;
}

export async function verifyEmailApi(payload) {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/verifyEmail";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
}
