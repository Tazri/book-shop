import FilterForm from "../FilterForm/FilterForm";

function BookDisplayer() {
  return (
    <div className="w-full max-w-60 mb-3">
      <div className="border px-3 py-2 w-full">
        <h5 className="px-1.5 mb-1.5">Filter</h5>
        <FilterForm />
      </div>
    </div>
  );
}

export default BookDisplayer;
