import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

import ProductGrid from "../components/ProductGrid";

import useProductStore from "../store/productStore";
import useCategoryStore from "../store/categoryStore";

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
  }, [getProducts, getCategories]);

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

  // Initial Loader
  if (productLoading || categoryLoading) {
    return <Loader text="Loading Products..." />;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Heading */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Shop</h1>

          <p className="mt-2 text-gray-500">
            Discover our latest collection.
          </p>
        </div>

        <div className="w-full md:w-72">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
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
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
        >
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      {/* Category Pills */}
      <div className="mb-10 flex flex-wrap gap-3">
        <Button
          size="sm"
          variant={selectedCategory === "all" ? "primary" : "outline"}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </Button>

        {categories.map((category) => (
          <Button
            key={category._id}
            size="sm"
            variant={
              selectedCategory === category.slug ? "primary" : "outline"
            }
            onClick={() => setSelectedCategory(category.slug)}
          >
            {category.title}
          </Button>
        ))}
      </div>

      {/* Products */}
      {filteredProducts.length ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">
            No Products Found
          </h2>

          <p className="mt-2 text-gray-500">
            Try another category or search keyword.
          </p>

          <div className="mt-6">
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}