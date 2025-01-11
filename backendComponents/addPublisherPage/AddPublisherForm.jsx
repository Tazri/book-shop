"use client";

import { Controller, useForm } from "react-hook-form";
import AdminInputField from "../shared/formUi/AdminInputField";
import AdminTextAreaField from "../shared/formUi/AdminTextAreaField";
import { useState } from "react";
import AdminFileUploader from "../shared/formUi/AdminFileUploader";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import {
  isValidPublisherDescription,
  isValidPublisherName,
} from "@/validation/publisherValidationSchema";
import toast from "react-hot-toast";
import { addPublishersAPi } from "@/api/backend/publisherApi";
import { revlidatePathApi } from "@/api/commonApi";

function AddPublisherForm() {
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const resetForm = () => {
    reset();
    setPreviewImg(null);
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    toast.dismiss();
    try {
      const { file, ...payload } = formData;

      payload.img = previewImg;
      payload.totalBooks = 0;

      const response = await addPublishersAPi(payload);

      if (response === null) {
        toast.error("Something went wrong...");
      } else {
        const status = response.status;
        const json = await response.json();

        if (status === 200) {
          resetForm();

          try {
            await revlidatePathApi("/xyz/admin/allPublishers");
          } catch (err) {
            console.log("failed to refresh..");
          }

          toast.success("Publisher added successfully.");
        } else {
          toast.error(json?.msg || "Server side error.");
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
    <form
      className="border p-2 mt-2 flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <AdminInputField
        {...register("name", {
          validate: (value) => isValidPublisherName(value),
        })}
        error={errors["name"]}
        label="Enter publisher name."
        info={
          <>
            Publisher name must be between <span className="font-bold">1</span>{" "}
            to <span className="font-bold">20</span> characters.`
          </>
        }
      />

      <AdminTextAreaField
        {...register("description", {
          validate: (value) => isValidPublisherDescription(value),
        })}
        error={errors["description"]}
        label="Enter publisher description."
        info={
          <>
            Write about publishers.Also description under{" "}
            <span className="font-bold">1200</span> characters.
          </>
        }
        rows="4"
      />

      {/* drag and drop area */}
      {
        <Controller
          name="file"
          control={control}
          rules={{
            required: "Please select a PNG,JPEG,JPG or WEBP file under 1MB.",
          }}
          render={({ field }) => {
            return (
              <AdminFileUploader
                id="admin-publisher-file-upload"
                label="Upload a Image file."
                info="Please upload a image for your category."
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
      }

      <button
        disabled={loading}
        className="text-white bg-primary py-1 px-2 max-w-[50rem] flex items-center justify-center disabled:opacity-90 disabled:cursor-wait"
      >
        {loading ? <ButtonSpinner /> : "Add Publisher"}
      </button>
    </form>
  );
}

export default AddPublisherForm;
