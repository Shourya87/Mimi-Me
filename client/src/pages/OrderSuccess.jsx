import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <section className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {/* Success Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for shopping with <strong>Mimi &amp; Me</strong>.
          Your order has been received and is being processed.
        </p>

        <div className="mt-8 rounded-xl bg-pink-50 p-5">
          <p className="text-sm text-gray-600">
            You will receive an order confirmation email shortly.
          </p>

          <p className="mt-2 text-sm text-gray-600">
            We'll notify you when your order is packed, shipped, and
            delivered.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/orders"
            className="flex-1 rounded-lg bg-orange-600 px-6 py-3 text-center font-medium text-white transition hover:bg-orange-700"
          >
            View My Orders
          </Link>

          <Link
            to="/products"
            className="flex-1 rounded-lg border border-gray-300 px-6 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;