import clsx from "clsx";

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold tracking-wide text-[#5F4A3A]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        aria-invalid={!!error}
        className={clsx(
          // Base
          "w-full rounded-2xl border bg-[#FFFCF8] px-5 py-3.5 text-[#3D2E22] shadow-sm transition-all duration-300 outline-none",

          // Border
          "border-[#E4D7C9]",

          // Placeholder
          "placeholder:text-[#A39384]",

          // Premium Focus
          "focus:border-[#A67C52] focus:bg-white focus:ring-4 focus:ring-[#EADCCB] focus:shadow-lg",

          // Hover
          "hover:border-[#C7AA88]",

          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-[#F6F2EC]",

          // Error
          error &&
            "border-red-400 focus:border-red-500 focus:ring-red-100",

          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}