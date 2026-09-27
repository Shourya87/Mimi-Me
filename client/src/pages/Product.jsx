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
  Zap,
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

  const { addCart } = useCartStore();

  const {
    getWishlist,
    addWishlist,
    removeWishlist,
    isInWishlist,
    getWishlistItem,
  } = useWishlistStore();

  const [selectedImage, setSelectedImage] = useState("");
  const [imageBroken, setImageBroken] = useState(false);

  const [cartLoading, setCartLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  /*
   * Keep a local snapshot of the last successfully loaded product.
   * This prevents the page from briefly showing "Product Not Found"
   * when cart or wishlist state causes the product store to re-render.
   */
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

    // Clear the previous product when navigating to another slug.
    if (loadedSlugRef.current !== slug) {
      setDisplayProduct(null);
    }

    getProductBySlug(slug);
    getWishlist();

    return () => clearProduct();

    // Intentionally run only when slug changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (displayProduct?.images?.length) {
      setSelectedImage(displayProduct.images[0]?.url || "");
      setImageBroken(false);
    } else {
      setSelectedImage("");
      setImageBroken(false);
    }
  }, [displayProduct]);

  const handleAddCart = useCallback(async () => {
    if (!displayProduct || cartLoading) return;

    try {
      setCartLoading(true);

      await addCart(displayProduct._id);

      toast.success("Added to cart");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add to cart.");
    } finally {
      setCartLoading(false);
    }
  }, [displayProduct, cartLoading, addCart]);

  const handleWishlist = useCallback(async () => {
    if (!displayProduct || wishlistLoading) return;

    try {
      setWishlistLoading(true);

      if (isInWishlist(displayProduct._id)) {
        const wishlistItem = getWishlistItem(displayProduct._id);

        if (wishlistItem?._id) {
          await removeWishlist(wishlistItem._id);
          toast.success("Removed from wishlist");
        }
      } else {
        await addWishlist(displayProduct._id);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setWishlistLoading(false);
    }
  }, [
    displayProduct,
    wishlistLoading,
    isInWishlist,
    getWishlistItem,
    addWishlist,
    removeWishlist,
  ]);

  const handleBuyNow = useCallback(async () => {
    if (!displayProduct || buyLoading) return;

    try {
      setBuyLoading(true);

      await addCart(displayProduct._id);

      navigate("/cart");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to continue.");
    } finally {
      setBuyLoading(false);
    }
  }, [displayProduct, buyLoading, addCart, navigate]);

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
        toast.error("Unable to share.");
      }
    }
  }, [displayProduct]);

  const ratingValue = useMemo(() => {
    const rating = Number(displayProduct?.rating);

    return Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 0;
  }, [displayProduct]);

  if (loading && !displayProduct) {
    return <Loader text="Loading Product..." />;
  }

  if (error && !displayProduct) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F8F5F1] px-6">
        <div className="w-full max-w-lg rounded-3xl border border-[#E8DDD2] bg-[#FFFCF9] p-8 text-center shadow-[0_20px_60px_rgba(109,91,77,0.08)] sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4E8DF] text-[#8B6B5A]">
            <ImageOff size={25} />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-[#4A3A2F] sm:text-4xl">
            Something went wrong
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#8A7768] sm:text-base">
            {error.message || "Unable to load product."}
          </p>

          <Link to="/shop" className="mt-8 inline-block">
            <Button className="rounded-xl bg-[#7A5C48] text-white hover:bg-[#654A39]">
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
      <section className="flex min-h-screen items-center justify-center bg-[#F8F5F1] px-6">
        <div className="w-full max-w-lg rounded-3xl border border-[#E8DDD2] bg-[#FFFCF9] p-8 text-center shadow-[0_20px_60px_rgba(109,91,77,0.08)] sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4E8DF] text-[#8B6B5A]">
            <ShoppingBag size={25} />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-[#4A3A2F] sm:text-4xl">
            Product Not Found
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#8A7768] sm:text-base">
            The product you are looking for doesn't exist.
          </p>

          <Link to="/shop" className="mt-8 inline-block">
            <Button className="rounded-xl bg-[#7A5C48] text-white hover:bg-[#654A39]">
              <ArrowLeft size={18} />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </section>
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
  } = displayProduct;

  const hasDiscount =
    discountPrice != null &&
    Number(discountPrice) > 0 &&
    Number(discountPrice) < Number(price);

  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(price) - Number(discountPrice)) / Number(price)) * 100,
      )
    : 0;

  const outOfStock = !stock || stock <= 0;

  const productInWishlist = isInWishlist(displayProduct._id);

  return (
    <section className="min-h-screen bg-[#F8F5F1] py-5 sm:py-7 lg:py-9">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-6">
        {/* BACK TO SHOP */}
        <Link
          to="/shop"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E6D9CC] bg-[#FFFCF9] px-3.5 py-2 text-xs font-medium text-[#725B49] shadow-sm transition-all duration-300 hover:border-[#B9967B] hover:bg-[#F5EBE2] sm:mb-6 sm:px-4 sm:py-2.5 sm:text-sm"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 xl:gap-10">
          {/* =====================================================
              IMAGE SECTION
          ====================================================== */}
          <div className="lg:sticky lg:top-20">
            <div className="group relative mx-auto w-full max-w-85 overflow-hidden rounded-2xl border border-[#E5D8CA] bg-[#FFFCF9] shadow-[0_14px_40px_rgba(109,91,77,0.10)] sm:rounded-3xl lg:max-w-92.5">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F1E9DD]">
                {imageBroken || !selectedImage ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#AA9582]">
                    <ImageOff size={32} />

                    <span className="text-xs font-medium">
                      Image unavailable
                    </span>
                  </div>
                ) : (
                  <img
                    src={selectedImage}
                    alt={title}
                    loading="eager"
                    onError={() => setImageBroken(true)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                )}

                {/* DISCOUNT BADGE */}
                {hasDiscount && (
                  <span className="absolute left-3 top-3 rounded-full bg-[#7A5C48] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md sm:left-4 sm:top-4 sm:px-3.5 sm:py-1.5 sm:text-xs">
                    {discountPercentage}% Off
                  </span>
                )}
              </div>
            </div>

            {/* IMAGE THUMBNAILS */}
            {images?.length > 1 && (
              <div className="mx-auto mt-3 flex max-w-85 gap-2 overflow-x-auto pb-1 sm:mt-4 sm:max-w-92.5 sm:gap-2.5">
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
                    className={`shrink-0 overflow-hidden rounded-lg border-2 bg-[#FFFCF9] p-0.5 shadow-sm transition-all duration-300 ${
                      selectedImage === image.url
                        ? "scale-105 border-[#9A7660]"
                        : "border-transparent hover:border-[#C9AF9A]"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${title} thumbnail ${index + 1}`}
                      className="h-14 w-14 rounded-md object-cover sm:h-16 sm:w-16"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =====================================================
              PRODUCT DETAILS
          ====================================================== */}
          <div className="rounded-2xl border border-[#E5D8CA] bg-[#FFFCF9] p-5 shadow-[0_14px_40px_rgba(109,91,77,0.06)] sm:rounded-3xl sm:p-6 lg:p-7">
            {/* CATEGORY */}
            {category?.title && (
              <span className="inline-flex rounded-full border border-[#DEC9B7] bg-[#F6EEE6] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A6854] sm:px-4 sm:text-xs">
                {category.title}
              </span>
            )}

            {/* TITLE */}
            <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#49382D] sm:mt-4 sm:text-3xl lg:text-[2.1rem]">
              {title}
            </h1>

            {/* BRAND */}
            {brand && (
              <div className="mt-3 flex items-center gap-2 text-[#806B5B]">
                <BadgeCheck size={16} className="shrink-0 text-[#9A7660]" />

                <span className="text-xs sm:text-sm">
                  Brand :
                  <span className="ml-1.5 font-semibold text-[#4A392E]">
                    {brand}
                  </span>
                </span>
              </div>
            )}

            {/* RATING */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-5 sm:gap-3">
              <div
                className="flex items-center gap-0.5 rounded-full border border-[#E9DCCF] bg-[#FAF4EE] px-3 py-1.5"
                role="img"
                aria-label={`Rated ${ratingValue.toFixed(1)} out of 5`}
              >
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={13}
                    fill={
                      index < Math.round(ratingValue) ? "currentColor" : "none"
                    }
                    className={
                      index < Math.round(ratingValue)
                        ? "text-[#C59645]"
                        : "text-[#C59645]/35"
                    }
                  />
                ))}
              </div>

              <span className="text-xs font-medium text-[#806F60]">
                {ratingValue.toFixed(1)} ★ • {displayProduct.reviewCount || 0}{" "}
                Reviews
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-bold tracking-tight text-[#624735] sm:text-4xl">
                    ₹{formatCurrency(discountPrice)}
                  </span>

                  <span className="text-base text-[#A69484] line-through sm:text-lg">
                    ₹{formatCurrency(price)}
                  </span>

                  <span className="rounded-full bg-[#8B6B54] px-3 py-1 text-[10px] font-bold text-white sm:text-xs">
                    Save {discountPercentage}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold tracking-tight text-[#624735] sm:text-4xl">
                  ₹{formatCurrency(price)}
                </span>
              )}
            </div>

            <p className="mt-1 text-[11px] text-[#9C8978]">
              Inclusive of all taxes
            </p>

            {/* STOCK */}
            <div className="mt-4">
              {!outOfStock ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D8E7D8] bg-[#F1F7F0] px-3.5 py-1.5 text-xs font-semibold text-[#4E7650]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5D8A5E]" />
                  In Stock ({stock})
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* =====================================================
                PRIMARY CTAs
            ====================================================== */}
            <div className="mt-6 border-t border-[#EEE3D8] pt-5 sm:mt-7 sm:pt-6">
              <div className="mb-3 flex items-center gap-2">
                <Zap size={16} className="text-[#A47755]" />

                <span className="text-xs font-semibold text-[#6F5543]">
                  Ready to make it yours?
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {/* BUY NOW */}
                <Button
                  size="lg"
                  disabled={outOfStock || buyLoading}
                  onClick={handleBuyNow}
                  className="group/order flex-1 rounded-xl bg-[#74533F] py-3.5 text-sm font-semibold text-white shadow-md shadow-[#74533F]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#604330] hover:shadow-lg hover:shadow-[#74533F]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Zap
                    size={17}
                    className="transition-transform duration-300 group-hover/order:scale-110"
                  />

                  {buyLoading ? "Processing..." : "Buy Now"}
                </Button>

                {/* ADD TO CART */}
                <Button
                  size="lg"
                  disabled={outOfStock || cartLoading}
                  onClick={handleAddCart}
                  variant="outline"
                  className="flex-1 rounded-xl border-[#CDB49F] bg-[#FAF5EF] py-3.5 text-sm font-semibold text-[#694B38] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A9866D] hover:bg-[#F3E8DD] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ShoppingBag size={17} />

                  {cartLoading ? "Adding..." : "Add to Cart"}
                </Button>
              </div>

              {/* SECONDARY ACTIONS */}
              <div className="mt-3 flex gap-2.5">
                <button
                  type="button"
                  onClick={handleWishlist}
                  disabled={wishlistLoading}
                  aria-pressed={productInWishlist}
                  aria-label={
                    productInWishlist
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5D8CC] bg-[#FFFCF9] text-[#704F3A] shadow-sm transition-all duration-300 hover:border-[#A98770] hover:bg-[#F7EEE6] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Heart
                    size={17}
                    className={
                      productInWishlist ? "fill-red-500 text-red-500" : ""
                    }
                  />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share this product"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5D8CC] bg-[#FFFCF9] text-[#704F3A] shadow-sm transition-all duration-300 hover:border-[#A98770] hover:bg-[#F7EEE6]"
                >
                  <Share2 size={17} />
                </button>

                <div className="flex flex-1 items-center justify-center rounded-xl border border-[#EEE3D8] bg-[#FAF6F1] px-3 text-center text-[10px] font-medium text-[#806F60] sm:text-xs">
                  Secure checkout • Easy returns
                </div>
              </div>
            </div>

            {/* =====================================================
                DESCRIPTION
            ====================================================== */}
            {description && (
              <div className="mt-6 border-t border-[#EEE3D8] pt-6 sm:mt-7 sm:pt-7">
                <h3 className="text-base font-semibold text-[#49382D] sm:text-lg">
                  Product Description
                </h3>

                <p className="mt-2.5 text-xs leading-6 text-[#766658] sm:text-sm sm:leading-7">
                  {description}
                </p>
              </div>
            )}

            {/* =====================================================
                FEATURES
            ====================================================== */}
            <div className="mt-6 grid gap-3 border-t border-[#EEE3D8] pt-6 sm:mt-7 sm:grid-cols-3 sm:gap-3 sm:pt-7">
              <div className="rounded-xl border border-[#E8DDD2] bg-[#FCF9F5] p-3.5 sm:rounded-2xl sm:p-4">
                <Truck size={20} className="mb-2.5 text-[#92705A]" />

                <h4 className="text-xs font-semibold text-[#4A392E] sm:text-sm">
                  Fast Delivery
                </h4>

                <p className="mt-1 text-[11px] leading-5 text-[#806F60] sm:text-xs">
                  Safe & reliable delivery.
                </p>
              </div>

              <div className="rounded-xl border border-[#E8DDD2] bg-[#FCF9F5] p-3.5 sm:rounded-2xl sm:p-4">
                <ShieldCheck size={20} className="mb-2.5 text-[#92705A]" />

                <h4 className="text-xs font-semibold text-[#4A392E] sm:text-sm">
                  Secure Payment
                </h4>

                <p className="mt-1 text-[11px] leading-5 text-[#806F60] sm:text-xs">
                  Safe & encrypted checkout.
                </p>
              </div>

              <div className="rounded-xl border border-[#E8DDD2] bg-[#FCF9F5] p-3.5 sm:rounded-2xl sm:p-4">
                <BadgeCheck size={20} className="mb-2.5 text-[#92705A]" />

                <h4 className="text-xs font-semibold text-[#4A392E] sm:text-sm">
                  Premium Quality
                </h4>

                <p className="mt-1 text-[11px] leading-5 text-[#806F60] sm:text-xs">
                  Premium fabric & finish.
                </p>
              </div>
            </div>

            {/* =====================================================
                TRUST SECTION
            ====================================================== */}
            <div className="mt-6 rounded-2xl border border-[#E5D8CA] bg-[#F8F0E8] p-4 sm:mt-7 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#4A392E] sm:text-base">
                    Crafted with Premium Care
                  </h3>

                  <p className="mt-1.5 max-w-xl text-[11px] leading-5 text-[#796858] sm:text-xs sm:leading-6">
                    Designed for comfort, elegance and everyday confidence.
                    Every piece is carefully selected for a premium experience.
                  </p>
                </div>

                <div className="shrink-0 rounded-xl bg-[#74533F] px-4 py-2.5 text-center text-white shadow-md">
                  <p className="text-[9px] uppercase tracking-widest opacity-75">
                    Trusted
                  </p>

                  <p className="mt-0.5 text-sm font-bold">10,000+ Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
