import { useEffect } from "react";

import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import WishlistCard from "../components/WishlistCard";

import useWishlistStore from "../store/wishlistStore";

export default function Wishlist() {
  const {
    wishlist,
    loading,
    error,
    getWishlist,
  } = useWishlistStore();

  useEffect(() => {
    getWishlist();
  }, [getWishlist]);

  if (loading) {
    return <Loader text="Loading Wishlist..." />;
  }

  if (error) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2] px-4">
        <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h2>

          <p className="mt-3 text-[#6B5B4D]">
            {error.message || "Unable to load wishlist."}
          </p>
        </div>
      </section>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <EmptyState
        title="Your Wishlist is Empty"
        description="Save your favorite products and they'll appear here."
        buttonText="Start Shopping"
        buttonLink="/shop"
      />
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#3E2D21]">
            My Wishlist
          </h1>

          <p className="mt-3 text-[#6F5B48]">
            {wishlist.length}{" "}
            {wishlist.length === 1 ? "Product" : "Products"} saved.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((item) => (
            <WishlistCard
              key={item.product._id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}