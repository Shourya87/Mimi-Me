export default function Loader({
  text = "Loading...",
  fullScreen = true,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-[#F8F5F1] ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      {/* Spinner */}
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-[3px] border-[#E6D9CC]" />

        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#74533F]" />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-xs font-medium tracking-[0.08em] text-[#806F60]">
        {text}
      </p>
    </div>
  );
}