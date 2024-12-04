import React, { useState } from "react";
import AdminCancelAndSubmitButton from "../shared/btn/AdminCancelAndSubmitButton";
import { useForm } from "react-hook-form";
import AdminBirthDateField from "../shared/formUi/AdminBirthDateField";
import AdminDeathDateField from "../shared/formUi/AdminDeathDateField";
import AdminUpdateLoading from "../shared/others/AdminUpdateLoading";
import toast from "react-hot-toast";
import { updateAuthorDataApi } from "@/api/backend/authorApi";
import { revlidatePathApi } from "@/api/commonApi";

function AdminAuthorDateForm({ cancel, author, setAuthor }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm({
    defaultValues: {
      birthDate: author?.birthDate,
      deathDate: author?.deathDate,
    },
  });
  const [loading, setLoading] = useState(false);

  const formAction = async (formData) => {
    setLoading(true);
    toast.dismiss();
    try {
      const response = await updateAuthorDataApi(author?._id, formData);
      const json = await response.json();
      const status = response.status;

      if (status !== 200) {
        toast.error(json?.msg || "Something went wrong.");
      } else {
        await revlidatePathApi("/xyz/admin/authors");
        setAuthor(json?.updatedAuthor);
        toast.success("Update successfully.");
        cancel();
      }
    } catch (err) {
      toast.error("Someting went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isDirty =
    watch("birthDate") !== author?.birthDate ||
    watch("deathDate") !== author?.deathDate;

  return (
    <form onSubmit={handleSubmit(formAction)}>
      <AdminBirthDateField
        defaultDateValue={author?.birthDate}
        clearErrors={clearErrors}
        setValue={setValue}
        label="Date of Birth"
        info="If unknown or private then select unknown and private."
        defaultSelect={author?.birthDate}
        error={errors["birthDate"]}
        inputName="birthDate"
        id={"birthDate"}
        {...register("birthDate", { required: "Please select the date." })}
      />

      <AdminDeathDateField
        defaultDateValue={author?.deathDate}
        clearErrors={clearErrors}
        setValue={setValue}
        label="Date of Death"
        info="If unknown or private then select unknown and private."
        defaultSelect={author?.deathDate}
        error={errors["deathDate"]}
        inputName="deathDate"
        id={"deathDate"}
        {...register("deathDate", { required: "Please select the date." })}
      />

      {loading ? (
        <AdminUpdateLoading />
      ) : (
        <AdminCancelAndSubmitButton cancel={cancel} enableSubmit={isDirty} />
      )}
    </form>
  );
}

export default AdminAuthorDateForm;
