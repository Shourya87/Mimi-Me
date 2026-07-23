import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  BadgeCheck,
  Heart,
  ImageOff,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import Button from "../components/Button";
import Loader from "../components/Loader";

import useProductStore from "../store/productStore";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='700' viewBox='0 0 600 700'%3E%3Crect width='600' height='700' fill='%23F1E9DD'/%3E%3C/svg%3E";

const formatCurrency = (value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";
  return num.toLocaleString("en-IN");
};

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { product, loading, error, getProductBySlug, clearProduct } =
    useProductStore();

  const { addToCart } = useCartStore();

  const { getWishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();

  const [selectedImage, setSelectedImage] = useState("");
  const [imageBroken, setImageBroken] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // --- Fix for the "Product Not Found" flash -------------------------------
  // Cart/wishlist actions can trigger re-renders where `product` from the
  // store is momentarily null/undefined (shared state churn, a stale
  // selector, etc). We keep a local snapshot of the last product that
  // actually loaded so a transient falsy value from the store can never
  // blank the page. The snapshot only resets when the slug itself changes.
  const [displayProduct, setDisplayProduct] = useState(null);
  const loadedSlugRef = useRef(null);

  useEffect(() => {
    if (product && product.slug === slug) {
      setDisplayProduct(product);
      loadedSlugRef.current = slug;
    }
  }, [product, slug]);

  useEffect(() => {
    if (!slug) return;

    // New product page: drop the old snapshot so we don't show stale data.
    if (loadedSlugRef.current !== slug) {
      setDisplayProduct(null);
    }

    getProductBySlug(slug);
    getWishlist();

    return () => clearProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (displayProduct?.images?.length) {
      setSelectedImage(displayProduct.images[0].url);
      setImageBroken(false);
    } else {
      setSelectedImage("");
      setImageBroken(false);
    }
  }, [displayProduct]);

  const handleAddToCart = useCallback(async () => {
    if (!displayProduct) return;
    try {
      setCartLoading(true);
      await addToCart(displayProduct._id);
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add to cart");
    } finally {
      setCartLoading(false);
    }
  }, [displayProduct, addToCart]);

  const handleWishlist = useCallback(async () => {
    if (!displayProduct) return;
    try {
      setWishlistLoading(true);

      if (isInWishlist(displayProduct._id)) {
        await removeFromWishlist(displayProduct._id);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(displayProduct._id);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  }, [displayProduct, isInWishlist, addToWishlist, removeFromWishlist]);

  const handleBuyNow = useCallback(async () => {
    if (!displayProduct || buyLoading) return;
    try {
      setBuyLoading(true);
      await addToCart(displayProduct._id);
      navigate("/cart");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to continue");
    } finally {
      setBuyLoading(false);
    }
  }, [displayProduct, buyLoading, addToCart, navigate]);

  const handleShare = useCallback(async () => {
    if (!displayProduct) return;

    const shareData = {
      title: displayProduct.title,
      text: displayProduct.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied");
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        toast.error("Unable to share");
      }
    }
  }, [displayProduct]);

  const ratingValue = useMemo(() => {
    const r = Number(displayProduct?.rating);
    return Number.isFinite(r) ? Math.min(5, Math.max(0, r)) : 0;
  }, [displayProduct]);

  // Only trust "loading" while we have no snapshot yet — once a product has
  // loaded once for this slug, background refetches shouldn't blank the UI.
  if (loading && !displayProduct) {
    return <Loader text="Loading Product..." />;
  }

  if (error && !displayProduct) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
        <div className="max-w-lg rounded-3xl border border-[#E8DED2] bg-white p-8 text-center shadow-xl sm:p-12">
          <h2 className="text-3xl font-bold text-[#3E3126] sm:text-4xl">
            Something went wrong
          </h2>
          <p className="mt-4 text-[#7D6B5A]">
            {error.message || "Unable to load product."}
          </p>
          <Link to="/shop" className="mt-8 inline-block">
            <Button>
              <ArrowLeft size={18} />
              Back to Shop
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  if (!displayProduct) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
        <div className="max-w-lg rounded-3xl border border-[#E8DED2] bg-white p-8 text-center shadow-xl sm:p-12">
          <h2 className="text-3xl font-bold text-[#3E3126] sm:text-4xl">
            Product Not Found
          </h2>
          <p className="mt-4 text-[#7D6B5A]">
            The product you are looking for doesn't exist.
          </p>
          <Link to="/shop" className="mt-8 inline-block">
            <Button>
              <ArrowLeft size={18} />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  const { title, description, price, discountPrice, images, stock, brand, category } =
    displayProduct;

  const hasDiscount =
    discountPrice != null &&
    Number(discountPrice) > 0 &&
    Number(discountPrice) < Number(price);

  const discountPercentage = hasDiscount
    ? Math.round(((Number(price) - Number(discountPrice)) / Number(price)) * 100)
    : 0;

  const outOfStock = !stock || stock <= 0;

  return (
    <section className="bg-gradient-to-br from-[#FBF8F3] via-[#F8F4EE] to-[#EEE4D8] py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          to="/shop"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 text-sm font-medium text-[#6B5540] shadow-md backdrop-blur-md transition hover:bg-[#8B6B4A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B4A] focus-visible:ring-offset-2 sm:mb-10 sm:px-5 sm:py-3 sm:shadow-lg"
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* IMAGE SECTION */}
          <div className="lg:sticky lg:top-24">
            <div className="group relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-[#E7DBCD] bg-white shadow-[0_20px_50px_rgba(94,72,50,0.12)] sm:max-w-lg sm:rounded-[34px] lg:max-w-none">
              <div className="aspect-[4/5] max-h-[70vh] w-full overflow-hidden bg-[#F5EFE5]">
                {imageBroken || !selectedImage ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#B39E85]">
                    <ImageOff size={36} />
                    <span className="text-sm font-medium">Image unavailable</span>
                  </div>
                ) : (
                  <img
                    src={selectedImage}
                    alt={title}
                    loading="eager"
                    onError={() => setImageBroken(true)}
                    className="h-full w-full object-cover duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              {hasDiscount && (
                <span className="absolute left-4 top-4 rounded-full bg-[#7C5C45] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg sm:left-5 sm:top-5">
                  {discountPercentage}% Off
                </span>
              )}
            </div>

            {images?.length > 1 && (
              <div className="mx-auto mt-5 flex max-w-md gap-3 overflow-x-auto pb-2 sm:max-w-lg lg:max-w-none">
                {images.map((image, index) => (
                  <button
                    key={image.url || index}
                    type="button"
                    onClick={() => {
                      setSelectedImage(image.url);
                      setImageBroken(false);
                    }}
                    aria-label={`View image ${index + 1} of ${title}`}
                    aria-pressed={selectedImage === image.url}
                    className={`shrink-0 overflow-hidden rounded-xl border-2 bg-white p-1 shadow-sm duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B4A] ${
                      selectedImage === image.url
                        ? "scale-105 border-[#8B6B4A]"
                        : "border-transparent hover:border-[#C9AE8F]"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${title} thumbnail ${index + 1}`}
                      className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS SECTION */}
          <div className="rounded-[28px] border border-[#E6D8C8] bg-white/90 p-5 shadow-[0_18px_50px_rgba(95,70,45,0.08)] backdrop-blur-sm sm:rounded-[34px] sm:p-8">
            {category?.title && (
              <span className="inline-flex rounded-full border border-[#D8C2A8] bg-[#F8F2EA] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#8B6B4A] sm:px-5 sm:py-2 sm:tracking-[0.2em]">
                {category.title}
              </span>
            )}

            <h1 className="mt-4 text-2xl font-bold leading-tight text-[#3E2D21] sm:mt-6 sm:text-3xl lg:text-4xl xl:text-[2.75rem]">
              {title}
            </h1>

            {brand && (
              <div className="mt-4 flex items-center gap-2 text-[#6F5B48] sm:mt-5">
                <BadgeCheck size={18} className="shrink-0 text-[#A67C52]" />
                <span className="text-sm sm:text-base">
                  Brand :
                  <span className="ml-2 font-semibold text-[#3E2D21]">
                    {brand}
                  </span>
                </span>
              </div>
            )}

            {/* Rating */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <div
                className="flex items-center gap-1 rounded-full bg-[#FFF8EF] px-3.5 py-1.5 shadow-sm sm:px-4 sm:py-2"
                role="img"
                aria-label={`Rated ${ratingValue.toFixed(1)} out of 5`}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < Math.round(ratingValue) ? "currentColor" : "none"}
                    className={
                      i < Math.round(ratingValue)
                        ? "text-[#D9A441]"
                        : "text-[#D9A441]/40"
                    }
                  />
                ))}
              </div>

              <span className="text-xs font-medium text-[#7A6755] sm:text-sm">
                {ratingValue.toFixed(1)} ★ • {displayProduct.reviewCount || 0} Reviews
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-8 flex flex-wrap items-end gap-3 sm:mt-10 sm:gap-5">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-extrabold tracking-tight text-[#6B4F3A] sm:text-4xl lg:text-5xl">
                    ₹{formatCurrency(discountPrice)}
                  </span>
                  <span className="text-lg text-[#A59384] line-through sm:text-2xl">
                    ₹{formatCurrency(price)}
                  </span>
                  <span className="rounded-full bg-[#7C5C45] px-4 py-1.5 text-xs font-bold text-white shadow-lg sm:px-5 sm:py-2 sm:text-sm">
                    Save {discountPercentage}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-extrabold tracking-tight text-[#6B4F3A] sm:text-4xl lg:text-5xl">
                  ₹{formatCurrency(price)}
                </span>
              )}
            </div>

            <p className="mt-2 text-xs text-[#9C8B7A]">Inclusive of all taxes</p>

            {/* STOCK */}
            <div className="mt-6 sm:mt-8">
              {!outOfStock ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EDF7EE] px-4 py-1.5 text-xs font-semibold text-[#2E7D32] sm:px-5 sm:py-2 sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-[#2E7D32]" />
                  In Stock ({stock})
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF0F0] px-4 py-1.5 text-xs font-semibold text-red-600 sm:px-5 sm:py-2 sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-red-600" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            {description && (
              <div className="mt-8 sm:mt-10">
                <h3 className="mb-3 text-lg font-semibold text-[#3D2E22] sm:mb-4 sm:text-xl">
                  Product Description
                </h3>
                <p className="text-sm leading-7 text-[#726252] sm:text-base sm:leading-8">
                  {description}
                </p>
              </div>
            )}

            {/* FEATURES */}
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
              <div className="rounded-2xl border border-[#E8DDD0] bg-[#FCFAF7] p-4 transition hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-5">
                <Truck size={24} className="mb-3 text-[#8B6B4A] sm:mb-4 sm:size-[26px]" />
                <h4 className="text-sm font-semibold text-[#3D2E22] sm:text-base">
                  Free Shipping
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-[#7B6A5B] sm:mt-2 sm:text-sm sm:leading-6">
                  Fast & secure delivery on every order.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8DDD0] bg-[#FCFAF7] p-4 transition hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-5">
                <ShieldCheck size={24} className="mb-3 text-[#8B6B4A] sm:mb-4 sm:size-[26px]" />
                <h4 className="text-sm font-semibold text-[#3D2E22] sm:text-base">
                  Secure Payment
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-[#7B6A5B] sm:mt-2 sm:text-sm sm:leading-6">
                  Safe checkout with encrypted payment.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E8DDD0] bg-[#FCFAF7] p-4 transition hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-5">
                <BadgeCheck size={24} className="mb-3 text-[#8B6B4A] sm:mb-4 sm:size-[26px]" />
                <h4 className="text-sm font-semibold text-[#3D2E22] sm:text-base">
                  Premium Quality
                </h4>
                <p className="mt-1.5 text-xs leading-5 text-[#7B6A5B] sm:mt-2 sm:text-sm sm:leading-6">
                  Carefully selected premium fabric & finish.
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 space-y-4 sm:mt-12 sm:space-y-6">
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button
                  size="lg"
                  disabled={outOfStock || cartLoading}
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl bg-[#6F4E37] py-3.5 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#5A3F2D] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:rounded-2xl sm:py-4"
                >
                  <ShoppingBag size={20} />
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  disabled={outOfStock || buyLoading}
                  onClick={handleBuyNow}
                  className="flex-1 rounded-xl border-[#B99776] bg-[#FAF6F1] py-3.5 text-[#6F4E37] transition-all duration-300 hover:bg-[#F1E7DB] disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-2xl sm:py-4"
                >
                  {buyLoading ? "Processing..." : "Buy Now"}
                </Button>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleWishlist}
                  disabled={wishlistLoading}
                  aria-pressed={isInWishlist(displayProduct._id)}
                  aria-label={
                    isInWishlist(displayProduct._id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E6D9CB] bg-white text-[#6F4E37] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#A67C52] hover:bg-[#F8F1E8] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B4A] sm:h-14 sm:w-14 sm:rounded-2xl"
                >
                  <Heart
                    size={20}
                    className={
                      isInWishlist(displayProduct._id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share this product"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E6D9CB] bg-white text-[#6F4E37] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#A67C52] hover:bg-[#F8F1E8] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6B4A] sm:h-14 sm:w-14 sm:rounded-2xl"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* TRUST BANNER */}
            <div className="mt-8 rounded-[22px] border border-[#E7D8C8] bg-gradient-to-r from-[#FDF9F4] via-[#F8F2EA] to-[#F3E8DA] p-5 sm:mt-12 sm:rounded-[28px] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-5">
                <div>
                  <h3 className="text-base font-semibold text-[#3E2D21] sm:text-lg">
                    Crafted with Premium Care
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#766454] sm:text-sm sm:leading-7">
                    Designed for comfort, elegance and everyday confidence.
                    Every piece is carefully selected to deliver a premium
                    shopping experience.
                  </p>
                </div>

                <div className="rounded-xl bg-[#6F4E37] px-5 py-2.5 text-center text-white shadow-lg sm:rounded-2xl sm:px-6 sm:py-3">
                  <p className="text-[10px] uppercase tracking-widest opacity-80 sm:text-xs">
                    Trusted
                  </p>
                  <p className="mt-1 text-base font-bold sm:text-lg">
                    10,000+ Customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





// import React, { useState, useEffect } from "react";
// import Button from "../components/Button";
// import Loader from "../components/Loader";

// import useProductStore from "../store/productStore";
// import useCartStore from "../store/cartStore";
// import useWishlistStore from "../store/wishlistStore";

// // --- SVG Icons ---
// const HeartIcon = ({ filled }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill={filled ? "#C86D51" : "none"}
//     stroke={filled ? "#C86D51" : "currentColor"}
//     strokeWidth="1.8"
//     className="w-5 h-5 transition-transform duration-300 hover:scale-110"
//   >
//     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//   </svg>
// );

// const StarIcon = ({ filled = true }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill={filled ? "#D4A373" : "#E6DCCF"}
//     className="w-4 h-4 inline-block"
//   >
//     <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//   </svg>
// );

// const CheckShieldIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#8C6D58]">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
//   </svg>
// );

// const TruckIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#8C6D58]">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12 0A2.25 2.25 0 0114.25 12h-1.5" />
//   </svg>
// );

// export default function ProductPage() {
//   const { currentProduct, isLoading: productLoading } = useProductStore();
//   const { addToCart, isLoading: cartLoading } = useCartStore();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedSize, setSelectedSize] = useState("250g");
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("notes");
//   const [toastMessage, setToastMessage] = useState("");

//   // E-commerce Product Data (Uses store data or falls back to demo data)
//   const product = currentProduct || {
//     id: "prod-cafe-01",
//     name: "Velvet Cream & Roasted Espresso Elixir",
//     tagline: "Slow-roasted Ethiopian Arabica infused with organic Madagascar vanilla pod and sweet Oat Cream.",
//     price: 34.00,
//     originalPrice: 42.00,
//     rating: 4.9,
//     reviewsCount: 128,
//     inStock: true,
//     sku: "CC-ROAST-01",
//     sizes: [
//       { label: "100g Bag", priceMultiplier: 0.6 },
//       { label: "250g Bag", priceMultiplier: 1.0 },
//       { label: "500g Reserve", priceMultiplier: 1.8 }
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop",
//     ],
//     details: {
//       notes: "Dark Chocolate, Sweet Whipped Cream, Hazelnut, Dried Cherries",
//       origin: "Yirgacheffe, Ethiopia & Antigua, Guatemala",
//       roast: "Medium-Smooth Cream Velvet Roast",
//       idealFor: "Espresso, French Press, Warm Latte rituals"
//     }
//   };

//   const isWishlisted = wishlist?.some((item) => item.id === product.id);

//   // Dynamic price based on size multiplier
//   const currentMultiplier = product.sizes.find(s => s.label === selectedSize)?.priceMultiplier || 1;
//   const calculatedUnitPrice = product.price * currentMultiplier;

//   const showToast = (msg) => {
//     setToastMessage(msg);
//     setTimeout(() => setToastMessage(""), 3000);
//   };

//   const handleWishlistToggle = () => {
//     if (isWishlisted) {
//       removeFromWishlist(product.id);
//       showToast("Removed from your wishlist");
//     } else {
//       addToWishlist(product);
//       showToast("Saved to your wishlist ♡");
//     }
//   };

//   const handleAddToCart = async () => {
//     await addToCart({
//       ...product,
//       price: calculatedUnitPrice,
//       selectedSize,
//       quantity,
//     });
//     showToast(`Added ${quantity}x item(s) to cart ✨`);
//   };

//   if (productLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FAF7F2] text-[#2C1A14] font-sans min-h-screen antialiased pb-24 lg:pb-12">
      
//       {/* Toast Notification */}
//       {toastMessage && (
//         <div className="fixed bottom-20 lg:bottom-8 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-8 z-50 bg-[#2C1A14] text-[#F4EFE6] text-xs sm:text-sm px-5 py-3 rounded-full shadow-2xl transition-all duration-300 animate-bounce flex items-center gap-2">
//           <span>✨</span> {toastMessage}
//         </div>
//       )}

//       {/* Top Banner */}
//       <div className="bg-[#2C1A14] text-[#F4EFE6] text-[11px] sm:text-xs py-2 px-4 text-center tracking-widest uppercase font-medium">
//         Free Silk Gift Box & Complimentary Express Shipping over $60
//       </div>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
//         {/* Breadcrumb Navigation */}
//         <nav className="text-xs text-[#8C6D58] mb-6 flex items-center gap-2">
//           <a href="/shop" className="hover:underline">Shop</a>
//           <span>/</span>
//           <a href="/category/coffee" className="hover:underline">Artisanal Coffee</a>
//           <span>/</span>
//           <span className="text-[#2C1A14] font-medium">{product.name}</span>
//         </nav>

//         <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16 items-start">
          
//           {/* LEFT: PRODUCT IMAGES */}
//           <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4">
//             {/* Gallery Thumbnails */}
//             <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 justify-start">
//               {product.images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedImage(idx)}
//                   className={`relative flex-shrink-0 w-16 h-20 lg:w-20 lg:h-24 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
//                     selectedImage === idx
//                       ? "border-[#2C1A14] shadow-md scale-95"
//                       : "border-transparent opacity-70 hover:opacity-100"
//                   }`}
//                 >
//                   <img src={img} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>

//             {/* Featured Image */}
//             <div className="relative flex-1 rounded-3xl overflow-hidden bg-[#F4EFE6] shadow-sm">
//               <img
//                 src={product.images[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-[420px] sm:h-[520px] lg:h-[600px] object-cover object-center transition-all duration-500"
//               />
//               <span className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#2C1A14]">
//                 Best Seller
//               </span>
//               <button
//                 onClick={handleWishlistToggle}
//                 className="absolute top-4 right-4 p-3 bg-[#FAF7F2]/90 backdrop-blur-md rounded-full shadow-md hover:scale-110 active:scale-95 transition-all"
//                 aria-label="Wishlist"
//               >
//                 <HeartIcon filled={isWishlisted} />
//               </button>
//             </div>
//           </div>

//           {/* RIGHT: BUY BOX & DETAILS */}
//           <div className="lg:col-span-5 mt-8 lg:mt-0 flex flex-col">
            
//             {/* Social Proof */}
//             <div className="flex items-center space-x-2 mb-2">
//               <div className="flex text-[#D4A373]">
//                 {[...Array(5)].map((_, i) => (
//                   <StarIcon key={i} />
//                 ))}
//               </div>
//               <span className="text-xs font-medium text-[#8C6D58]">
//                 {product.rating} ({product.reviewsCount} customer reviews)
//               </span>
//             </div>

//             <h1 className="text-3xl sm:text-4xl font-serif text-[#2C1A14] leading-tight">
//               {product.name}
//             </h1>

//             {/* Pricing */}
//             <div className="mt-3 flex items-baseline space-x-3">
//               <span className="text-2xl sm:text-3xl font-medium text-[#2C1A14]">
//                 ${(calculatedUnitPrice * quantity).toFixed(2)}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-base text-[#9C8275] line-through">
//                   ${(product.originalPrice * currentMultiplier * quantity).toFixed(2)}
//                 </span>
//               )}
//             </div>

//             <p className="mt-4 text-sm text-[#5A453C] leading-relaxed font-light">
//               {product.tagline}
//             </p>

//             {/* Urgency Indicator */}
//             <div className="mt-4 flex items-center space-x-2 text-xs font-medium text-[#C86D51]">
//               <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-ping"></span>
//               <span>18 people are viewing this blend right now</span>
//             </div>

//             <hr className="my-6 border-[#E6DCCF]" />

//             {/* Size Options */}
//             <div className="mb-6">
//               <label className="block text-xs uppercase font-medium text-[#5A453C] mb-2.5">
//                 Select Bag Size
//               </label>
//               <div className="grid grid-cols-3 gap-3">
//                 {product.sizes.map((sizeObj) => (
//                   <button
//                     key={sizeObj.label}
//                     onClick={() => setSelectedSize(sizeObj.label)}
//                     className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
//                       selectedSize === sizeObj.label
//                         ? "border-[#2C1A14] bg-[#2C1A14] text-[#F4EFE6] shadow-sm"
//                         : "border-[#E6DCCF] bg-[#F4EFE6]/50 text-[#5A453C] hover:border-[#9C8275]"
//                     }`}
//                   >
//                     {sizeObj.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Desktop Add to Cart Controls */}
//             <div className="hidden sm:flex items-center gap-3 mb-6">
//               {/* Quantity */}
//               <div className="flex items-center border border-[#E6DCCF] bg-[#F4EFE6]/60 rounded-2xl p-1">
//                 <button
//                   onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                   className="w-10 h-10 flex items-center justify-center text-base text-[#2C1A14] hover:bg-[#E8D8C8]/50 rounded-xl"
//                 >
//                   -
//                 </button>
//                 <span className="w-10 text-center font-medium text-sm text-[#2C1A14]">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => setQuantity((q) => q + 1)}
//                   className="w-10 h-10 flex items-center justify-center text-base text-[#2C1A14] hover:bg-[#E8D8C8]/50 rounded-xl"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* Add Button */}
//               <div className="flex-1">
//                 <Button
//                   onClick={handleAddToCart}
//                   disabled={cartLoading}
//                   className="w-full py-4 bg-[#2C1A14] hover:bg-[#422A21] text-[#F4EFE6] rounded-2xl text-sm font-medium shadow-md transition-all flex items-center justify-center"
//                 >
//                   {cartLoading ? <Loader size="small" /> : "Add To Bag"}
//                 </Button>
//               </div>
//             </div>

//             {/* E-Commerce Guarantee Grid */}
//             <div className="grid grid-cols-2 gap-3 p-4 bg-[#F4EFE6]/60 rounded-2xl border border-[#E6DCCF] mb-6">
//               <div className="flex items-center space-x-3">
//                 <TruckIcon />
//                 <div className="text-xs">
//                   <p className="font-semibold text-[#2C1A14]">Free Express Delivery</p>
//                   <p className="text-[#8C6D58] text-[11px]">On orders over $60</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <CheckShieldIcon />
//                 <div className="text-xs">
//                   <p className="font-semibold text-[#2C1A14]">Freshness Guarantee</p>
//                   <p className="text-[#8C6D58] text-[11px]">100% money back</p>
//                 </div>
//               </div>
//             </div>

//             {/* Accordion Tabs */}
//             <div className="border-t border-[#E6DCCF]">
//               <div className="border-b border-[#E6DCCF] py-3.5">
//                 <button
//                   onClick={() => setActiveTab(activeTab === "notes" ? "" : "notes")}
//                   className="w-full flex justify-between items-center text-left text-sm font-medium text-[#2C1A14]"
//                 >
//                   <span>Flavor Notes & Origin</span>
//                   <span>{activeTab === "notes" ? "−" : "+"}</span>
//                 </button>
//                 {activeTab === "notes" && (
//                   <div className="mt-2 text-xs sm:text-sm text-[#5A453C] space-y-1.5 font-light">
//                     <p><strong>Flavor Profile:</strong> {product.details.notes}</p>
//                     <p><strong>Harvest Origin:</strong> {product.details.origin}</p>
//                     <p><strong>Roast Degree:</strong> {product.details.roast}</p>
//                   </div>
//                 )}
//               </div>

//               <div className="border-b border-[#E6DCCF] py-3.5">
//                 <button
//                   onClick={() => setActiveTab(activeTab === "shipping" ? "" : "shipping")}
//                   className="w-full flex justify-between items-center text-left text-sm font-medium text-[#2C1A14]"
//                 >
//                   <span>Shipping & Returns</span>
//                   <span>{activeTab === "shipping" ? "−" : "+"}</span>
//                 </button>
//                 {activeTab === "shipping" && (
//                   <p className="mt-2 text-xs sm:text-sm text-[#5A453C] font-light">
//                     Orders are roasted fresh and dispatched within 24 hours. We offer a 30-day taste guarantee—if it doesn’t fit your brew preference, returns are complimentary.
//                   </p>
//                 )}
//               </div>
//             </div>

//           </div>

//         </div>
//       </main>

//       {/* MOBILE STICKY BUY BAR */}
//       <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#E6DCCF] z-40 flex items-center justify-between gap-3 shadow-2xl">
//         <div>
//           <p className="text-[10px] uppercase text-[#8C6D58]">Total Price</p>
//           <p className="text-lg font-semibold text-[#2C1A14]">
//             ${(calculatedUnitPrice * quantity).toFixed(2)}
//           </p>
//         </div>
//         <Button
//           onClick={handleAddToCart}
//           disabled={cartLoading}
//           className="flex-1 py-3 bg-[#2C1A14] text-[#F4EFE6] rounded-xl text-xs font-medium shadow-md"
//         >
//           {cartLoading ? <Loader size="small" /> : "Add To Bag"}
//         </Button>
//       </div>

//     </div>
//   );
// }