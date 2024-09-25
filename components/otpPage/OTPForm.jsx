import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ButtonSpinner from "../shared/spinner/ButtonSpinner";
import { resendOTPApi, verifyEmailApi } from "@/api/auth";
import {
  removeOTPEmailAction,
  setOTPEmailAction,
} from "@/redux/profileSlice/profileSlice";
import { miliToMinSec, minToMili } from "@/libs/dateTime";

const backspaceKey = "Backspace";

function OTPForm() {
  const lastTimeOtpSend = useSelector((state) => state.profile.lastTimeOtpSend);
  const [resendTimeString, setResendTimeString] = useState("");
  const otpEmail = useSelector((state) => state.profile.otpEmail);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const allBoxRef = [box1Ref, box2Ref, box3Ref, box4Ref];
  const router = useRouter();
  const [resendLoading, setResendLoading] = useState(false);
  const dispatch = useDispatch();
  const [boxError, setBoxError] = useState(Array(4).fill(false));
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [isOTPDisabled, setIsOTPDisabled] = useState(false);
  const [OTPMatched, setOTPMatched] = useState(false);
  const [otpResendTimGap, setOtpResendTimGap] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const lastTimeOtpDate = new Date(lastTimeOtpSend);
      const diffInMili = Date.now() - lastTimeOtpDate;
      const leftTimeInMili = minToMili(otpResendTimGap) - diffInMili;

      if (leftTimeInMili > 0) {
        const [min, sec] = miliToMinSec(leftTimeInMili);
        const leftTimeStr = min
          ? `${min}min${sec ? " " + sec + "sec" : ""}`
          : `${sec}sec`;

        setResendTimeString(leftTimeStr);
      } else {
        setResendTimeString("");
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastTimeOtpSend, otpResendTimGap]);

  async function handleResendOTP() {
    setResendLoading(true);
    try {
      const response = await resendOTPApi(otpEmail);
      const responseJson = await response.json();
      const status = response.status;

      toast.dismiss();
      if (status === 200) {
        setIsOTPDisabled(false);
        const payload = {
          email: responseJson.email,
          lastTimeOtpSend: responseJson.lastTimeOtpSend,
        };

        setResendTimeString("1min");
        toast.success("OTP is sended.");
        setOtpResendTimGap(responseJson?.otpResendTimGap);
        dispatch(setOTPEmailAction(payload));
      }
      // if too many request
      else if (status === 429) {
        const payload = {
          email: responseJson.email,
          lastTimeOtpSend: responseJson.lastTimeOtpSend,
        };

        toast.error("Too many OTP request.");
        dispatch(setOTPEmailAction(payload));
      }

      // if user is already verified
      else if (status === 409) {
        toast.error(responseJson.msg);
      }

      // nothing else.
      else {
        toast.error("Server side error.");
      }

      setResendLoading(false);
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong.");
      console.log(err);
    }
  }

  function handleKeyUp(e) {
    const digits = "0123456789";
    const value = e.key;
    const index = parseInt(e.target.name);
    const indexValue = otp[index];
    const prevIndex = index > 0 ? index - 1 : 0;
    const nextIndex = index < 3 ? index + 1 : 3;
    const nextRef = allBoxRef[nextIndex];
    const prevRef = allBoxRef[prevIndex];

    if (!digits.includes(value) && value !== backspaceKey) return;

    if (value === backspaceKey) {
      if (!indexValue) {
        prevRef.current?.focus();
        return;
      } else {
        const updateOTP = [...otp];
        updateOTP[index] = "";
        setOTP(updateOTP);
        return;
      }
    }

    // if value is digits
    if (indexValue) {
      nextRef?.current?.focus();
      return;
    }

    const updateOTP = [...otp];
    updateOTP[index] = value;
    setOTP(updateOTP);
    nextRef?.current?.focus();
  }

  async function handleSubmit() {
    const isAllDigitTyped = otp.every(Boolean);

    if (!isAllDigitTyped) {
      const updateBoxError = otp.map((d) => d === "");
      toast.dismiss();
      toast.error("Please enter all OTP digit.");
      setBoxError(updateBoxError);
      return;
    }

    try {
      setLoadingVerify(true);
      const otpString = otp.join("");
      const payload = {
        otp: otpString,
        email: otpEmail,
      };

      // start network request
      const response = await verifyEmailApi(payload);
      const responseJSON = await response.json();
      const status = response.status;

      // change state based on response
      toast.dismiss();
      if (status === 400) {
        setBoxError(Array(4).fill(true));
        toast.error(responseJSON?.msg);
      }
      // if otp is disabled
      else if (status === 429) {
        setIsOTPDisabled(true);
        toast.error(responseJSON?.msg);
      }

      // if success to verify
      else if (status === 200) {
        toast.success(responseJSON?.msg);
        setOTPMatched(true);
        setTimeout(() => {
          router.push("/signin");
          // dispatch(removeOTPEmailAction());
        }, 1500);
      }

      // unknown case
      else {
        toast.error("Something went wrong.");
      }

      if (!OTPMatched) {
        setLoadingVerify(false);
      }
    } catch (err) {
      console.log(err);
      toast.dismiss();
      toast.error("Something went wrong.");
    }
  }

  function handleFocus() {
    setBoxError(Array(4).fill(false));
  }

  const commonBoxProp = {
    onKeyUP: handleKeyUp,
    onFocus: handleFocus,
    errors: boxError,
    OTPMatched,
  };
  return (
    <div className="flex-grow flex flex-col gap-3.5 py-2 w-full lg:w-auto  self-center lg:self-start px-1 lg:max-w-none  xl:my-auto">
      <div>
        <h2 className="text-center text-[#333333] sm:text-xl s380:text-lg text-base duration-150">
          Enter Your OTP
        </h2>
        <p className="text-center text-[#555555] s380:text-sm text-xs duration-150">
          Enter the 4-digit verification code that was sent to{" "}
          <span className="text-primary">{otpEmail} </span>
          address.
        </p>
      </div>

      <div className="flex justify-center flex-wrap  s240:gap-3 gap-1.5">
        <Box name="0" boxRef={box1Ref} value={otp[0]} {...commonBoxProp} />
        <Box name="1" boxRef={box2Ref} value={otp[1]} {...commonBoxProp} />
        <Box name="2" boxRef={box3Ref} value={otp[2]} {...commonBoxProp} />
        <Box name="3" boxRef={box4Ref} value={otp[3]} {...commonBoxProp} />
      </div>

      {isOTPDisabled ? (
        <p className="text-center text-red-600 s380:text-sm text-xs duration-150">
          Your OTP is disabled. Please click on resend button to get new OTP
          code.
        </p>
      ) : (
        <p className="text-center text-[#555555] s380:text-sm text-xs duration-150">
          If you don{"'"}t see the email, please check your spam or junk folder.
        </p>
      )}

      <div className="flex flex-col justify-center mt-3">
        <button
          disabled={loadingVerify || isOTPDisabled}
          onClick={handleSubmit}
          className="bg-primary text-white px-3 py-1.5  s350:text-sm text-xs mx-auto rounded-sm duration-150 min-w-24 flex justify-center items-center disabled:cursor-not-allowed opacity-90"
        >
          {loadingVerify ? <ButtonSpinner /> : "Submit OTP"}
        </button>
        <p className="text-center text-[#555555] mt-3  s380:text-sm text-xs duration-150">
          Dont{"'"}s recieve code ?
        </p>

        {resendTimeString ? (
          <p className="text-center text-[#555555] mt-1.5  s380:text-sm text-xs duration-150">
            Resend button available after <br />
            <span className="text-primary">{resendTimeString}</span>
          </p>
        ) : (
          <button
            onClick={handleResendOTP}
            disabled={resendLoading}
            className="text-primary flex justify-center items-center mt-0.5 disabled:cursor-not-allowed"
          >
            {resendLoading ? <ButtonSpinner background="#ff5501" /> : "Resend"}
          </button>
        )}
      </div>
    </div>
  );
}

function Box({ name, boxRef, value, onKeyUP, onFocus, errors, OTPMatched }) {
  const index = parseInt(name);
  const error = errors[index];

  return (
    <input
      name={name}
      ref={boxRef}
      value={value}
      onChange={() => {}}
      onKeyUp={onKeyUP}
      onFocus={onFocus}
      className={`border sm:w-12  s240:w-10 w-8 sm:h-12 s240:h-10 h-8 text-center focus:outline-none focus:border-primary rounded-md text-[#444444] duration-150 s240:text-base text-sm ${
        error
          ? "border-red-600 bg-red-100"
          : OTPMatched
          ? "border-emerald-600 bg-emerald-100"
          : "border-[#cccccc]"
      }`}
      maxLength={1}
    />
  );
}

export default OTPForm;
