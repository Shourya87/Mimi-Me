import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

import Button from "./Button";
import QuantitySelector from "./QuantitySelector";

import useCartStore from "../store/cartStore";

export default function CartItem({ item }) {
  const { updateCart, removeCart } = useCartStore();

  const { product, quantity, _id: cart_id } = item;

  const { title, slug, images, price, category, } = product;

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
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center">
      {/* Product Image */}
      <Link to={`/product/${slug}`} className="shrink-0">
        <img
          src={images?.[0]?.url}
          alt={title}
          className="h-28 w-28 rounded-xl object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col gap-2">
        <Link
          to={`/product/${slug}`}
          className="text-lg font-semibold text-stone-800 hover:text-amber-700"
        >
          {title}
        </Link>

        <p className="text-sm text-stone-500">{category}</p>

        <p className="text-xl font-bold text-amber-700">₹{price}</p>

        <QuantitySelector
          quantity={quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end gap-4">
        <p className="text-lg font-bold text-stone-900">
          ₹{price * quantity}
        </p>

        <Button
          variant="danger"
          onClick={handleRemove}
          className="flex items-center gap-2"
        >
          <Trash2 size={18} />
          Remove
        </Button>
      </div>
    </div>
  );
}
