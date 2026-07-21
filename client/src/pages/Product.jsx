import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Heart,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import Button from "../components/Button";
import useProductStore from "../store/productStore";

export default function ProductDetails() {
  const { slug } = useParams();

  const { product, loading, error, getProductBySlug, clearProduct } =
    useProductStore();

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug);
    }

    return () => clearProduct();
  }, [slug, getProductBySlug, clearProduct]);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  if (loading) {
    return (
      <section className="min-h-screen bg-linear-to-br from-[#F9F5EF] via-[#F7F2EB] to-[#EFE6DA] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-full border-4 border-[#E8DCCB] border-t-[#8B6B4A] animate-spin" />
          <p className="mt-5 text-sm tracking-wide text-[#7A6653]">
            Loading Product...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 bg-[#FAF7F2]">
        <div className="rounded-3xl border border-[#E8DED2] bg-white p-12 shadow-xl text-center max-w-lg">
          <h2 className="text-4xl font-bold text-[#3E3126]">
            Something went wrong
          </h2>

          <p className="mt-4 text-[#7D6B5A]">{error}</p>

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

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 bg-[#FAF7F2]">
        <div className="rounded-3xl border border-[#E8DED2] bg-white p-12 shadow-xl text-center max-w-lg">
          <h2 className="text-4xl font-bold text-[#3E3126]">
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

  const hasDiscount = discountPrice && Number(discountPrice) < Number(price);

  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <section className="bg-linear-to-br from-[#FBF8F3] via-[#F8F4EE] to-[#EEE4D8] py-20">
      <div className="mx-auto max-w-7xl px-4">
        <Link
          to="/shop"
          className="mb-10 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-5 py-3 text-sm font-medium text-[#6B5540] shadow-lg transition hover:bg-[#8B6B4A] hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>

        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* IMAGE SECTION */}

          <div className="lg:sticky lg:top-28">
            <div className="group overflow-hidden rounded-[34px] border border-[#E7DBCD] bg-white shadow-[0_30px_80px_rgba(94,72,50,0.12)]">
              <img
                src={selectedImage}
                alt={title}
                className="h-175 w-full object-cover duration-700 group-hover:scale-105"
              />
            </div>

            {images?.length > 1 && (
              <div className="mt-6 flex gap-4 overflow-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image.url)}
                    className={`overflow-hidden rounded-2xl border-2 bg-white p-1 shadow-md duration-300 ${
                      selectedImage === image.url
                        ? "border-[#8B6B4A] scale-105"
                        : "border-transparent hover:border-[#C9AE8F]"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={title}
                      className="h-24 w-24 rounded-xl object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* DETAILS SECTION */}

          <div className="rounded-[34px] border border-[#E6D8C8] bg-white/90 p-8 shadow-[0_25px_80px_rgba(95,70,45,0.08)] backdrop-blur-sm">
            <span className="inline-flex rounded-full border border-[#D8C2A8] bg-[#F8F2EA] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6B4A]">
              {category?.title}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-[#3E2D21] lg:text-5xl">
              {title}
            </h1>

            {brand && (
              <div className="mt-5 flex items-center gap-2 text-[#6F5B48]">
                <BadgeCheck size={19} className="text-[#A67C52]" />

                <span>
                  Brand :
                  <span className="ml-2 font-semibold text-[#3E2D21]">
                    {brand}
                  </span>
                </span>
              </div>
            )}

            {/* Rating */}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 rounded-full bg-[#FFF8EF] px-4 py-2 shadow-sm">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    fill="currentColor"
                    className="text-[#D9A441]"
                  />
                ))}
              </div>

              <span className="text-sm font-medium text-[#7A6755]">
                {product.rating} • {product.reviewCount}
              </span>
            </div>

            {/* Price */}

            <div className="mt-10 flex flex-wrap items-end gap-5">
              {hasDiscount ? (
                <>
                  <span className="text-5xl font-extrabold tracking-tight text-[#6B4F3A]">
                    ₹{discountPrice}
                  </span>

                  <span className="text-2xl text-[#A59384] line-through">
                    ₹{price}
                  </span>

                  <span className="rounded-full bg-[#7C5C45] px-5 py-2 text-sm font-bold text-white shadow-lg">
                    Save {discountPercentage}%
                  </span>
                </>
              ) : (
                <span className="text-5xl font-extrabold tracking-tight text-[#6B4F3A]">
                  ₹{price}
                </span>
              )}
            </div>

            {/* Stock */}

            <div className="mt-8">
              {stock > 0 ? (
                <span className="inline-flex items-center rounded-full bg-[#EDF7EE] px-5 py-2 text-sm font-semibold text-[#2E7D32]">
                  ● In Stock ({stock})
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-[#FFF0F0] px-5 py-2 text-sm font-semibold text-red-600">
                  ● Out of Stock
                </span>
              )}
            </div>

            {/* Description */}

            <div className="mt-10">
              <h3 className="mb-4 text-xl font-semibold text-[#3D2E22]">
                Product Description
              </h3>

              <p className="leading-8 text-[#726252]">{description}</p>
            </div>

            {/* Premium Features */}

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#E8DDD0] bg-[#FCFAF7] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Truck size={26} className="mb-4 text-[#8B6B4A]" />

                <h4 className="font-semibold text-[#3D2E22]">Free Shipping</h4>

                <p className="mt-2 text-sm leading-6 text-[#7B6A5B]">
                  Fast & secure delivery on every order.
                </p>
              </div>

              <div className="rounded-3xl border border-[#E8DDD0] bg-[#FCFAF7] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <ShieldCheck size={26} className="mb-4 text-[#8B6B4A]" />

                <h4 className="font-semibold text-[#3D2E22]">Secure Payment</h4>

                <p className="mt-2 text-sm leading-6 text-[#7B6A5B]">
                  Safe checkout with encrypted payment.
                </p>
              </div>

              <div className="rounded-3xl border border-[#E8DDD0] bg-[#FCFAF7] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <BadgeCheck size={26} className="mb-4 text-[#8B6B4A]" />

                <h4 className="font-semibold text-[#3D2E22]">
                  Premium Quality
                </h4>

                <p className="mt-2 text-sm leading-6 text-[#7B6A5B]">
                  Carefully selected premium fabric & finish.
                </p>
              </div>
            </div>
            {/* Actions */}

            <div className="mt-12 space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  disabled={stock === 0}
                  className="flex-1 rounded-2xl bg-[#6F4E37] py-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#5A3F2D] hover:shadow-2xl"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  disabled={stock === 0}
                  className="flex-1 rounded-2xl border-[#B99776] bg-[#FAF6F1] py-4 text-[#6F4E37] transition-all duration-300 hover:bg-[#F1E7DB]"
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-4">
                <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E6D9CB] bg-white text-[#6F4E37] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#A67C52] hover:bg-[#F8F1E8] hover:shadow-xl">
                  <Heart aria-label="Add to wishlist" size={21} />
                </button>

                <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E6D9CB] bg-white text-[#6F4E37] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#A67C52] hover:bg-[#F8F1E8] hover:shadow-xl">
                  <Share2 aria-label="Share product" size={21} />
                </button>
              </div>
            </div>

            {/* Trust Banner */}

            <div className="mt-12 rounded-[28px] border border-[#E7D8C8] bg-linear-to-r from-[#FDF9F4] via-[#F8F2EA] to-[#F3E8DA] p-6">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div>
                  <h3 className="text-lg font-semibold text-[#3E2D21]">
                    Crafted with Premium Care
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#766454]">
                    Designed for comfort, elegance and everyday confidence.
                    Every piece is carefully selected to deliver a premium
                    shopping experience.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#6F4E37] px-6 py-3 text-center text-white shadow-lg">
                  <p className="text-xs uppercase tracking-widest opacity-80">
                    Trusted
                  </p>

                  <p className="mt-1 text-lg font-bold">10,000+ Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
