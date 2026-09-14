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
          className="mb-2 block text-sm font-semibold tracking-wide text-[#4F3C30]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        aria-invalid={!!error}
        className={clsx(
          "w-full rounded-xl border bg-[#FAF7F3] px-4 py-3 text-sm text-[#4F3C30] shadow-sm outline-none transition-all duration-300",

          // Border
          "border-[#E2D5C9]",

          // Placeholder
          "placeholder:text-[#A39384]",

          // Hover
          "hover:border-[#D3B8A3]",

          // Focus
          "focus:border-[#B8957C] focus:bg-[#FFFCF9] focus:ring-4 focus:ring-[#F1E5DB] focus:shadow-md",

          // Disabled
          "disabled:cursor-not-allowed disabled:bg-[#F1ECE6] disabled:opacity-60",

          // Error
          error &&
            "border-[#C58A82] bg-[#FDF7F6] focus:border-[#A96860] focus:ring-[#F1DDDA]",

          className,
        )}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs font-medium text-[#A96860]">
          {error}
        </p>
      )}
    </div>
  );
}