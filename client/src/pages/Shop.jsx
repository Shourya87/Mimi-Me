import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";

import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import ProductGrid from "../components/ProductGrid";

import useProductStore from "../store/productStore";
import useCategoryStore from "../store/categoryStore";

export default function Shop() {
  const { products, loading: productLoading, getProducts } = useProductStore();

  const {
    categories,
    loading: categoryLoading,
    getCategories,
  } = useCategoryStore();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category?.slug === selectedCategory ||
          product.category === selectedCategory,
      );
    }

    // Search filter
    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();

      filtered = filtered.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm),
      );
    }

    // Sorting
    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, search, sort]);

  if (productLoading || categoryLoading) {
    return <Loader text="Loading Products..." />;
  }

  const hasActiveFilters = selectedCategory !== "all" || search.trim() !== "";

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearch("");
    setSort("latest");
  };

  return (
    <main className="min-h-screen bg-[#F8F5F1]">
      {/* =====================================================
    SHOP HEADER
====================================================== */}
      <section className="border-b border-[#eadfd5] bg-[#fffaf7]">
        <div className="mx-auto max-w-7xl px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* Heading */}
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-6 bg-[#dfc2b3]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                  The Collection
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-[#6d5b4d] sm:text-4xl">
                Shop
              </h1>

              <p className="mt-1.5 text-sm text-[#9a8879]">
                Discover our latest collection.
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-80 lg:w-96">
              <div className="relative">
                <Search
                  size={17}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8879]"
                />

                <Input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="!h-11 !rounded-full !border-[#dfd1c5] !bg-[#F8F5F1] !pl-11 !pr-10 !text-sm !text-[#6d5b4d] focus:!border-[#c98f84] focus:!ring-4 focus:!ring-[#c98f84]/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#9a8879] transition hover:bg-[#f8ebe3] hover:text-[#c98f84]"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTERS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5">
          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <span className="mr-1 hidden shrink-0 text-xs font-medium uppercase tracking-[0.16em] text-[#9a8879] sm:block">
              Categories
            </span>

            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "border-[#6d5b4d] bg-[#6d5b4d] text-white shadow-sm"
                  : "border-[#dfd1c5] bg-[#fffaf7] text-[#7d6a59] hover:border-[#c98f84] hover:text-[#c98f84]"
              }`}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={() => setSelectedCategory(category.slug)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? "border-[#6d5b4d] bg-[#6d5b4d] text-white shadow-sm"
                    : "border-[#dfd1c5] bg-[#fffaf7] text-[#7d6a59] hover:border-[#c98f84] hover:text-[#c98f84]"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Bottom Controls */}
          <div className="flex flex-col gap-4 border-t border-[#eadfd5] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-[#9a8879]">
              <SlidersHorizontal size={16} />

              <span>
                Showing{" "}
                <span className="font-medium text-[#6d5b4d]">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-[#9a8879]">
                Sort by
              </label>

              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-[#dfd1c5] bg-[#fffaf7] px-4 py-2.5 text-sm font-medium text-[#7d6a59] outline-none transition-all focus:border-[#c98f84] focus:ring-4 focus:ring-[#c98f84]/10"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between rounded-2xl border border-[#eadfd5] bg-[#fffaf7] px-4 py-3">
              <p className="text-sm text-[#9a8879]">
                {search.trim() && (
                  <>
                    Search:{" "}
                    <span className="font-medium text-[#6d5b4d]">
                      "{search}"
                    </span>
                  </>
                )}

                {search.trim() && selectedCategory !== "all" && " · "}

                {selectedCategory !== "all" && (
                  <>
                    Category:{" "}
                    <span className="font-medium text-[#6d5b4d]">
                      {categories.find(
                        (category) => category.slug === selectedCategory,
                      )?.title || selectedCategory}
                    </span>
                  </>
                )}
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-[#c98f84] transition hover:text-[#a8756c]"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-6 pb-14 sm:px-8 lg:px-10">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-[#eadfd5] bg-[#fffaf7] px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8ebe3] text-[#c98f84]">
              <Search size={22} strokeWidth={1.8} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#6d5b4d]">
              No products found
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#9a8879]">
              Try another category or search with a different keyword.
            </p>

            <div className="mt-6">
              <Button onClick={clearFilters} variant="primary">
                Clear Filters
              </Button>
            </div>

            <Link
              to="/"
              className="mt-4 text-sm font-medium text-[#7d6a59] transition hover:text-[#c98f84]"
            >
              Back to Home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
