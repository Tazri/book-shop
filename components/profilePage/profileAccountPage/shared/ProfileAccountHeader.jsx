function ProfileAccountHeader({ children, up }) {
  return (
    <h2
      className={`text-sm s200:text-base s260:text-lg s410:text-xl text-[#333333] border-y py-2.5 my-2 duration-150 ${
        up ? "border-t-0" : ""
      }`}
    >
      {children}
    </h2>
  );
}

export default ProfileAccountHeader;
