import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { useWishlist } from "@/lib/store/wishlist";
import { products } from "@/lib/data/products";
import { EmptyState } from "@/components/common/EmptyState";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Mini & Me" },
      {
        name: "description",
        content:
          "Your saved Mini & Me favorites — keep the pieces you love in one quiet place, ready when you are.",
      },
      { property: "og:url", content: "/wishlist" },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const list = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Wishlist</h1>
      <p className="mt-2 text-muted-foreground">A little space for the things you love.</p>

      <div className="mt-10">
        {list.length === 0 ? (
          <EmptyState
            icon={<Heart className="h-6 w-6" />}
            title="Nothing saved yet"
            body="Tap the heart on any product to keep it here."
            ctaLabel="Browse the shop"
            ctaTo="/shop"
          />
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
