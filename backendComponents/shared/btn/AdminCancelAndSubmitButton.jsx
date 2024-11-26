function AdminCancelAndSubmitButton({
  cancel = () => {},
  submitText = "Save",
  cancelText = "Cancel",
  enableSubmit = true,
}) {
  return (
    <div className="flex gap-1 my-3">
      <button
        type="button"
        onClick={cancel}
        className="py-1 px-2 bg-red-700 text-white"
      >
        {cancelText}
      </button>
      <button
        disabled={!enableSubmit}
        className="py-1 px-2 bg-emerald-700 text-white disabled:opacity-80"
      >
        {submitText}
      </button>
    </div>
  );
}

export default AdminCancelAndSubmitButton;
