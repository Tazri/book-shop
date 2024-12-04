import React from "react";

function CancelAndSaveButton({ disabled, cancel = () => {}, save = () => {} }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="my-3 px-2 s410:px-3 py-1 s410:py-2 text-xs s320:text-sm bg-rose-600 text-white rounded-sm cursor-pointer select-none duration-150"
        onClick={cancel}
      >
        cancel
      </button>
      <button
        disabled={disabled}
        className="my-3 px-2 s410:px-3 py-1 s410:py-2 text-xs s320:text-sm bg-emerald-600 text-white rounded-sm select-none disabled:opacity-50 disabled:cursor-not-allowed duration-150"
      >
        Save
      </button>
    </div>
  );
}

export default CancelAndSaveButton;
