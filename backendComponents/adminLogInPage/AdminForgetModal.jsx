import emailPlaneIcon from "@/assets/icons/email-plane.webp";
import { isValidEmail } from "@/libs/validation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";

function AdminForgetModal({ close }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formAction = (data) => {
    console.log(data);
  };

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
          className="text-xl absolute text-[#444444] cursor-pointer"
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
        <div className="flex mt-3">
          <button className="text-white text-center bg-primary px-3 py-1 mx-auto rounded-sm">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForgetModal;
