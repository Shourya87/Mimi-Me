import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  
  if (products.length === 0) {
    return ( 
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-gray-500">
          No products found
        </p>
      </div>
    );
  }
  
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
