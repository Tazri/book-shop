"use client";
import AdminInputField from "../shared/formUi/AdminInputField";
import AdminTextAreaField from "../shared/formUi/AdminTextAreaField";
import AdminFileUploader from "../shared/formUi/AdminFileUploader";
import { Controller, useForm } from "react-hook-form";
import categoryValidationSchema from "@/validation/categoryValidationSchema";
import toast from "react-hot-toast";
import { base64Converter } from "@/libs/converter";
import { useState } from "react";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import { addCategoryApi } from "@/api/backend/categoryApi";
import { revlidatePathApi } from "@/api/commonApi";

const categoryNameSchema = categoryValidationSchema.shape.name;
const categoryDescriptonSchema = categoryValidationSchema.shape.description;

function AddCategoryForm() {
  const {
    register,
    control,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const resetForm = () => {
    reset();
    setPreviewImg(null);
  };

  const submitAction = async (formData) => {
    toast.dismiss();
    try {
      setLoading(true);
      const file = formData.file[0];
      const base64Image = await base64Converter(file);

      const payload = {
        name: formData.name,
        description: formData.description,
        img: base64Image,
        totalBooks: 0,
      };

      // upload it
      // resetForm();
      // send the payload and get the response
      const response = await addCategoryApi(payload);

      if (response === null) {
        toast.error("Something went wrong.");
      } else {
        const status = response.status;
        const json = await response.json();

        if (status === 200) {
          resetForm();

          try {
            await revlidatePathApi("/xyz/admin/allCategory");
          } catch (err) {
            console.log("Failed to refress");
          }

          toast.success("Category added successfully.");
        } else if (status === 409) {
          toast.error("The category name already exist. Try another name.");
          setError("name", {
            type: "manual",
            message: "The category name is already exist.",
          });
        } else if (status === 400) {
          toast.error("Please provide valid data.");
        } else {
          toast.error("Server side error.");
        }
      }
    } catch (err) {
      console.log(err.message);
      toast.error("something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="border p-2 mt-2 flex flex-col gap-3"
      onSubmit={handleSubmit(submitAction)}
    >
      <AdminInputField
        {...register("name", {
          required: "Please enter the name.",
          validate: (value) => {
            return isValidCategoryName(value);
          },
        })}
        label="Enter new category name."
        info="Please try to enter unique category name."
        placeholder="eg: Suspence, Story, Thriller"
        id="add-category-name"
        error={errors["name"]}
      />

      <AdminTextAreaField
        {...register("description", {
          validate: (value) => {
            return isValidCategoryDescription(value);
          },
        })}
        label="Category Description."
        info={
          <>
            What type of book this category hold.Also description under{" "}
            <span className="font-bold">1200</span> characters.
          </>
        }
        placeholder="Enter category descrtion like. For example : Science category hold only science and math relatated books."
        rows="4"
        error={errors["description"]}
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
                id="admin-category-file-upload"
                label="Upload a Image file."
                info="Please upload a image for your category."
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
      }

      <button
        disabled={loading}
        className="text-white bg-primary py-1 px-2 max-w-[50rem] flex items-center justify-center disabled:opacity-90 disabled:cursor-wait"
      >
        {loading ? <ButtonSpinner /> : "Add Category"}
      </button>
    </form>
  );
}

function isValidCategoryName(name) {
  const validationResult = categoryNameSchema.safeParse(name);

  if (validationResult.success) {
    return true;
  }
  const errors = validationResult.error.errors;
  const firstErrorMessage = errors[0].message;
  return firstErrorMessage;
}

function isValidCategoryDescription(description) {
  const validationResult = categoryDescriptonSchema.safeParse(description);

  if (validationResult.success) {
    return true;
  }
  const errors = validationResult.error.errors;
  const firstErrorMessage = errors[0].message;
  return firstErrorMessage;
}

export default AddCategoryForm;
