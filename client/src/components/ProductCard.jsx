import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { title, slug, price, discountPrice, images } = product;

  const hasDiscount = discountPrice && discountPrice < price;

  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <Link to={`/products/${slug}`}>
        <img
          src={images?.[0]?.url}
          alt={title}
          className="h-72 w-full object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="space-y-3 p-4">
        {/* Product Title */}
        <Link to={`/products/${slug}`}>
          <h2 className="line-clamp-2 text-lg font-semibold text-gray-800 transition hover:text-pink-600">
            {title}
          </h2>
        </Link>

        {/* Product Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-pink-600">
            ₹{hasDiscount ? discountPrice : price}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ₹{price}
            </span>
          )}
        </div>

        {/* Discount Percentage */}
        {hasDiscount && (
          <p className="text-sm font-medium text-green-600">
            {discountPercentage}% OFF
          </p>
        )}

        {/* View Product Button */}
        <Link
          to={`/products/${slug}`}
          className="block rounded-lg bg-pink-600 px-4 py-2 text-center font-medium text-white transition hover:bg-pink-700"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}