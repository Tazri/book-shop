function ProfileDisplayField({ name, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[#222222]">{name} </p>
      <input
        readOnly
        className="border border-[#cccccc] p-2 bg-[#eeeeee] text-[#444444] focus:outline-none"
        value={value}
      />
    </div>
  );
}

export default ProfileDisplayField;
