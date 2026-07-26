import React from "react";
import CheckoutItem from "./CheckoutItem";

const OrderSummary = ({ items = [] }) => {
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between border-b pb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Order Summary
        </h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-500">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <CheckoutItem
              key={item._id}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;