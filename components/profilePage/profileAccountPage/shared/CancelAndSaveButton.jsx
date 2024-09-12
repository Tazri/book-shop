import React from "react";

function CancelAndSaveButton({ disabled, cancel = () => {}, save = () => {} }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="my-3 px-3 py-2 bg-rose-600 text-white rounded-sm cursor-pointer select-none"
        onClick={cancel}
      >
        cancel
      </button>
      <button
        disabled={disabled}
        className="my-3 px-3 py-2 bg-emerald-600 text-white rounded-sm select-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </div>
  );
}

export default CancelAndSaveButton;
