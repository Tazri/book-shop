import React from "react";

function UpdateButton({ update }) {
  return (
    <button
      type="button"
      onClick={update}
      className="inline-block peer-checked:hidden my-0 px-3 py-2 bg-primary text-white rounded-sm cursor-pointer self-start"
    >
      Update
    </button>
  );
}

export default UpdateButton;
