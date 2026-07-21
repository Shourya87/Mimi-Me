import { useEffect } from "react";

import ProductGrid from "../components/ProductGrid";
import CategoryCard from "../components/CategoryCard";

import useProductStore from "../store/productStore";
import useCategoryStore from "../store/categoryStore";

export default function Home() {
  const {
    products,
    getProducts,
    loading: productLoading,
  } = useProductStore();

  const {
    categories,
    getCategories,
    loading: categoryLoading,
  } = useCategoryStore();

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {/* <Hero /> */}

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Shop by Category
          </h2>

          <p className="mt-2 text-gray-500">
            Find the perfect outfit for every occasion.
          </p>
        </div>

        {categoryLoading ? (
          <div className="py-10 text-center">
            Loading Categories...
          </div>
        ) : (
          <CategoryCard categories={categories} />
        )}
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>

          <p className="mt-2 text-gray-500">
            Our most loved styles.
          </p>
        </div>

        {productLoading ? (
          <div className="py-10 text-center">
            Loading Products...
          </div>
        ) : (
          <ProductGrid products={products.filter(product => product.isFeatured)} />
        )}
      </section>

      {/* Promo Banner */}
      {/* <PromoBanner /> */}

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            New Arrivals
          </h2>

          <p className="mt-2 text-gray-500">
            Fresh styles added recently.
          </p>
        </div>

        {productLoading ? (
          <div className="py-10 text-center">
            Loading Products...
          </div>
        ) : (
          <ProductGrid products={products.slice(8, 16)} />
        )}
      </section>

      {/* Why Choose Us */}
      {/* <WhyChooseUs /> */}

      {/* Newsletter */}
      {/* <Newsletter /> */}
    </main>
  );
}