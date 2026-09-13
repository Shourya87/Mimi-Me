import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";

export default function ProductCard({ product }) {
  const { title, slug, price, discountPrice, images } = product;

  const hasDiscount = discountPrice && discountPrice < price;

  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const productImage = images?.[0]?.url || "/placeholder.png";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(109,91,77,0.13)]">
      {/* =====================================================
          PRODUCT IMAGE
      ====================================================== */}
      <Link
        to={`/products/${slug}`}
        className="relative block overflow-hidden bg-[#f8ebe3]"
      >
        <div className="relative aspect-4/5 overflow-hidden">
          <img
            src={productImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Soft Image Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#4f4036]/20 via-transparent to-transparent opacity-60" />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute left-4 top-4 rounded-full bg-[#c98f84] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
              {discountPercentage}% Off
            </div>
          )}
        </div>
      </Link>

      {/* =====================================================
          PRODUCT DETAILS
      ====================================================== */}
      <div className="p-5">
        {/* Product Title */}
        <Link to={`/products/${slug}`}>
          <h2 className="line-clamp-2 min-h-[45px] text-[15px] font-medium leading-6 text-[#6d5b4d] transition-colors duration-300 hover:text-[#c98f84]">
            {title}
          </h2>
        </Link>

        {/* Price */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-semibold text-[#6d5b4d]">
            {formatCurrency(hasDiscount ? discountPrice : price)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-[#a99586] line-through">
              {formatCurrency(price)}
            </span>
          )}
        </div>

        {/* Discount Info */}
        {hasDiscount && (
          <p className="mt-1 text-xs font-medium text-[#9a8879]">
            You save {discountPercentage}%
          </p>
        )}

        {/* View Product */}
        <Link
          to={`/products/${slug}`}
          className="group/button mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dfc2b3] bg-[#f8ebe3] px-4 py-3 text-sm font-medium text-[#7d6a59] transition-all duration-300 hover:border-[#c98f84] hover:bg-[#c98f84] hover:text-white"
        >
          View Product

          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}