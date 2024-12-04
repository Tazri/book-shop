import ButtonSpinner from "@/components/shared/spinner/ButtonSpinner";
import React from "react";

function AdminUpdateLoading() {
  return (
    <div className="flex items-center justify-center py-3 flex-col gap-1 mt-2">
      <ButtonSpinner background="#ff5501" width="30px" padding="3px" />
      <p className="text-primary uppercase text-lg animate-pulse">Updating</p>
    </div>
  );
}

export default AdminUpdateLoading;
