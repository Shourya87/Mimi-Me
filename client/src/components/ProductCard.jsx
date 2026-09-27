import { Link } from "react-router-dom";

import { ArrowUpRight } from "lucide-react";

import formatCurrency from "../utils/formatCurrency";

export default function ProductCard({ product }) {
  const {
    title,
    slug,
    price,
    discountPrice,
    images,
  } = product;

  const hasDiscount =
    discountPrice != null &&
    Number(discountPrice) > 0 &&
    Number(discountPrice) < Number(price);

  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(price) - Number(discountPrice)) /
          Number(price)) *
          100,
      )
    : 0;

  const productImage =
    images?.[0]?.url || "/placeholder.png";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_6px_24px_rgba(109,91,77,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(109,91,77,0.11)] sm:rounded-[20px]">
      {/* =====================================================
          PRODUCT IMAGE
      ====================================================== */}
      <Link
        to={`/products/${slug}`}
        className="relative block overflow-hidden bg-[#f8ebe3]"
      >
        <div className="relative aspect-[4/4.6] w-full overflow-hidden">
          <img
            src={productImage}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Soft Image Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-[#4f4036]/15 via-transparent to-transparent opacity-60" />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute left-3 top-3 rounded-full bg-[#c98f84] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white shadow-sm sm:left-3.5 sm:top-3.5 sm:px-3 sm:py-1.5 sm:text-[10px]">
              {discountPercentage}% Off
            </div>
          )}
        </div>
      </Link>

      {/* =====================================================
          PRODUCT DETAILS
      ====================================================== */}
      <div className="p-3.5 sm:p-4">
        {/* Product Title */}
        <Link to={`/products/${slug}`}>
          <h2 className="line-clamp-2 min-h-[42px] text-[14px] font-medium leading-5 text-[#6d5b4d] transition-colors duration-300 hover:text-[#c98f84] sm:text-[15px] sm:leading-6">
            {title}
          </h2>
        </Link>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-base font-semibold text-[#6d5b4d] sm:text-lg">
            {formatCurrency(
              hasDiscount ? discountPrice : price,
            )}
          </span>

          {hasDiscount && (
            <span className="text-xs text-[#a99586] line-through sm:text-sm">
              {formatCurrency(price)}
            </span>
          )}
        </div>

        {/* Discount Info */}
        {hasDiscount && (
          <p className="mt-1 text-[11px] font-medium text-[#9a8879] sm:text-xs">
            You save {discountPercentage}%
          </p>
        )}

        {/* View Product */}
        <Link
          to={`/products/${slug}`}
          className="group/button mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#dfc2b3] bg-[#f8ebe3] px-3 py-2.5 text-xs font-medium text-[#7d6a59] transition-all duration-300 hover:border-[#c98f84] hover:bg-[#c98f84] hover:text-white sm:mt-4 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
        >
          View Product

          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}