import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "./Button";

export default function EmptyState({
  title = "Your cart is empty",
  description = "Looks like you haven't added anything yet. Start shopping to fill your cart.",
  buttonText = "Continue Shopping",
  buttonLink = "/shop",
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F8F5F1] px-6 text-center">
      {/* Icon */}
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#E6D9CC] bg-[#F3E8DE]">
        <ShoppingBag size={36} className="text-[#8A6652]" strokeWidth={1.7} />
      </div>

      {/* Content */}
      <h2 className="text-2xl font-semibold tracking-tight text-[#4F3C30] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-2.5 max-w-md text-sm leading-6 text-[#8D7968] sm:text-base">
        {description}
      </p>

      {/* Action */}
      <Link to={buttonLink} className="mt-6">
        <Button size="md">{buttonText}</Button>
      </Link>
    </div>
  );
}