import { useRef, useState } from "react";

function AddressForm({
  cityAndArea,
  cityId,
  phone,
  handleCityIdSelect,
  handleAreaSelect,
  handleAddress,
  handlePhone,
  address,
  areaInput,
  formError,
}) {
  const allArea = cityId ? cityAndArea[cityId]?.area : {};
  const areaIds = Object.keys(allArea ?? {});

  return (
    <div className="gap-3 flex flex-col border p-3">
      <h2 className="pb-3 border-b text-base s280:text-lg text-[#222222] duration-150">
        Shipping Address
      </h2>

      {/* city select */}
      <div>
        <div
          className="w-full pr-3 bg-[#eeeeee]"
          style={{
            border: formError?.city ? "1px solid #f43f5e" : "",
          }}
        >
          <select
            className="w-full bg-transparent p-2 focus:outline-none cursor-pointer text-[#444444] text-sm s220:text-base  s450:text-lg duration-150"
            value={cityId}
            name="city"
            onChange={handleCityIdSelect}
          >
            <option value="">Select City</option>

            {Object.keys(cityAndArea)?.map((city) => {
              return (
                <option
                  key={cityAndArea[city]?.cityId}
                  value={cityAndArea[city]?.cityId}
                >
                  {cityAndArea[city]?.city}
                </option>
              );
            })}
          </select>
        </div>
        {formError?.city && (
          <p className="text-rose pb-2 text-rose-500">{formError?.city}</p>
        )}
      </div>

      {/* area select */}
      <div>
        <div
          className="w-full pr-3 bg-[#eeeeee]"
          style={
            formError?.area
              ? {
                  border: "1px solid #f43f5e",
                }
              : {}
          }
        >
          <select
            name="area"
            className="w-full bg-transparent p-2 focus:outline-none cursor-pointer text-[#444444] text-sm s220:text-base s450:text-lg duration-150"
            ref={areaInput}
            onChange={handleAreaSelect}
          >
            <option value={""}>Select Area</option>
            {areaIds.length
              ? areaIds?.map((areaId) => {
                  return (
                    <option value={areaId} key={areaId}>
                      {allArea[areaId]}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        {formError?.area && (
          <p className="text-rose pb-2 text-rose-500">{formError?.area}</p>
        )}
      </div>

      <div className="w-full">
        <input
          style={{
            border: formError?.phone ? "1px solid #f43f5e" : "",
          }}
          className="p-2 border-2 border-[#cccccc] w-full focus:outline-none text-[#444444] text-xs s185:text-sm s450:text-base"
          type="tel"
          name="phone"
          value={phone}
          onChange={handlePhone}
          placeholder="Enter Mobile Number"
        />
        {formError?.phone && (
          <p className="text-rose-500 pt-1 pb-2">{formError?.phone}</p>
        )}
      </div>

      <div>
        <textarea
          className="w-full border-2 border-[#cccccc] focus:outline-none min-h-32 p-2 text-[#444444] text-xs s185:text-sm s450:text-base"
          name="address"
          value={address}
          onChange={handleAddress}
          placeholder="Enter More Details of Your Address..."
          style={
            formError?.address
              ? {
                  border: "1px solid #f43f5e",
                }
              : {}
          }
        />
        {formError?.address && (
          <p className="text-rose-500 pt-1 pb-2">{formError?.address}</p>
        )}
      </div>
    </div>
  );
}

export default AddressForm;
