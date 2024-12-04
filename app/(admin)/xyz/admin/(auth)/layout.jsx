import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function AuthLayout({ children }) {
  const cookieStore = cookies();
  const systemToken = cookieStore.get("systemToken");

  if (systemToken) {
    redirect("/xyz/admin");
  }

  return <>{children}</>;
}
