function AccountInputField({ children, error, name, id }) {
  return (
    <div className="flex-col flex gap-1">
      <label htmlFor={id} className="text-sm s410:text-base text-[#222222]">
        {name}
      </label>
      {children}
      {error && <p className="text-xs s410:text-sm text-rose-600">{error}</p>}
    </div>
  );
}

export default AccountInputField;
