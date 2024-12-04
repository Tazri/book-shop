import { Controller, useForm } from "react-hook-form";
import AdminCancelAndSubmitButton from "../shared/btn/AdminCancelAndSubmitButton";
import AdminInputField from "../shared/formUi/AdminInputField";
import AdminTextAreaField from "../shared/formUi/AdminTextAreaField";
import { useState } from "react";
import AdminFileUploader from "../shared/formUi/AdminFileUploader";
import {
  isValidPublisherDescription,
  isValidPublisherName,
} from "@/validation/publisherValidationSchema";

function AdminPublisherEditForm({
  cancel = () => {},
  publisher,
  setPublisher,
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: publisher?.name,
      description: publisher?.description,
      file: undefined,
    },
  });
  const [previewImg, setPreviewImg] = useState(publisher?.imgUrl);

  const onSubmit = async (formData) => {
    const { file, ...payload } = formData;

    if (file) {
      payload.img = previewImg;
    }

    console.log(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <AdminInputField
        label="Name"
        info="Publisher name must be between 1 to 20 character."
        id="publisher-name"
        error={errors["name"]}
        {...register("name", { validate: isValidPublisherName })}
      />

      <AdminTextAreaField
        label="Description"
        info={
          <>
            Description must be under <span className="font-bold">1200</span>{" "}
            characters.
          </>
        }
        rows="8"
        error={errors["description"]}
        id="publisher-description"
        {...register("description", { validate: isValidPublisherDescription })}
      />

      <Controller
        name="file"
        control={control}
        render={({ field }) => {
          return (
            <AdminFileUploader
              id="admin-author-file-upload"
              label="Upload Author img file."
              info="Please upload updated image for your author."
              onDrop={field.onChange}
              maxSize={1000000}
              maxWidth="20rem"
              error={errors["file"]}
              previewImg={previewImg}
              setPreviewImg={setPreviewImg}
            />
          );
        }}
      />

      <AdminCancelAndSubmitButton enableSubmit={isDirty} cancel={cancel} />
    </form>
  );
}

export default AdminPublisherEditForm;
