import { useState } from "react";
import AdminUpdateLoading from "../shared/others/AdminUpdateLoading";
import AdminButton from "../shared/btn/AdminButton";
import AdminAuthorUpdatePropertyForm from "./AdminAuthorUpdatePropertyForm";
import AdminPropertyDisplay from "../shared/formUi/AdminPropertyDisplay";

function AdminAuthorPropertyDisplay({ setAuthor, author }) {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <AdminAuthorUpdatePropertyForm
        author={author}
        setAuthor={setAuthor}
        cancel={() => setIsEdit(false)}
      />
    );
  }
  const totalKeys = Object.keys(author?.otherProperty).length;
  return (
    <div>
      {totalKeys > 0 ? (
        <AdminPropertyDisplay
          label="Author Property"
          property={author?.otherProperty}
        />
      ) : (
        <div className="text-[#555555]">
          There is no property. Please click on edit button to add property.
        </div>
      )}

      <AdminButton
        handleClick={() => {
          setIsEdit(true);
        }}
      >
        Edit
      </AdminButton>
    </div>
  );
}

export default AdminAuthorPropertyDisplay;
