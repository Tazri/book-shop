import { useState } from "react";
import DisplayTextAreaField from "../shared/display/DisplayTextAreaField";
import DisplayTextField from "../shared/display/DisplayTextField";
import AdminButton from "../shared/btn/AdminButton";
import AuthorEditNameDescription from "./AuthorEditNameDescription";

function AdminSIngleAuthorNameAndDescription({ author, setAuthor }) {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <AuthorEditNameDescription
        setAuthor={setAuthor}
        author={author}
        cancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div>
      <DisplayTextField
        label={"Name"}
        info={"If you want to change author name then click on edit."}
        value={author?.name}
      />
      <DisplayTextAreaField
        label={"Description."}
        info={"If you want to change then click on edit."}
        value={author?.description}
      />
      <AdminButton handleClick={() => setIsEdit(true)}>Edit</AdminButton>
    </div>
  );
}

export default AdminSIngleAuthorNameAndDescription;
