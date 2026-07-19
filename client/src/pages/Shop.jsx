import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import useProductStore from "../store/productStore";
import useCategoryStore from "../store/categoryStore";

import ProductGrid from "../components/ProductGrid";

export default function Shop() {
  const {
    products,
    loading: productLoading,
    getProducts,
  } = useProductStore();

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
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category?.slug === selectedCategory ||
          product.category === selectedCategory
      );
    }

    if (search.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

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
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Shop</h1>
          <p className="mt-2 text-gray-500">
            Discover our latest collection.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none md:w-72"
        />
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border px-4 py-3"
        >
          <option value="all">All Categories</option>

          {categories.map((category) => (
            <option key={category._id} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border px-4 py-3"
        >
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full px-5 py-2 ${
            selectedCategory === "all"
              ? "bg-black text-white"
              : "border bg-white"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category.slug)}
            className={`rounded-full px-5 py-2 ${
              selectedCategory === category.slug
                ? "bg-black text-white"
                : "border bg-white"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">No Products Found</h2>
          <p className="mt-2 text-gray-500">
            Try another category or search keyword.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white"
          >
            Back to Home
          </Link>
        </div>
      )}
    </section>
  );
}