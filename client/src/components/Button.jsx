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
    "inline-flex items-center justify-center rounded-xl font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-[#74533F] text-white shadow-[0_6px_18px_rgba(116,83,63,0.18)] hover:-translate-y-0.5 hover:bg-[#604330] hover:shadow-[0_10px_24px_rgba(116,83,63,0.22)] focus:ring-[#E8D8C6]",

    secondary:
      "border border-[#E4D6CA] bg-[#F3E8DE] text-[#5A4636] hover:-translate-y-0.5 hover:border-[#D3B8A3] hover:bg-[#EDE0D5] focus:ring-[#E8D8C6]",

    outline:
      "border border-[#CDB7A5] bg-[#FFFCF9] text-[#6F4E37] hover:-translate-y-0.5 hover:border-[#A98A72] hover:bg-[#F8F1EB] hover:text-[#5A3F2D] focus:ring-[#E8D8C6]",

    ghost:
      "bg-transparent text-[#74533F] hover:bg-[#F5EBE3] hover:text-[#5A3F2D] focus:ring-[#E8D8C6]",

    danger:
      "bg-[#9A5F58] text-white shadow-[0_6px_18px_rgba(154,95,88,0.15)] hover:-translate-y-0.5 hover:bg-[#834D48] focus:ring-[#EAD2CF]",

    success:
      "bg-[#60755F] text-white shadow-[0_6px_18px_rgba(96,117,95,0.15)] hover:-translate-y-0.5 hover:bg-[#506450] focus:ring-[#D9E3D7]",
  };

  const sizes = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm sm:text-base",
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
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span
            className={clsx(
              "h-4 w-4 animate-spin rounded-full border-2",
              variant === "secondary" ||
                variant === "outline" ||
                variant === "ghost"
                ? "border-[#BFAE9F] border-t-[#74533F]"
                : "border-white/40 border-t-white",
            )}
          />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}