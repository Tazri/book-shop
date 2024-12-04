function ProfileDisplayField({ name, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[#222222] text-sm s410:text-base">{name} </p>
      <input
        readOnly
        className="border border-[#cccccc] text-[0.65rem]  s200:text-xs  s240:text-sm s410:text-base  p-1.5 s350:p-2 bg-[#eeeeee] text-[#444444] focus:outline-none duration-150"
        value={value}
      />
    </div>
  );
}

export default ProfileDisplayField;
