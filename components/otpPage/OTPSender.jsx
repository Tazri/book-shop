import Image from "next/image";
import Illustrator from "./../../assets/illustrators/sending-message.webp";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { isValidEmail } from "@/libs/validation";
import { useState } from "react";
import ButtonSpinner from "../shared/spinner/ButtonSpinner";
import { resendOTPApi } from "@/api/auth";
import { setOTPEmailAction } from "@/redux/profileSlice/profileSlice";
import { miliToMinSec, minToMili } from "@/libs/dateTime";
import { useRouter } from "next/navigation";

function OTPSender() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const submitAction = async (formData) => {
    const email = formData.email;
    try {
      setLoading(true);
      const response = await resendOTPApi(email);

      if (response === null) {
        console.log("null error..");
        toast.dismiss();
        toast.error("Something went wrong...");
      } else {
        const responseJSON = await response.json();
        const status = response.status;

        toast.dismiss();
        if (status === 404) {
          toast.error("User is not exist.");
        }

        // for success
        else if (status === 200) {
          toast.success(responseJSON?.msg);
          const payload = {
            email: responseJSON?.email,
            lastTimeOtpSend: responseJSON?.lastTimeOtpSend,
          };

          dispatch(setOTPEmailAction(payload));
        }

        // for too many request
        else if (status === 429) {
          const lastTimeOtpSend = responseJSON?.lastTimeOtpSend;
          const lastTimeDate = new Date(lastTimeOtpSend);
          const diffInMili = Date.now() - lastTimeDate;
          const otpResendTimGap = minToMili(responseJSON.otpResendTimGap);
          const leftMili = otpResendTimGap - diffInMili;
          const [min, sec] = miliToMinSec(leftMili);

          const msgStr = `Too many request. Please try again after ${min}min ${sec}sec`;
          toast.error(msgStr, { duration: 4000 });
        }
        // if user is already verified
        else if (status === 409) {
          toast.error("User is already verified. Just sign in.");
          router.push("/signin");
        }
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.dismiss();
      toast.error("Something went wrong.");
    }
  };

  return (
    <form
      className="container mx-auto my-5 flex-grow px-1"
      onSubmit={handleSubmit(submitAction)}
    >
      <h2 className="text-center text-xs s280:text-sm sm:text-xl text-[#333333] duration-150">
        Please enter your email,
        <br />
        to get <span className="text-primary">OTP</span>.
      </h2>

      <div className="my-4 w-fit mx-auto flex flex-col">
        <input
          {...register("email", {
            validate: (value) => {
              const check = isValidEmail(value);
              return check ? check : true;
            },
          })}
          className={`border focus:outline-none focus:border-primary px-2 py-0.5 rounded-sm text-[#444444] text-xs s280:text-sm sm:text-base duration-150 w-full ${
            errors["email"] ? "border-red-600" : "border-[#cccccc]"
          } `}
        />
        {errors["email"] && (
          <p className="mt-0.5 text-red-600 text-sm">
            {errors["email"]?.message}
          </p>
        )}
      </div>

      <button
        disabled={loading}
        className="bg-primary text-white px-3 py-1 rounded-sm w-fit mx-auto text-xs s280:text-sm sm:text-base duration-150 sm:min-w-24 min-w-20 flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-90"
        href="/signup"
      >
        {loading ? <ButtonSpinner /> : "Resend OTP"}
      </button>

      <div className="max-w-xs mx-auto mt-4">
        <Image
          src={Illustrator}
          alt="illustrator"
          height={500}
          width={500}
          className="w-full"
          priority={5}
        />
      </div>
    </form>
  );
}

export default OTPSender;
