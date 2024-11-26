import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import { IoIosClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function ConfirmDeleteModal({
  deleteFunc = () => {},
  cancelFunc = () => {},
  children,
  deleteLoading,
}) {
  return (
    <div>
      {/* bg */}
      <div
        className=" absolute left-0 top-0 w-screen h-screen bg-black opacity-80"
        onClick={cancelFunc}
      ></div>

      {/* content */}
      <div className="bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
        <div className="border-b py-2">
          <div className="flex justify-between items-center p-2 text-[#444444]">
            <p className="text-lg flex items-center gap-2">
              {" "}
              <RiDeleteBin6Line className="text-red-600" />
              <span>DELETE</span>
            </p>
            <button className="text-3xl" onClick={cancelFunc}>
              <IoIosClose />
            </button>
          </div>
        </div>

        <div className="p-3">{children}</div>

        <div className="flex flex-row-reverse gap-2 p-2">
          <button
            className={`bg-red-600 px-2 py-1 text-white relative ${
              deleteLoading ? "cursor-wait" : ""
            }`}
            onClick={deleteFunc}
            disabled={deleteLoading}
          >
            <span
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                deleteLoading ? "opacity-100" : "opacity-0"
              }`}
            >
              <ButtonSpinner />
            </span>
            <span className={deleteLoading ? "opacity-0" : ""}>Delete</span>
          </button>
          <button
            className="bg-orange-600 text-white px-2 py-1"
            onClick={cancelFunc}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
