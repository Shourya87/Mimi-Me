import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9a8879]">
            Nothing here yet
          </p>

          <p className="mt-2 text-sm text-[#b09e90]">
            No products found
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-8 pt-2 sm:px-8 lg:px-10">
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}