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
    "inline-flex items-center justify-center rounded-2xl font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-[#6F4E37] text-white shadow-lg shadow-[#6F4E37]/20 hover:bg-[#5A3F2D] hover:-translate-y-0.5 hover:shadow-xl focus:ring-[#DCC6AE]",

    secondary:
      "bg-[#F5EEE5] text-[#5A4636] border border-[#E2D5C7] hover:bg-[#EFE5D8] hover:border-[#C8AF93] focus:ring-[#E8D8C6]",

    outline:
      "border border-[#B89674] bg-white text-[#6F4E37] hover:bg-[#F9F5EF] hover:border-[#8B6B4A] hover:text-[#5A3F2D] focus:ring-[#E8D8C6]",

    ghost:
      "bg-transparent text-[#6F4E37] hover:bg-[#F7F1EA] hover:text-[#5A3F2D] focus:ring-[#E8D8C6]",

    danger:
      "bg-[#C84B4B] text-white hover:bg-[#AF3F3F] focus:ring-red-200",

    success:
      "bg-[#4F8A5B] text-white hover:bg-[#41724B] focus:ring-green-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      aria-busy={loading}
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}