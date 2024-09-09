import { personalInformationFormId } from "@/components/htmlIds/ids";
import ProfileAccountHeader from "./ProfileAccountHeader";
import ProfileDisplayField from "./ProfileDisplayField";
import PersonalInformationForm from "./PersonalInformationForm";

function PersonalInformation() {
  return (
    <div>
      <ProfileAccountHeader>Personal Information</ProfileAccountHeader>
      <input type="checkbox" className="peer" id={personalInformationFormId} />

      <div className="peer-checked:hidden">
        <div className="my-2 flex flex-col gap-3">
          <ProfileDisplayField name={"Name"} value={"Ans Anonymo"} />
          <ProfileDisplayField name={"Email"} value={"ans.anonymo@gmail.com"} />
          <ProfileDisplayField name={"Phone"} value={"01888430193"} />
        </div>
      </div>

      <div className="hidden peer-checked:block">
        <PersonalInformationForm
          name={"Ans Anonymo"}
          email={"ans.anonymo@gmail.com"}
          phone={"01888430193"}
        />
      </div>

      <label
        htmlFor={personalInformationFormId}
        className="inline-block peer-checked:hidden my-3 px-3 py-2 bg-primary text-white rounded-sm cursor-pointer"
      >
        Update
      </label>
    </div>
  );
}

export default PersonalInformation;
