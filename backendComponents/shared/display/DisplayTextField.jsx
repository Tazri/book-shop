function DisplayTextField({ value, info, label }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-lg text-[#222222]">{label}</p>
      <p className="text-sm text-[#555555]">{info}</p>
      <input
        readOnly
        onChange={() => {}}
        value={value}
        className="border p-2 bg-[#eeeeee] text-xl text-[#333333] focus:outline-none"
      />
    </div>
  );
}

export default DisplayTextField;
