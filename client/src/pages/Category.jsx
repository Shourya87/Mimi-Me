import { useEffect, useMemo } from "react";

import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import ProductGrid from "../components/ProductGrid";

import useProductStore from "../store/productStore";

import { slugToCategory } from "../utils/categoryUtils";

export default function Category() {
  const { slug } = useParams();

  const {
    products,
    getProducts,
    loading,
    error,
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const categoryName = useMemo(() => {
    return slugToCategory(slug);
  }, [slug]);

  const categoryProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category?.toLowerCase() === categoryName.toLowerCase()
    );
  }, [products, categoryName]);

  const categoryExists = useMemo(() => {
    return products.some(
      (product) =>
        product.category?.toLowerCase() === categoryName.toLowerCase()
    );
  }, [products, categoryName]);

  if (loading) {
    return <Loader text="Loading Category..." />;
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#5A4636]">
            Unable to Load Category
          </h1>

          <p className="mt-3 text-[#8d7968]">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (!categoryExists) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#5A4636]">
            Category Not Found
          </h1>

          <p className="mt-3 text-[#8d7968]">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7]">
      {/* Category Header */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 text-center">
        <h1 className="text-4xl font-bold text-[#5A4636] md:text-5xl">
          {categoryName}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#8d7968]">
          Explore our {categoryName} collection.
        </p>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        {categoryProducts.length > 0 ? (
          <ProductGrid products={categoryProducts} />
        ) : (
          <div className="flex min-h-[35vh] items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[#5A4636]">
                No Products Found
              </h2>

              <p className="mt-2 text-[#8d7968]">
                There are no products available in this category yet.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}