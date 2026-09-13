import CheckoutItem from "./CheckoutItem";

const OrderSummary = ({ items = [] }) => {
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-5 shadow-[0_6px_24px_rgba(109,91,77,0.05)] sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between border-b border-[#eadfd5] pb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
            Checkout
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#6d5b4d]">
            Order Summary
          </h2>
        </div>

        <span className="rounded-full bg-[#f8ebe3] px-3 py-1 text-xs font-semibold text-[#c98f84]">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm font-medium text-[#6d5b4d]">
            Your cart is empty.
          </p>

          <p className="mt-1 text-xs text-[#9a8879]">
            Add some products to continue with checkout.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <CheckoutItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;