import { useEffect } from "react";

import Loader from "../components/Loader";

import ProductGrid from "../components/ProductGrid";
import CategoryCard from "../components/CategoryCard";

import useProductStore from "../store/productStore";
import useCategoryStore from "../store/categoryStore";
import Hero from "../components/Hero";
import PromoBanner from "../components/PromoBanner";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { products, getProducts, loading: productLoading } = useProductStore();

  const {
    categories,
    getCategories,
    loading: categoryLoading,
  } = useCategoryStore();

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  const featuredProducts = products
    .filter((product) => product.isFeatured)
    .slice(0, 8);

  // Show fullscreen loader while initial data is loading
  if (productLoading || categoryLoading) {
    return <Loader text="Loading Mimi & Me..." />;
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* Section Header */}
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#dfc2b3]" />

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Discover More
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#6d5b4d] sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#9a8879] sm:text-base">
              Find the perfect outfit for every occasion.
            </p>
          </div>

          <Link
            to="/categories"
            className="group hidden items-center gap-2 text-sm font-medium text-[#7d6a59] transition-colors hover:text-[#c98f84] sm:flex"
          >
            Explore All
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
          {/* Section Header */}
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#dfc2b3]" />

                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                  Our Selection
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-[#6d5b4d] sm:text-4xl">
                Featured Products
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#9a8879] sm:text-base">
                Our most loved styles.
              </p>
            </div>

            {/* View All */}
            <Link
              to="/shop"
              className="group hidden items-center gap-2 text-sm font-medium text-[#7d6a59] transition-colors hover:text-[#c98f84] sm:flex"
            >
              View All
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Products */}
          <ProductGrid products={featuredProducts} />
        </section>
      )}
      {/* Promo Banner */}
      <PromoBanner />

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        {/* Section Header */}
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#dfc2b3]" />

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                The Latest
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#6d5b4d] sm:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#9a8879] sm:text-base">
              Fresh styles added recently.
            </p>
          </div>

          {/* View All */}
          <Link
            to="/shop"
            className="group hidden items-center gap-2 text-sm font-medium text-[#7d6a59] sm:flex"
          >
            View All
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Products */}
        <ProductGrid products={products.slice(8, 16)} />
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
