export default function PriceDetails({ items = [] }) {
  
  const totalMRP = items.reduce((total, item) => {
    const price = item.product ? item.product.price : item.price;

    return total + price * item.quantity;
  }, 0);

  const totalDiscount = items.reduce((total, item) => {
    const price = item.product ? item.product.price : item.price;

    const discountPrice = item.product
      ? item.product.discountPrice || item.product.price
      : item.discountPrice;

    return total + (price - discountPrice) * item.quantity;
  }, 0);

  const subtotal = totalMRP - totalDiscount;

  const shipping = subtotal >= 999 ? 0 : 99;

  const totalAmount = subtotal + shipping;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 border-b pb-3 text-lg font-semibold text-gray-800">
        Price Details
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Price ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
          <span>₹{totalMRP}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600">- ₹{totalDiscount}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>

          {shipping === 0 ? (
            <span className="font-medium text-green-600">FREE</span>
          ) : (
            <span>₹{shipping}</span>
          )}
        </div>

        <div className="my-3 border-t border-gray-400" />

        <div className="flex justify-between text-base font-semibold">
          <span>Total Amount</span>
          <span>₹{totalAmount.toLocaleString("en-IN")}</span>
        </div>

        {totalDiscount > 0 && (
          <p className="pt-2 text-sm font-medium text-green-500">
            You saved ₹{totalDiscount} on this order.
          </p>
        )}
      </div>
    </div>
  );
}
