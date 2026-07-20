// src/components/ui/Input.jsx

import clsx from "clsx";

export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={id}
        aria-invalid={!!error}
        className={clsx(
          "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200",
          "placeholder:text-gray-400",
          "focus:border-pink-500 focus:ring-2 focus:ring-pink-200",
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}