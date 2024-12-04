import React from "react";

function AdminButton({ children, handleClick = () => {} }) {
  return (
    <button
      type="button"
      className="text-white bg-primary py-1 px-2 my-2 hover:opacity-95 duration-75"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default AdminButton;
