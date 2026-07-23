import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-stone-300 bg-stone-50">
      <button
        aria-label="Decrease quantity"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-10 w-10 items-center justify-center transition hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus size={18} />
      </button>

      <span className="flex h-10 min-w-12.5 items-center justify-center border-x border-stone-300 font-semibold text-stone-800">
        {quantity}
      </span>

      <button
        aria-label="Increase quantity"
        onClick={onIncrease}
        className="flex h-10 w-10 items-center justify-center transition hover:bg-stone-200"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}