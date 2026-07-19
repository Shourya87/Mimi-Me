import { useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import CategoryCard from "../components/CategoryCard";
import useProductStore from "../store/productStore";
import useCategoryStore from "../store/categoryStore";

export default function Home() {
  const { products, getProducts, loading: productLoading } = useProductStore();
  const { categories, getCategories, loading: categoryLoading } = useCategoryStore();

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <p className="mt-2 text-gray-500">
            Find the perfect outfit for every occasion.
          </p>
        </div>

        {!categoryLoading && <CategoryCard categories={categories} />}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="mt-2 text-gray-500">Our most loved styles.</p>
          </div>
        </div>
        
        {productLoading ? (
          <Loader />
        ) : (
          <ProductGrid products={products.slice(0, 8)} />
          )}
      </section>

      {/* <PromoBanner /> */}

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            New Arrivals
          </h2>
          <p className="mt-2 text-gray-500">
            Fresh styles added recently.
          </p>
        </div>

        {!productLoading && (
          <ProductGrid products={products.slice(8, 16)} />
        )}
      </section>

      {/* <WhyChooseUse /> */}
      {/* <Newsletter /> */}
      {/* <Footer /> */}
    </div>
  );
}
