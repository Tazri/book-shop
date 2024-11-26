import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AdminInputField from "../shared/formUi/AdminInputField";
import AdminTextAreaField from "../shared/formUi/AdminTextAreaField";
import AdminFileUploader from "../shared/formUi/AdminFileUploader";
import { convertImgUrlToBase64 } from "@/libs/converter";
import {
  isValidCategoryDescription,
  isValidCategoryName,
} from "@/libs/validation";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import toast from "react-hot-toast";
import { updateCategoryApi } from "@/api/backend/categoryApi";
import { revalidatePath } from "next/cache";
import { revlidatePathApi } from "@/api/commonApi";

function AdminSingleCategoryEdit({ cancel = () => {}, category, setCategory }) {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const formAction = async function (formData) {
    setLoading(true);
    toast.dismiss();

    // ready the payload
    const payload = {};

    if (formData.name !== category.name) payload.name = formData.name;
    if (formData.description !== category.description)
      payload.description = formData.description;

    try {
      const response = await updateCategoryApi(category?._id, payload);
      const status = response.status;
      const json = await response.json();

      if (status === 400) {
        toast.error(json?.msg || "Something went wrong.");
      } else if (200) {
        toast.success("Category updated successfully.");
        setCategory(json?.updateCategory);
        await revlidatePathApi("/xyz/admin/allCategory");
        cancel();
      } else {
        toast.error(
          "Something went wrong. Please check your internet connection"
        );
      }
    } catch (err) {
      console.log(err?.message);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isSame =
    watch("name") === category?.name &&
    watch("description") === category?.description;

  return (
    <form
      onSubmit={handleSubmit(formAction)}
      className="flex flex-col gap-2 max-w-2xl"
    >
      <AdminInputField
        {...register("name", {
          value: category?.name,
          validate: (value) => isValidCategoryName(value),
        })}
        error={errors["name"]}
        label="Category Name"
        info={"If you edit then provide valid category name."}
      />

      <AdminTextAreaField
        {...register("description", {
          value: category?.description,
          validate: (value) => isValidCategoryDescription(value),
        })}
        error={errors["description"]}
        label="Category Description"
        info={
          <>
            Make sure category description under{" "}
            <span className="font-bold">1200</span> characters.
          </>
        }
        className="h-60"
      />

      {loading ? (
        <div className="flex items-center justify-center py-3 flex-col gap-1">
          <ButtonSpinner background="#ff5501" width="30px" padding="3px" />
          <p className="text-primary uppercase text-lg animate-pulse">
            Updating
          </p>
        </div>
      ) : (
        <div className="flex w-full gap-3">
          <button
            className="text-white bg-red-600 w-full py-1"
            type="button"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            disabled={isSame}
            title={isSame ? "Nothing is change" : ""}
            className={`text-white bg-primary w-full ${
              isSame ? "opacity-85 cursor-not-allowed" : ""
            }`}
          >
            Update
          </button>
        </div>
      )}
    </form>
  );
}

export default AdminSingleCategoryEdit;
