"use client";

import OTPForm from "@/components/otpPage/OTPForm";
import OTPIllustrator from "@/components/otpPage/OTPIllustrator";
import { useSelector } from "react-redux";
import OTPSender from "@/components/otpPage/OTPSender";

function OTPpage() {
  const otpEmail = useSelector((state) => state.profile.otpEmail);

  if (!otpEmail) {
    return <OTPSender />;
  }

  return (
    <div className="flex-grow mx-auto container flex p-1 my-3 flex-col lg:flex-row gap-3 items-center">
      <OTPForm />
      {/** img */}
      <div className="flex-grow w-full max-w-lg xl:max-w-lg 2xl:max-w-2xl mx-auto">
        <div className="max-w-lg lg:max-w-2xl mx-auto my-4">
          <OTPIllustrator />
        </div>
      </div>
    </div>
  );
}

export default OTPpage;
