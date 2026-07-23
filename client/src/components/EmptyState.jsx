import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "./Button";

export default function EmptyState({
  title = "Your cart is empty",
  description = "Looks like you haven't added anything yet. Start shopping to fill your cart.",
  buttonText = "Continue Shopping",
  buttonLink = "/products",
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100">
        <ShoppingBag
          size={48}
          className="text-amber-700"
        />
      </div>

      <h2 className="mb-3 text-3xl font-bold text-stone-800">
        {title}
      </h2>

      <p className="mb-8 max-w-md text-stone-500">
        {description}
      </p>

      <Link to={buttonLink}>
        <Button>{buttonText}</Button>
      </Link>
    </div>
  );
}