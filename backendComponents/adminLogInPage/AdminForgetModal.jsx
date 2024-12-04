import { resetPasswordLinkApi } from "@/api/backend/backendAuth";
import emailPlaneIcon from "@/assets/icons/email-plane.webp";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import { isDiffUnderMin, minSecStringFromSec } from "@/libs/dateTime";
import { isValidEmail } from "@/libs/validation";
import { setLastTimeResetLinkSendAction } from "@/redux/adminAuth/adminAuthSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

function AdminForgetModal({ close }) {
  const [loading, setLoading] = useState(false);
  const lastTimeResetLinkSend = useSelector(
    (state) => state.adminAuth.lastTimeResetLinkSend
  );
  const RESETLINK_GAP_TIME = useSelector(
    (state) => state.adminAuth.RESETLINK_GAP_TIME
  );
  const dispatch = useDispatch();
  const [timeDown, setTimeDown] = useState(0);

  useEffect(() => {
    let timeOutId = setInterval(() => {
      if (!lastTimeResetLinkSend) return;

      const diffInMilli = Date.now() - new Date(lastTimeResetLinkSend);
      const isUnderGapTime = isDiffUnderMin(
        lastTimeResetLinkSend,
        RESETLINK_GAP_TIME
      );

      if (isUnderGapTime) {
        const second = RESETLINK_GAP_TIME * 60 - Math.ceil(diffInMilli / 1000);
        setTimeDown(second);
      }
    }, 1000);

    return () => {
      clearInterval(timeOutId);
    };
  }, [lastTimeResetLinkSend, RESETLINK_GAP_TIME]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formAction = async (data) => {
    setLoading(true);
    try {
      const userEmail = data.email;

      const response = await resetPasswordLinkApi(userEmail);
      const json = await response.json();
      const status = response.status;

      toast.dismiss();
      if (status === 404) {
        toast.error("Email is not valid.");
      }

      // if too many request
      else if (status === 429) {
        toast.error("Too many request. Please try later.");
        dispatch(
          setLastTimeResetLinkSendAction({
            RESETLINK_GAP_TIME: json.RESETLINK_GAP_TIME,
            lastTimeResetLinkSend: json.lastTimeResetLinkSend,
          })
        );
      }

      // if success
      else if (status === 200) {
        dispatch(
          setLastTimeResetLinkSendAction({
            RESETLINK_GAP_TIME: json.RESETLINK_GAP_TIME,
            lastTimeResetLinkSend: json.lastTimeResetLinkSend,
          })
        );
        toast.success("Reset link is sended.");
      }
      // for unknown problem
      else {
        toast.error("Server side problem.");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.dismiss();
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  const timeDownString = minSecStringFromSec(timeDown);

  return (
    <div className="fixed top-0 left-0">
      {/* background bg */}
      <button
        onClick={close}
        style={{
          opacity: 0.45,
        }}
        className={
          "fixed top-0 left-0 h-full w-full block bg-black duration-150 "
        }
      ></button>

      <form
        onSubmit={handleSubmit(formAction)}
        className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white w-full p-3 max-w-xl block shadow-md rounded-sm`}
      >
        <button
          type="button"
          onClick={close}
          style={{ top: "0.5rem", right: "0.5rem" }}
          className="text-xl absolute text-[#444444] cursor-pointer hover:text-primary duration-150"
        >
          <IoCloseOutline />
        </button>
        <h2 className="text-center text-[#444444] text-xl">
          Enter Your Email Address
        </h2>
        <p className="text-sm text-center text-[#555555]">
          The email which is used to create the account.
        </p>
        <div className="w-24 mx-auto my-3">
          <Image
            src={emailPlaneIcon}
            alt="email-plane-text"
            width={100}
            height={100}
            className="w-auto h-auto"
          />
        </div>
        <div className="mt-2">
          <input
            {...register("email", {
              validate: (value) => {
                const check = isValidEmail(value);
                return check ? check : true;
              },
            })}
            className={`w-full focus:outline-none px-1.5 py-1 text-[#555555] border ${
              errors["email"] ? "border-red-600" : "border-[#444444]"
            }`}
            type="email"
            placeholder="Enter Your Email Address."
          />
          {errors["email"] && (
            <p className="text-red-600 mt-0.5 text-xs">
              {errors["email"]?.message}
            </p>
          )}
        </div>
        <p className="text-center text-sm my-2 text-[#444444]">
          {" "}
          If you don{"'"}t see the email, please check your spam or junk folder.
        </p>
        <div className="flex flex-col mt-3">
          {timeDownString ? (
            <p className="text-center text-sm my-2 text-[#444444]">
              {" "}
              The send button will appear after <br />
              <span className="text-primary">{timeDownString}</span>
            </p>
          ) : null}

          {timeDownString ? null : (
            <button
              disabled={loading || timeDown}
              className="text-white text-center bg-primary px-3 py-1 mx-auto rounded-sm disabled:opacity-90 disabled:cursor-not-allowed min-w-20 flex justify-center duration-150"
            >
              {loading ? <ButtonSpinner /> : "Send"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AdminForgetModal;
