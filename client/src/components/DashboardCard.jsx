import clsx from "clsx";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color = "brown",
}) => {
  const colorStyles = {
    brown: "bg-[#74533F] shadow-[#74533F]/15",
    rose: "bg-[#9A7660] shadow-[#9A7660]/15",
    mauve: "bg-[#806276] shadow-[#806276]/15",
    sage: "bg-[#60755F] shadow-[#60755F]/15",
    sand: "bg-[#9A7754] shadow-[#9A7754]/15",
    plum: "bg-[#765568] shadow-[#765568]/15",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] p-5 shadow-[0_8px_25px_rgba(109,91,77,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(109,91,77,0.09)]">
      {/* Left */}
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-[#8D7968]">
          {title}
        </p>

        <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#4F3C30] sm:text-3xl">
          {typeof value === "number"
            ? value.toLocaleString("en-IN")
            : value}
        </h2>
      </div>

      {/* Right */}
      <div
        className={clsx(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg",
          colorStyles[color] || colorStyles.brown,
        )}
      >
        {Icon && <Icon size={22} strokeWidth={1.8} className="text-white" />}
      </div>
    </div>
  );
};

export default DashboardCard;