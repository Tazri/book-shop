import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AdminFileUploader from "../shared/formUi/AdminFileUploader";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import toast from "react-hot-toast";
import { base64Converter, convertImgUrlToBase64 } from "@/libs/converter";
import { updateCategoryApi } from "@/api/backend/categoryApi";
import { revlidatePathApi } from "@/api/commonApi";

function AdminSingleCategoryUpdateImg({ cancel, category, setCategory }) {
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const submitAction = async function (data) {
    setLoading(true);
    toast.dismiss();
    try {
      if (!data.file) {
        toast.error(
          "Something wrong when uploading file. Please upload the file again."
        );
      } else if (!data.file.length) {
        toast.error("There is no file. Please uplaod the file again.");
      } else {
        const file = data.file[0];
        const base64 = await base64Converter(file);

        const payload = { img: base64 };

        // update the file
        const response = await updateCategoryApi(category?._id, payload);
        const status = response.status;
        const json = await response.json();

        if (status !== 200) {
          toast.error("Failed to updated the category file. Please try again.");
        } else {
          setCategory(json?.updateCategory);
          await revlidatePathApi("/xyz/admin/allCategory");
          toast.success("File Update Successfully.");
          cancel();
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
    <form className="max-w-2xl" onSubmit={handleSubmit(submitAction)}>
      <Controller
        name="file"
        control={control}
        rules={{
          required: "Please select a PNG,JPEG,JPG or WEBP file under 1MB.",
        }}
        render={({ field }) => {
          return (
            <AdminFileUploader
              id="admin-category-file-upload"
              label="Upload a Image file."
              info="Please upload updated image for your category."
              onDrop={field.onChange}
              maxSize={1000000}
              setError={setError}
              clearErrors={clearErrors}
              maxWidth="20rem"
              error={errors["file"]}
              previewImg={previewImg}
              setPreviewImg={setPreviewImg}
            />
          );
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-3 flex-col gap-1 mt-2">
          <ButtonSpinner background="#ff5501" width="30px" padding="3px" />
          <p className="text-primary uppercase text-lg animate-pulse">
            Updating
          </p>
        </div>
      ) : (
        <div className="flex w-full gap-3 mt-2">
          <button
            className="text-white bg-red-600 w-full py-1"
            type="button"
            onClick={cancel}
          >
            Cancel
          </button>
          <button className="text-white bg-primary w-full">Update</button>
        </div>
      )}
    </form>
  );
}

export default AdminSingleCategoryUpdateImg;
