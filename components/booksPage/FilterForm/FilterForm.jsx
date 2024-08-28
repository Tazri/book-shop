const authorDropDownId = "author-drop-down-id";

function FilterForm() {
  return (
    <div className="w-fit min-w-72 px-1 my-2 min-h-96">
      <div>
        <input id={authorDropDownId} className="peer hidden" type="checkbox" />

        <label
          htmlFor={authorDropDownId}
          after={">"}
          className="flex justify-between items-center after:content-[attr(after)] after:text-lg after:duration-200 after:rotate-90 peer-checked:after:-rotate-90 select-none cursor-pointer border p-1.5"
        >
          Authors
        </label>
        <ul className="border-b border-x p-0 peer-checked:p-1.5 h-0 peer-checked:h-auto duration-200 origin-top overflow-hidden">
          <li>Ans Anonymo</li>
          <li>Arrobeen</li>
          <li>Sirious</li>
        </ul>
      </div>
    </div>
  );
}

export default FilterForm;
