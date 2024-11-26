import React from "react";

function AdminPropertyDisplay({
  label = "Property",
  property = {
    Education: "SSC",
    Live: "Comilla",
    Description: "Lot of description here.",
  },
}) {
  const entries = Object.entries(property);
  return entries?.length > 0 ? (
    <div>
      {label && <p className="text-lg text-[#222222] mb-3">{label}</p>}
      <div className="overflow-x-scroll">
        <div className="grid grid-cols-12 text-[#333333] w-full min-w-[24rem] max-w-4xl s320:text-base text-sm duration-150 break-words">
          {/* key feild */}
          <div className="border-x border-y col-span-4 p-2 font-semibold">
            Key
          </div>
          <div className="border-r border-y col-span-7 p-2 font-semibold">
            Value
          </div>
          {entries?.map((entry, index) => {
            return (
              <Row
                value={entry[1]}
                propertykey={entry[0]}
                key={`${index}-${entry[0]}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-[#555555]">There is no propery.</div>
  );
}

function Row({ propertykey = "key", value = "value" }) {
  return (
    <>
      <div className="border-x border-b col-span-4 p-2 flex items-center">
        {propertykey}
      </div>
      <div className="border-b border-r col-span-7 p-2">{value}</div>
    </>
  );
}

export default AdminPropertyDisplay;
