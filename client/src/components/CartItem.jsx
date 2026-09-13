import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

import Button from "./Button";
import QuantitySelector from "./QuantitySelector";

import useCartStore from "../store/cartStore";
import formatCurrency from "../utils/formatCurrency";

export default function CartItem({ item }) {
  const { updateCart, removeCart } = useCartStore();

  const { product, quantity, _id: cart_id } = item;
  const { title, slug, images, price, discountPrice, category } = product;

  const hasDiscount =
    discountPrice !== undefined &&
    discountPrice !== null &&
    discountPrice < price;

  const finalPrice = hasDiscount ? discountPrice : price;

  const handleIncrease = () => {
    updateCart(cart_id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateCart(cart_id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeCart(cart_id);
  };

  return (
    <div className="group rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-4 transition-all duration-300 hover:border-[#dfcfc3] hover:shadow-[0_8px_30px_rgba(109,91,77,0.07)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Product Image */}
        <Link
          to={`/products/${slug}`}
          className="shrink-0 self-start overflow-hidden rounded-xl"
        >
          <img
            src={images?.[0]?.url || "/placeholder.png"}
            alt={title}
            className="h-28 w-28 object-cover transition duration-500 group-hover:scale-105 sm:h-32 sm:w-32"
          />
        </Link>

        {/* Product Details */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div>
            <Link
              to={`/products/${slug}`}
              className="line-clamp-2 text-base font-semibold text-[#6d5b4d] transition hover:text-[#c98f84] sm:text-lg"
            >
              {title}
            </Link>

            {category && (
              <p className="mt-1 text-xs text-[#9a8879]">
                {typeof category === "object"
                  ? category.title
                  : category}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-lg font-semibold text-[#6d5b4d]">
              {formatCurrency(finalPrice)}
            </span>

            {hasDiscount && (
              <span className="text-sm text-[#a99a8d] line-through">
                {formatCurrency(price)}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          </div>
        </div>

        {/* Price & Remove */}
        <div className="flex items-center justify-between border-t border-[#eadfd5] pt-4 sm:flex-col sm:items-end sm:justify-between sm:border-t-0 sm:pt-0">
          <p className="text-base font-semibold text-[#6d5b4d] sm:text-lg">
            {formatCurrency(finalPrice * quantity)}
          </p>

          <Button
            variant="danger"
            onClick={handleRemove}
            className="!rounded-full !border !border-[#eadfd5] !bg-transparent !px-3 !py-2 !text-[#9a8879] transition hover:!border-[#e5c5bd] hover:!bg-[#fdf0ed] hover:!text-[#c98f84]"
          >
            <Trash2 size={17} />
            <span className="hidden sm:inline">Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
}