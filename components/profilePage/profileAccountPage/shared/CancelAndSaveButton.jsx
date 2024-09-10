import React from "react";

function CancelAndSaveButton({ cancel = () => {}, save = () => {} }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="my-3 px-3 py-2 bg-rose-600 text-white rounded-sm cursor-pointer select-none"
        onClick={cancel}
      >
        cancel
      </button>
      <button className="my-3 px-3 py-2 bg-emerald-600 text-white rounded-sm select-none">
        Save
      </button>
    </div>
  );
}

export default CancelAndSaveButton;
