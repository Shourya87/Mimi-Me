import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

import Button from "./Button";

import useWishlistStore from "../store/wishlistStore";
import useCartStore from "../store/cartStore";

export default function WishlistCard({ item }) {
  const { removeWishlist } = useWishlistStore();
  const { addCart } = useCartStore();

  const { product , _id: wishlist_id } = item;

  const { title, slug, images, price, category, _id } = product;

  const handleAddCart = async () => {
    await addCart(_id);
  };

  const handleRemove = async () => {
    await removeWishlist(wishlist_id);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg">
      {/* Product Image */}
      <Link to={`/product/${slug}`}>
        <img
          src={images?.[0]?.url}
          alt={title}
          className="h-62 w-full object-fill"
        />
      </Link>

      {/* Content */}
      <div className="space-y-3 p-5">
        <div>
          <Link
            to={`/product/${slug}`}
            className="text-lg font-semibold text-stone-800 hover:text-amber-700"
          >
            {title}
          </Link>

          <p className="mt-0.5 text-sm text-stone-500">
            {category}
          </p>
        </div>

        <p className="text-2xl font-bold text-amber-700">
          ₹{price}
        </p>

        <div className="flex gap-3">
          <Button
            onClick={handleAddCart}
            className="flex flex-1 items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </Button>

          <Button
            variant="outline"
            onClick={handleRemove}
            className="px-4"
          >
            <Heart
              size={18}
              className="fill-red-500 text-red-500"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}