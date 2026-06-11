import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/data/products";

export function BestSellers() {
  const items = products.filter((p) => p.bestSeller).slice(0, 4);
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Loved most</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Best sellers</h2>
        </div>
        <Link to="/shop" className="text-sm hover:underline">
          See all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
