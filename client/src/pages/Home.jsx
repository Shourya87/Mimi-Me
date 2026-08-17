import { useEffect } from "react";

import Loader from "../components/Loader";

import ProductGrid from "../components/ProductGrid";
import CategoryCard from "../components/CategoryCard";

import useProductStore from "../store/productStore";
import useCategoryStore from "../store/categoryStore";

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
      {/* <Hero /> */}

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Shop by Category</h2>

          <p className="mt-2 text-gray-500">
            Find the perfect outfit for every occasion.
          </p>
        </div>

        <CategoryCard categories={categories} />
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>

            <p className="mt-2 text-gray-500">Our most loved styles.</p>
          </div>

          <ProductGrid products={featuredProducts} />
        </section>
      )}

      {/* Promo Banner */}
      {/* <PromoBanner /> */}

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">New Arrivals</h2>

          <p className="mt-2 text-gray-500">Fresh styles added recently.</p>
        </div>

        <ProductGrid products={products.slice(8, 16)} />
      </section>

      {/* Why Choose Us */}
      {/* <WhyChooseUs /> */}

      {/* Newsletter */}
      {/* <Newsletter /> */}
    </main>
  );
}
