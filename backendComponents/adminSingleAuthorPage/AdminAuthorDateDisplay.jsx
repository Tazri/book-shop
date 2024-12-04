import React, { useState } from "react";
import AdminAuthorDateForm from "./AdminAuthorDateForm";
import AdminButton from "../shared/btn/AdminButton";
import DisplayTextField from "../shared/display/DisplayTextField";
import { getDateDDMonthYYYY } from "@/libs/dateTime";

function AdminAuthorDateDisplay({ author, setAuthor }) {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <AdminAuthorDateForm
        setAuthor={setAuthor}
        author={author}
        cancel={() => setIsEdit(false)}
      />
    );
  }

  // birth date
  const birthDate = ["unknown", "private"].includes(author?.birthDate)
    ? author?.birthDate
    : getDateDDMonthYYYY(author?.birthDate);
  const deathDate = ["unknown", "alive"].includes(author?.deathDate)
    ? author?.deathDate
    : getDateDDMonthYYYY(author?.deathDate);

  return (
    <div>
      <DisplayTextField
        label="Birth of Date"
        info={"If you want to change then click on edit button."}
        value={birthDate?.toUpperCase()}
      />
      <DisplayTextField
        label="Death of Date"
        info={"If you want to change then click on edit button."}
        value={deathDate?.toUpperCase()}
      />
      <AdminButton handleClick={() => setIsEdit(true)}>Edit</AdminButton>
    </div>
  );
}

export default AdminAuthorDateDisplay;
