"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../shared/modal/ConfirmDeleteModal";
import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import { deleteAuthorApi } from "@/api/backend/authorApi";
import { revlidatePathApi } from "@/api/commonApi";

function AdminAuthorDelete({ author }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const handleDeleteButton = () => {
    setLoading(true);
    setShowModal(true);
  };

  const handleCancelButton = () => {
    if (!deleteLoading) {
      setShowModal(false);
      setLoading(false);
      setDeleteLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(!deleteLoading);
    toast.dismiss();
    try {
      const response = await deleteAuthorApi(author?._id);
      const status = response.status;
      const json = await response.json();

      if (status !== 200) {
        toast.error(json.msg || "Something went wrong.");
      } else {
        await revlidatePathApi("/xyz/admin/authors");
        router.push("/xyz/admin/authors");
        toast.success("Category deleted successfully.");
        setLoading(false);
        setShowModal(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong.");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-[#222222] text-lg">
        Do you want to delete this author ?
      </h2>
      <p className="text-sm text-[#555555]">
        If you delete this author, You can{"'"}t restore the data about this
        category. so make sure to delete this author.
      </p>
      <button
        onClick={handleDeleteButton}
        className="bg-red-600 text-white w-full max-w-xs p-2 my-2 flex justify-center items-center"
      >
        {loading ? <ButtonSpinner /> : "Delete the Category"}
      </button>

      {showModal ? (
        <ConfirmDeleteModal
          deleteLoading={deleteLoading}
          deleteFunc={handleDelete}
          cancelFunc={handleCancelButton}
        >
          <div>
            <h3 className="text-[#333333] text-lg">
              Do you want to delete author{" "}
              <span className="font-bold">"{author?.name}"</span>
            </h3>
            <p className="text-[#555555] text-sm">
              If you want to delete{" "}
              <span className="font-bold">"{author?.name}"</span> author then
              click on delete button if not then click on cancel button.
            </p>
          </div>
        </ConfirmDeleteModal>
      ) : null}
    </div>
  );
}

export default AdminAuthorDelete;
