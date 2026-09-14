import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center px-6 py-10">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A7660]">
            Nothing here yet
          </p>

          <p className="mt-2 text-sm text-[#9A8879]">
            No products found
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-1 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}