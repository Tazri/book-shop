import { personalInformationFormId } from "@/components/htmlIds/ids";
import AccountInputField from "./AccountInputField";

function PersonalInformationForm(
  { close = () => {} },
  name = "",
  phone = "",
  email = ""
) {
  return (
    <form>
      <AccountInputField
        name={"Name"}
        id="profile-name"
        error={"this is error"}
      >
        <input id="profile-name" className="border focus:outline-none p-2" />
      </AccountInputField>

      <div className="flex gap-2">
        <label
          htmlFor={personalInformationFormId}
          className="my-3 px-3 py-2 bg-rose-600 text-white rounded-sm cursor-pointer"
        >
          cancel
        </label>
        <button
          type="button"
          className="my-3 px-3 py-2 bg-emerald-600 text-white rounded-sm"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default PersonalInformationForm;
