import { useFieldArray, useForm } from "react-hook-form";
import AdminCancelAndSubmitButton from "../shared/btn/AdminCancelAndSubmitButton";
import AdminInputField from "../shared/formUi/AdminInputField";
import AdminButton from "../shared/btn/AdminButton";
import AdminUpdateLoading from "../shared/others/AdminUpdateLoading";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateAuthorDataApi } from "@/api/backend/authorApi";
import { revlidatePathApi } from "@/api/commonApi";

function AdminAuthorUpdatePropertyForm({ cancel, author, setAuthor }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otherProperty: objectToDefaultValues(author?.otherProperty || []),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "otherProperty",
  });
  const [loading, setLoading] = useState(false);

  const validateKey = (key, index) => {
    const trimmed = key.trim();
    if (trimmed !== key) return "Key cannot start or end with a space.";
    if (fields.some((field, i) => field.key === trimmed && i !== index))
      return "Key must be unique.";
    return true;
  };

  const submitAction = async (formData) => {
    setLoading(true);
    toast.dismiss();
    try {
      const payload = {
        otherProperty: defaultValuesToObject(formData.otherProperty),
      };

      const response = await updateAuthorDataApi(author?._id, payload);
      const json = await response.json();
      const status = response.status;

      if (status !== 200) {
        toast.error(json?.msg || "Something went wrong.");
      } else {
        await revlidatePathApi("/xyz/admin/authors");
        setAuthor(json?.updatedAuthor);
        toast.success("Successfully update author.");
        cancel();
      }
    } catch (err) {
      toast.error("Seomthing went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitAction)}>
      <p className="text-lg text-[#222222] mb-3">Author Property Edit</p>
      <div
        className={`flex flex-col gap-3 ${
          loading ? "pointer-events-none opacity-95" : ""
        }`}
      >
        {fields?.map((field, index) => {
          const key = field?.id;

          const keyInputName = `otherProperty.${index}.key`;
          const valueInputName = `otherProperty.${index}.value`;
          return (
            <div key={key} className="border-b  pb-2 border-b-[#cccccc]">
              <div className="grid grid-cols-1 gap-2 s500:grid-cols-2 duration-100">
                <AdminInputField
                  label="Key"
                  error={errors?.otherProperty?.[index]?.key}
                  {...register(keyInputName, {
                    validate: {
                      required: (value) =>
                        value.trim() !== "" || "Key is required.",
                      unique: (value) =>
                        validateKey(value, index) || "Key must be unique.",
                    },
                  })}
                  id={keyInputName}
                />
                <AdminInputField
                  label="Value"
                  error={errors?.otherProperty?.[index]?.value}
                  {...register(valueInputName, {
                    validate: {
                      required: (value) =>
                        value.trim() !== "" || "Value is required.",
                    },
                  })}
                />
              </div>
              <button
                onClick={() => remove(index)}
                type="button"
                className="bg-red-700 text-white py-1 px-2 mt-2 text-sm s500:text-base duration-100 select-none"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <button
        disabled={loading}
        type="button"
        onClick={() => {
          append({ key: "", value: "" }, { shouldFocus: true });
        }}
        className="py-1 px-2 text-white bg-emerald-700 my-2 text-sm s500:text-base duration-100 select-none"
      >
        Add Key
      </button>
      {loading ? (
        <AdminUpdateLoading />
      ) : (
        <AdminCancelAndSubmitButton cancel={cancel} />
      )}
    </form>
  );
}

function objectToDefaultValues(obj) {
  return Object.entries(obj).map(([key, value]) => ({
    key,
    value,
  }));
}

function defaultValuesToObject(defaultValues) {
  return defaultValues.reduce((obj, item) => {
    obj[item.key] = item.value;
    return obj;
  }, {});
}

export default AdminAuthorUpdatePropertyForm;
