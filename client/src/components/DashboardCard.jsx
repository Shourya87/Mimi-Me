const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-orange-500",
}) => {
  return (
    <div className="bg-white rounded-xl transition-shadow hover:shadow-md border p-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="mt-2 text-3xl font-bold text-gray-800">
          {typeof value === "number" ? value.toLocaleString("en-IN") : value}
        </h2>
      </div>

      {/* Right */}
      <div
        className={`w-14 h-14 rounded-full ${color} flex items-center justify-center`}
      >
        {Icon && <Icon size={28} className="text-white" />}
      </div>
    </div>
  );
};

export default DashboardCard;
