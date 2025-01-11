import { Controller, useForm } from "react-hook-form";
import AdminCancelAndSubmitButton from "../shared/btn/AdminCancelAndSubmitButton";
import AdminFileUploader from "../shared/formUi/AdminFileUploader";
import { useState } from "react";
import AdminUpdateLoading from "../shared/others/AdminUpdateLoading";
import toast from "react-hot-toast";
import { updateAuthorImgApi } from "@/api/backend/authorApi";
import { revlidatePathApi } from "@/api/commonApi";

function AdminAuthorUpdateImgForm({ cancel, setAuthor, author }) {
  const [previewImg, setPreviewImg] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const submitAction = async (formData) => {
    toast.dismiss();
    setLoading(true);
    try {
      const response = await updateAuthorImgApi(author?._id, previewImg);

      if (response === null) {
        toast.error("Something went wrong...");
      } else {
        const json = await response.json();
        const status = response.status;

        if (status === 200) {
          try {
            await revlidatePathApi("/xyz/admin/authors");
          } catch (err) {
            console.log("failed to refresh");
          }
          toast.success("Img update successfully.");
          setAuthor(json?.updatedAuthor);
          cancel();
        } else {
          toast.error(json?.msg || "Failed to update img.");
        }
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitAction)}>
      <Controller
        name="file"
        control={control}
        rules={{
          required: "Please select a PNG,JPEG,JPG or WEBP file under 1MB.",
        }}
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
      {loading ? (
        <AdminUpdateLoading />
      ) : (
        <AdminCancelAndSubmitButton
          enableSubmit={Boolean(previewImg)}
          cancel={cancel}
        />
      )}
    </form>
  );
}

export default AdminAuthorUpdateImgForm;
