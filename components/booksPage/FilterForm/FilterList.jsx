import CheckBox from "./CheckBox";

const defaultFilterListData = {
  fieldName: "authors",
  title: "Authors",
  filterFields: [
    {
      name: "Ans Anonymo",
      value: "ans_anonymo",
    },
    {
      name: "Sirius",
      value: "sirius",
    },
    {
      name: "Arrowbeen",
      value: "arrowbeen",
    },
  ],
};

function FilterList({ defaultOpen, filterList = defaultFilterListData }) {
  const drawerId = filterList.fieldName + "-filter-drawer-id";
  return (
    <div>
      <input
        id={drawerId}
        className="peer hidden"
        type="checkbox"
        defaultChecked={defaultOpen}
      />

      <label
        htmlFor={drawerId}
        after={">"}
        className="flex justify-between items-center after:content-[attr(after)] after:text-lg after:duration-200 after:rotate-90 peer-checked:after:-rotate-90 select-none cursor-pointer border p-1.5 text-[0.9rem] duration-200 text-[#212121]"
      >
        {filterList?.title}
      </label>

      <div className="peer-checked:border-b border-x p-0 peer-checked:p-1.5 h-0 peer-checked:h-auto duration-200 overflow-hidden">
        <ul className="flex flex-col gap-1 h-fit max-h-72 overflow-y-scroll filter-scroll  duration-200 origin-top text-xs s250:text-sm s340:text-[0.9rem] text-[#202020] leading-normal">
          {filterList?.filterFields?.map((fields, index) => {
            const key =
              String(index) + String(fields.value) + filterList.fieldName;
            return (
              <li key={key} className="cursor-pointer">
                <CheckBox
                  value={fields.value}
                  name={filterList.fieldName}
                  display={fields.name}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default FilterList;
