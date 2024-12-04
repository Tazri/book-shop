import { useForm } from "react-hook-form";
import AccountInputField from "../shared/AccountInputField";
import CancelAndSaveButton from "../shared/CancelAndSaveButton";
import { isValidPassword } from "@/libs/validation";

function PasswordInformatinForm({ cancel }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const submitAction = (formData) => {
    console.log(formData);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submitAction)}>
      <AccountInputField
        error={errors["currentPassword"]?.message}
        name={"Current Password"}
        id="current-password"
      >
        <input
          {...register("currentPassword", {
            validate: (value) => {
              return value.length
                ? true
                : "Please enter your current password.";
            },
          })}
          id="current-password"
          className={`border focus:outline-none p-2 text-[#222222] ${
            errors["currentPassword"] ? "border-rose-600" : ""
          }`}
          type="text"
        />
      </AccountInputField>

      <AccountInputField
        name={"New Password"}
        id="new-password"
        error={errors["newPassword"]?.message}
      >
        <input
          {...register("newPassword", {
            validate: (value) => {
              const check = isValidPassword(value);
              return check ? check : true;
            },
          })}
          id="new-passowrd"
          className={`border focus:outline-none p-2 text-[#222222] ${
            errors["newPassword"] ? "border-rose-600" : ""
          }`}
          type="text"
        />
      </AccountInputField>

      <AccountInputField
        error={errors["confirmPassword"]?.message}
        name={"Confirm Password"}
        id="confirm-password"
      >
        <input
          {...register("confirmPassword", {
            validate: (value) => {
              return value === watch("newPassword")
                ? true
                : "Password does not match";
            },
          })}
          id="confirm-password"
          className={`border focus:outline-none p-2 text-[#222222] ${
            errors["confirmPassword"] ? "border-rose-600" : ""
          }`}
          type="text"
        />
      </AccountInputField>
      <CancelAndSaveButton cancel={cancel} />
    </form>
  );
}

export default PasswordInformatinForm;
