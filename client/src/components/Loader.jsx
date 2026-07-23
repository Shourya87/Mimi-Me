export default function Loader({ text = "Loading...", fullScreen = true }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      {/* Spinner */}
      <div className="relative">
        <div className="h-14 w-14 rounded-full border-4 border-[#E8D8C4]"></div>
        <div className="absolute inset-0 h-14 w-14 rounded-full border-4 border-transparent border-t-[#8B6F47] animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-5 text-sm font-medium tracking-wide animate-pulse text-[#6B5B4D]">
        {text}
      </p>
    </div>
  );
}
