function ProfileAccountHeader({ children, up }) {
  return (
    <h2
      className={`text-xl text-[#333333] border-y py-2.5 my-2 ${
        up ? "border-t-0" : ""
      }`}
    >
      {children}
    </h2>
  );
}

export default ProfileAccountHeader;
