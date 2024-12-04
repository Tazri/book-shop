"use client";
import { adminCheckingAuth } from "@/api/backend/backendAuth";
import AuthLoader from "@/backendComponents/shared/loaders/AuthLoader/AuthLoader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import authFailedIcon from "@/assets/icons/auth_failed.webp";

export default function CheckingAuthPage() {
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      toast.dismiss();
      try {
        const response = await adminCheckingAuth();
        const json = await response.json();
        const status = response.status;

        if (status === 301) {
          router.push(json?.redirectLink);
        } else {
          setIsError(true);
          toast.error("Something went wrong.");
        }
      } catch (err) {
        console.log(err);
        setIsError(true);
        toast.error("Something went wrong.");
      }
    };

    const timeOutId = setTimeout(() => {
      checkAuth();
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [router]);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {isError ? (
        <>
          <div className="w-20  s250:w-24 s280:w-28 s380:w-36">
            <Image
              src={authFailedIcon}
              alt="icon"
              width={512}
              height={512}
              className="w-full"
            />
          </div>
          <h2 className="mt-4 text-base  s250:text-lg s280:text-xl s380:text-2xl text-primary duration-150 text-center select-none">
            Authorization Failed
          </h2>
        </>
      ) : (
        <>
          <AuthLoader />
          <h2 className="mt-12 text-base  s250:text-lg s280:text-xl s380:text-2xl text-primary animate-pulse duration-150 text-center select-none">
            Authorization Checking
          </h2>
        </>
      )}
    </div>
  );
}
