import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import ProductGrid from "../components/ProductGrid";

import useProductStore from "../store/productStore";
import useCategoryStore from "../store/categoryStore";

export default function Category() {
  const { slug } = useParams();

  const {
    products,
    getProducts,
    loading: productLoading,
  } = useProductStore();

  const {
    category,
    getCategoryBySlug,
    loading: categoryLoading,
    error,
  } = useCategoryStore();

  useEffect(() => {
    getCategoryBySlug(slug);
    getProducts();
  }, [slug, getCategoryBySlug, getProducts]);

  if (productLoading || categoryLoading) {
    return <Loader text="Loading Category..." />;
  }

  if (!category) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#5A4636]">
            Category Not Found
          </h1>

          <p className="mt-3 text-[#8d7968]">
            {error || "The category you're looking for doesn't exist."}
          </p>
        </div>
      </main>
    );
  }

  const categoryProducts = products.filter(
    (product) => product.category === category.name
  );

  return (
    <main className="min-h-screen bg-[#fffaf7]">
      {/* Category Header */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-16 text-center">
        <h1 className="text-4xl font-bold text-[#5A4636] md:text-5xl">
          {category.title}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#8d7968]">
          Explore our {category.title} collection.
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