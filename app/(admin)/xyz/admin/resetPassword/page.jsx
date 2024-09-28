import ResetPasswordForm from "@/backendComponents/resetPasswordPage/ResetPasswordForm";
import Link from "next/link";
import { MdOutlinePassword } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { redirect } from "next/navigation";
import connectDB from "@/database/connectDB";
import { decode, verify } from "jsonwebtoken";
import { AdminUserModel } from "@/database/models";

async function ResetPasswordPage({ searchParams }) {
  let adminUsername;
  try {
    const token = searchParams.token;

    if (!token) {
      return redirect("/xyz/admin/login");
    }

    // connect with database
    await connectDB();

    // get payload from jwt token
    const payload = decode(token);

    const username = payload.username;

    if (!username) {
      return redirect("/xyz/admin/login");
    }

    // find the user
    const user = await AdminUserModel.findOne();

    if (!user) {
      return redirect("/xyz/admin/login");
    }

    // verify the token
    const isVerified = verify(token, user.secret);
    adminUsername = isVerified.username;
  } catch (err) {
    return redirect("/xyz/admin/login");
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="container mx-auto py-2 px-1 mb-2">
        <Link href="/" className="text-primary text-xl">
          PageTurner
        </Link>
      </div>

      <div className="w-full container mx-auto h-full  flex-grow p-3 pt-8">
        <div className="mx-auto my-auto w-full max-w-lg">
          {/* icon */}
          <div className="text-center flex justify-center mb-3">
            <span className="text-2xl sm:text-3xl size-10 sm:size-12 flex justify-center items-center text-[#444444] duration-150">
              <MdOutlinePassword />
            </span>
          </div>

          <div className="text-center mb-4">
            <h2 className="text-xl sm:text-2xl text-[#333333] duration-150">
              Set new password
            </h2>
            <p className="text-[#555555] duration-150 text-xs s350:text-sm sm:text-base">
              Please don{"'"}t share the password with other.
            </p>
          </div>

          <p className="border-[#888888] right-3 my-auto"></p>
          <ResetPasswordForm token={searchParams.token} />

          <Link
            href="/xyz/admin/login"
            className="mt-5 flex items-center justify-center gap-0.5 text-center text-[#444444] text-sm hover:text-primary duration-150 group"
          >
            <span className="text-xl group-hover:-translate-x-1 duration-150">
              <GoArrowLeft />
            </span>
            <span>Back to login page.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
