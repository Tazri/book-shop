import React from "react";

function UpdateButton({ update }) {
  return (
    <button
      type="button"
      onClick={update}
      className="inline-block peer-checked:hidden my-0 px-2 s410:px-3 py-1 s410:py-2 bg-primary text-white rounded-sm cursor-pointer self-start text-sm s320:text-base duration-150"
    >
      Update
    </button>
  );
}

export default UpdateButton;
