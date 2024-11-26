import { useForm } from "react-hook-form";
import AdminCancelAndSubmitButton from "../shared/btn/AdminCancelAndSubmitButton";
import { useState } from "react";
import AdminInputField from "../shared/formUi/AdminInputField";
import { isValidAuthorDescription, isValidAuthorName } from "@/libs/validation";
import AdminTextAreaField from "../shared/formUi/AdminTextAreaField";
import AdminUpdateLoading from "../shared/others/AdminUpdateLoading";
import toast from "react-hot-toast";
import { updateAuthorDataApi } from "@/api/backend/authorApi";
import { revlidatePathApi } from "@/api/commonApi";

function AuthorEditNameDescription({ cancel, setAuthor, author }) {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: author?.name,
      description: author?.description || "",
    },
  });

  const formAction = async function (formData) {
    toast.dismiss();
    setLoading(true);
    try {
      const response = await updateAuthorDataApi(author?._id, formData);
      const json = await response.json();
      const status = response.status;

      if (status === 200) {
        toast.success("Successfully update.");
        await revlidatePathApi("/xyz/admin/authors");
        setAuthor(json?.updatedAuthor);
        cancel();
      } else {
        toast.error(json?.msg || "Something went wrong.");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(formAction)}>
      <AdminInputField
        {...register("name", {
          validate: (value) => {
            return isValidAuthorName(value);
          },
        })}
        label="Name"
        info="Author name must be under 20 characters. Not less than 3 characters."
        error={errors["name"]}
        id="admin-author-name"
      />

      <AdminTextAreaField
        {...register("description", {
          validate: (value) => {
            return isValidAuthorDescription(value);
          },
        })}
        label="Description"
        info={
          <>
            Description must be under <span className="font-bold">1200</span>{" "}
            characters.
          </>
        }
        error={errors["description"]}
        id="admin-author-description"
        className="h-40"
      />

      {loading ? (
        <AdminUpdateLoading />
      ) : (
        <AdminCancelAndSubmitButton enableSubmit={isDirty} cancel={cancel} />
      )}
    </form>
  );
}

export default AuthorEditNameDescription;
