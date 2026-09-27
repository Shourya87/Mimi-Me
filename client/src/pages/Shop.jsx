import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import ProductGrid from "../components/ProductGrid";

import useProductStore from "../store/productStore";

import { categoryToSlug } from "../utils/categoryUtils";

const SORT_OPTIONS = [
  {
    value: "latest",
    label: "Latest",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
  {
    value: "name",
    label: "Name: A-Z",
  },
];

export default function Shop() {
  const {
    products,
    loading: productLoading,
    getProducts,
  } = useProductStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [sort, setSort] = useState("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortRef = useRef(null);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  /*
   * Derive categories directly from products.
   * Product.category is now the single source of truth.
   */
  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // Sync search and category with URL
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setSelectedCategory(
      searchParams.get("category") || "all"
    );
  }, [searchParams]);

  // Close custom sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          categoryToSlug(product.category) === selectedCategory
      );
    }

    // Search filter
    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();

      filtered = filtered.filter((product) =>
        product.title?.toLowerCase().includes(searchTerm)
      );
    }

    // Sorting
    switch (sort) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            Number(a.discountPrice ?? a.price) -
            Number(b.discountPrice ?? b.price)
        );
        break;

      case "price-high":
        filtered.sort(
          (a, b) =>
            Number(b.discountPrice ?? b.price) -
            Number(a.discountPrice ?? a.price)
        );
        break;

      case "name":
        filtered.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "")
        );
        break;

      case "latest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );
        break;
    }

    return filtered;
  }, [products, selectedCategory, search, sort]);

  if (productLoading) {
    return <Loader text="Loading Products..." />;
  }

  const updateSearchParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleSearchChange = (value) => {
    setSearch(value);

    updateSearchParams({
      search: value.trim(),
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    updateSearchParams({
      category,
    });
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearch("");
    setSort("latest");
    setSearchParams({});
  };

  const selectedSortLabel =
    SORT_OPTIONS.find(
      (option) => option.value === sort
    )?.label || "Latest";

  return (
    <main className="min-h-screen bg-[#F8F5F1]">
      {/* =====================================================
          SHOP HEADER
      ====================================================== */}
      <section className="border-b border-[#eadfd5] bg-[#fffaf7]">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
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
                Discover pieces made for every little moment.
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-72 lg:w-80">
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
                  onChange={(e) =>
                    handleSearchChange(e.target.value)
                  }
                  className="!h-11 !rounded-full !border-[#dfd1c5] !bg-[#F8F5F1] !pl-11 !pr-10 !text-sm !text-[#6d5b4d] focus:!border-[#c98f84] focus:!ring-4 focus:!ring-[#c98f84]/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
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
      <section className="mx-auto max-w-6xl px-5 py-5 sm:px-7 sm:py-6 lg:px-8">
        <div className="space-y-5">
          {/* CATEGORY FILTER */}
          <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf7] px-4 py-4 sm:px-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c98f84]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f7b6b]">
                Shop by Category
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {/* ALL */}
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:px-5 sm:text-sm ${
                  selectedCategory === "all"
                    ? "border-[#6d5b4d] bg-[#6d5b4d] text-white shadow-md shadow-[#6d5b4d]/10"
                    : "border-[#dfd1c5] bg-[#fffaf7] text-[#7d6a59] hover:border-[#c98f84] hover:bg-[#fdf2eb] hover:text-[#a8756c]"
                }`}
              >
                All
              </button>

              {/* CATEGORIES */}
              {categories.map((category) => {
                const categorySlug =
                  categoryToSlug(category);

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(categorySlug)
                    }
                    className={`shrink-0 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:px-5 sm:text-sm ${
                      selectedCategory === categorySlug
                        ? "border-[#6d5b4d] bg-[#6d5b4d] text-white shadow-md shadow-[#6d5b4d]/10"
                        : "border-[#dfd1c5] bg-[#fffaf7] text-[#7d6a59] hover:border-[#c98f84] hover:bg-[#fdf2eb] hover:text-[#a8756c]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =================================================
              RESULT + SORT
          ================================================== */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Result Count */}
            <div className="flex items-center gap-2 text-sm text-[#9a8879]">
              <SlidersHorizontal
                size={16}
                strokeWidth={1.7}
              />

              <span>
                Showing{" "}
                <span className="font-semibold text-[#6d5b4d]">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}
              </span>
            </div>

            {/* CUSTOM SORT */}
            <div
              ref={sortRef}
              className="relative flex items-center gap-3"
            >
              <span className="text-xs text-[#9a8879]">
                Sort by
              </span>

              <button
                type="button"
                onClick={() =>
                  setIsSortOpen((previous) => !previous)
                }
                className={`flex min-w-[190px] items-center justify-between gap-4 rounded-xl border bg-[#fffaf7] px-4 py-2.5 text-sm font-medium text-[#6d5b4d] shadow-sm outline-none transition-all duration-200 ${
                  isSortOpen
                    ? "border-[#c98f84] ring-4 ring-[#c98f84]/10"
                    : "border-[#dfd1c5] hover:border-[#c98f84]"
                }`}
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
              >
                <span>{selectedSortLabel}</span>

                <ChevronDown
                  size={16}
                  className={`text-[#8d7664] transition-transform duration-200 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 w-[190px] overflow-hidden rounded-xl border border-[#dfd1c5] bg-[#fffaf7] p-1.5 shadow-[0_14px_35px_rgba(109,91,77,0.14)]">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSort(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        sort === option.value
                          ? "bg-[#f5e8df] font-semibold text-[#6d5b4d]"
                          : "text-[#7d6a59] hover:bg-[#faf0e9]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-7 lg:px-8">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="flex min-h-[330px] flex-col items-center justify-center rounded-2xl border border-[#eadfd5] bg-[#fffaf7] px-6 text-center">
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