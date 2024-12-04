import { useState } from "react";
import AdminButton from "../shared/btn/AdminButton";
import AdminCancelAndSubmitButton from "../shared/btn/AdminCancelAndSubmitButton";
import DisplayImageField from "../shared/display/DisplayImageField";
import AdminUpdateImgForm from "./AdminAuthorUpdateImgForm";
import AdminAuthorUpdateImgForm from "./AdminAuthorUpdateImgForm";

function AdminAuthorImgDisplay({ author, setAuthor }) {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <AdminAuthorUpdateImgForm
        setAuthor={setAuthor}
        author={author}
        cancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div>
      <DisplayImageField
        label="Author Image"
        info="If you want to update then click update button"
        src={author?.imgUrl}
      />

      <AdminButton handleClick={() => setIsEdit(true)}>Update</AdminButton>
    </div>
  );
}

export default AdminAuthorImgDisplay;
