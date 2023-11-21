export default function InputCom({
  label,
  type,
  placeholder,
  children,
  inputClasses,
  field,
  error = false,
  labelClasses = "text-qgray text-[13px] font-normal",
}) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block  mb-2 ${labelClasses || ""}`}
          htmlFor={field?.name}
        >
          {label}
        </label>
      )}
      <div
        className={`input-wrapper rounded-lg flex items-center border min-h-[40px] w-full h-full overflow-hidden relative ${
          error ? "border-qred" : "border-qgray-border"
        }`}
      >
        <input
          placeholder={placeholder}
          className={`input-field placeholder:text-sm text-sm px-4 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none ${
            inputClasses || ""
          }`}
          type={type}
          id={field?.name}
          {...field}
        />
        {children && children}
      </div>
    </div>
  );
}
