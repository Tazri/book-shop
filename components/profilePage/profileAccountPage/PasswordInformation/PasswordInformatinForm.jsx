import AccountInputField from "../shared/AccountInputField";
import CancelAndSaveButton from "../shared/CancelAndSaveButton";

function PasswordInformatinForm({ cancel }) {
  return (
    <form className="flex flex-col gap-3">
      <AccountInputField />
      <CancelAndSaveButton cancel={cancel} />
    </form>
  );
}

export default PasswordInformatinForm;
