import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decode, verify } from "jsonwebtoken";
import connectDB from "@/database/connectDB";
import { AdminUserModel } from "@/database/models";

export default async function AdminAuthChecker({ children }) {
  // get the cookies
  const cookieStore = cookies();
  const systemTokenCookie = cookieStore.get("systemToken");

  if (!systemTokenCookie) {
    redirect("/xyz/admin/checkingAuth");
  }

  const systemToken = systemTokenCookie.value;

  // try to decode and check system token
  try {
    const tokenData = decode(systemToken);

    // if tokenData null
    if (!tokenData || !tokenData.username) {
      redirect("/xyz/admin/checkingAuth");
    }

    const identity = { username: tokenData.username };

    // check identity in db
    await connectDB();
    const user = await AdminUserModel.findOne(identity);

    if (!user) {
      redirect("/xyz/admin/checkingAuth");
    }

    const userSecret = user.secret;

    // verify token
    verify(systemToken, userSecret);
  } catch (err) {
    console.log("error: ");
    console.log(err.message);
    redirect("/xyz/admin/checkingAuth");
  }
  return <>{children}</>;
}
