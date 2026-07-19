import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useProductStore from "../store/productStore";

export default function ProductDetails() {
  const { slug } = useParams();

  const {
    product,
    loading,
    error,
    getProductBySlug,
    clearProduct,
  } = useProductStore();

  useEffect(() => {
    getProductBySlug(slug);

    return () => clearProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold">Something went wrong</h2>
        <p className="text-gray-500">error</p>

        <Link
          to="/shop"
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold">Product Not Found</h2>

        <Link
          to="/shop"
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    discountPrice,
    images,
    stock,
    brand,
    category,
  } = product;

  const hasDiscount = discountPrice && discountPrice < price;

  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={images?.[0]?.url}
            alt={title}
            className="h-150 w-full rounded-2xl object-cover"
          />

          {images?.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={title}
                  className="h-28 w-full rounded-xl object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm uppercase tracking-wider text-gray-500">
            {category?.title}
          </p>

          <h1 className="text-4xl font-bold">{title}</h1>

          {brand && (
            <p className="mt-2 text-gray-600">
              Brand: <span className="font-medium">{brand}</span>
            </p>
          )}

          <div className="mt-6 flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-bold">
                  ₹{discountPrice}
                </span>

                <span className="text-xl text-gray-400 line-through">
                  ₹{price}
                </span>

                <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                  {discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">
                ₹{price}
              </span>
            )}
          </div>

          <div className="mt-5">
            {stock > 0 ? (
              <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
                In Stock ({stock})
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-4 py-2 text-red-600">
                Out of Stock
              </span>
            )}
          </div>

          <p className="mt-8 leading-8 text-gray-600">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              className="rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:opacity-90"
              disabled={stock === 0}
            >
              Add to Cart
            </button>

            <button
              className="rounded-xl border px-8 py-4 font-semibold transition hover:bg-gray-100"
              disabled={stock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}