import clsx from "clsx";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-400",

    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",

    outline:
      "border border-pink-500 text-pink-500 hover:bg-pink-50 focus:ring-pink-400",

    ghost: "bg-transparent text-pink-500 hover:bg-pink-50 focus:ring-pink-400",

    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",

    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      aria-busy={loading}
      type={type}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
