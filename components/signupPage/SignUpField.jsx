function SignUpField({ children, title = "Email", info, required, error }) {
  return (
    <div>
      <p className="text-[#222222] text-xs s260:text-sm s410:text-base xl:text-lg duration-150">
        {title}
        <span className="text-red-600">*</span>
      </p>
      {info && (
        <p className="text-[0.6rem] s260:text-xs xl:text-base text-[#555555] mb-2">
          {info}
        </p>
      )}
      <div>{children}</div>
      {error && (
        <p className="text-[0.6rem] s260:text-xs xl:text-base text-red-600 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

export default SignUpField;
