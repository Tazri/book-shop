"use client";
import React, { useState } from "react";
import AdminInputField from "../shared/formUi/AdminInputField";
import { Controller, useForm } from "react-hook-form";
import AdminTextAreaField from "../shared/formUi/AdminTextAreaField";
import AdminBirthDateField from "../shared/formUi/AdminBirthDateField";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import { isValidAuthorDescription, isValidAuthorName } from "@/libs/validation";
import AdminDeathDateField from "../shared/formUi/AdminDeathDateField";
import AdminOthersDetails from "../shared/formUi/AdminOthersDetails";
import AdminFileUploader from "../shared/formUi/AdminFileUploader";
import toast from "react-hot-toast";
import { addAuthorAPi } from "@/api/backend/authorApi";
import { revlidatePathApi } from "@/api/commonApi";
import AdminOtherPropertyField from "../shared/formUi/AdminOtherPropertyField";
import { arrayOfKeyValueToObject } from "@/libs/converter";

function AddAuthorForm() {
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      otherProperty: [],
    },
  });

  const resetForm = function () {
    reset();
    setPreviewImg(null);
  };

  const submitAction = async (formData) => {
    setLoading(true);
    toast.dismiss();
    try {
      // make payload
      const { file, otherProperty, ...payload } = formData;

      payload.img = previewImg;
      payload.totalBooks = 0;
      payload.otherProperty = arrayOfKeyValueToObject(otherProperty);

      // send request
      const res = await addAuthorAPi(payload);
      if (res === null) {
        toast.error("Something went wrong.");
      } else {
        const status = res.status;
        const json = await res.json();

        if (status !== 200) {
          toast.error(json?.msg || "Something went wrong.");
        } else {
          try {
            await revlidatePathApi("/xyz/admin/authors");
          } catch (err) {
            console.log("failed to refresh..");
          }
          toast.success("Author create successfully.");
          resetForm();
        }
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border max-w-7xl p-2">
      <form
        className="max-w-5xl flex flex-col gap-2"
        onSubmit={handleSubmit(submitAction)}
      >
        <AdminInputField
          {...register("name", {
            validate: (value) => isValidAuthorName(value),
          })}
          error={errors["name"]}
          label="Author Name"
          id="name"
          info={
            <>
              Author name must be under <span className="font-bold">20</span>{" "}
              characters.
            </>
          }
        />

        <AdminTextAreaField
          {...register("description", {
            validate: (value) => isValidAuthorDescription(value),
          })}
          error={errors["description"]}
          label="Description"
          id="description"
          info={
            <>
              Description must be under <span className="font-bold">1200</span>{" "}
              characters. It{"'"}s optional.
            </>
          }
          required={false}
          className="min-h-28"
        />

        <AdminBirthDateField
          {...register("birthDate", { required: "Please select the date." })}
          error={errors["birthDate"]}
          label="Birth of Date"
          info="Please enter author birth date if you know. If private or unknown then select those."
          id="birthDate"
          clearErrors={clearErrors}
          inputName={"birthDate"}
          setValue={setValue}
        />

        <AdminDeathDateField
          {...register("deathDate", { required: "Please select the date." })}
          error={errors["deathDate"]}
          clearErrors={clearErrors}
          inputName="deathDate"
          label="Date of Death"
          info="Please enter author date of death. If alive or unknown then select alive or unknown."
          id="deathDate"
          setValue={setValue}
        />

        <AdminOtherPropertyField
          register={register}
          name="otherProperty"
          control={control}
          errors={errors}
          label="Author Key Property"
          required={false}
        />

        <div className="mt-2">
          {
            <Controller
              name="file"
              control={control}
              rules={{
                required:
                  "Please select a PNG,JPEG,JPG or WEBP file under 1MB.",
              }}
              render={({ field }) => {
                return (
                  <AdminFileUploader
                    id="admin-author-file-upload"
                    label="Upload a Image file."
                    info="Please upload author img."
                    onDrop={field.onChange}
                    maxSize={1000000}
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
        </div>

        <button
          disabled={loading}
          className="text-white bg-primary py-1 px-2 max-w-[50rem] flex items-center justify-center disabled:opacity-90 disabled:cursor-wait"
        >
          {loading ? <ButtonSpinner /> : "Add Author"}
        </button>
      </form>
    </div>
  );
}

export default AddAuthorForm;
