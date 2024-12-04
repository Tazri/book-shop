import { useState } from "react";
import AdminPublisherEditForm from "./AdminPublisherEditForm";
import AdminButton from "../shared/btn/AdminButton";
import DisplayTextField from "../shared/display/DisplayTextField";
import DisplayTextAreaField from "../shared/display/DisplayTextAreaField";
import DisplayImageField from "../shared/display/DisplayImageField";

function AdminPublisherDataDisplayer({ publisher, setPublisher }) {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <AdminPublisherEditForm
        publisher={publisher}
        setPublisher={setPublisher}
        cancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div>
      <DisplayTextField
        value={publisher?.name}
        label={"Name"}
        info={"If you want to edit then click on edit button."}
      />

      <DisplayTextField
        value={publisher?.totalBooks}
        info="Total books in stock of this publisher."
        label="Total Books"
      />

      <DisplayTextAreaField
        value={publisher?.description}
        label={"Description"}
        info="If you want to edit then click on edit button."
      />

      <DisplayImageField
        src={publisher?.imgUrl}
        label="Publisher Icon"
        info="If you want to edit then click on edit button."
      />

      <AdminButton handleClick={() => setIsEdit(true)}>Edit</AdminButton>
    </div>
  );
}

export default AdminPublisherDataDisplayer;
