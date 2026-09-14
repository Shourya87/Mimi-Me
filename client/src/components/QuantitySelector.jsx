import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-[#E2D5C9] bg-[#FAF7F3] shadow-sm">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-10 w-10 items-center justify-center text-[#74533F] transition-all duration-200 hover:bg-[#F3E8DE] hover:text-[#5A3F2D] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={17} strokeWidth={1.8} />
      </button>

      <span className="flex h-10 min-w-12 items-center justify-center border-x border-[#E2D5C9] px-2 text-sm font-semibold text-[#4F3C30]">
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onIncrease}
        className="flex h-10 w-10 items-center justify-center text-[#74533F] transition-all duration-200 hover:bg-[#F3E8DE] hover:text-[#5A3F2D]"
      >
        <Plus size={17} strokeWidth={1.8} />
      </button>
    </div>
  );
}