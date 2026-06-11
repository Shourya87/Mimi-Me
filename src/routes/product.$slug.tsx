import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getRelatedProducts, reviewsFor } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — Mini & Me` },
        { name: "description", content: p?.tagline ?? "Mini & Me product" },
        { property: "og:title", content: p?.name },
        { property: "og:description", content: p?.tagline },
        { property: "og:image", content: p?.image },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: p.name,
                description: p.description,
                image: p.image,
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: p.rating,
                  reviewCount: p.reviewCount,
                },
                offers: {
                  "@type": "Offer",
                  price: p.price,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
              }),
            },
          ]
        : [],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [variantId, setVariantId] = useState<string | undefined>(
    product.variants?.options[0].id,
  );
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const wishToggle = useWishlist((s) => s.toggle);
  const wishlisted = useWishlist((s) => s.has(product.id));
  const related = getRelatedProducts(product.id);
  const reviews = reviewsFor(product.id);

  const onAdd = () => {
    add({ productId: product.id, variantId, quantity: qty });
    toast.success("Added to cart", { description: `${product.name} × ${qty}` });
  };

  return (
    <div className="container-page py-10 md:py-14">
      <nav className="mb-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-secondary opacity-80">
                <img src={product.image} alt="" className="aspect-square w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          {product.badge && (
            <span className="inline-block rounded-full bg-blush/60 px-3 py-1 text-xs uppercase tracking-widest">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 font-display text-3xl md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(product.rating)
                      ? "fill-foreground text-foreground"
                      : "text-foreground/30",
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <p className="font-display text-3xl">{formatPrice(product.price)}</p>
            {product.compareAt && (
              <p className="text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </p>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

          {product.variants && (
            <div className="mt-8">
              <p className="text-sm font-medium">{product.variants.name}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setVariantId(opt.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition",
                      variantId === opt.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background hover:bg-secondary",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-background">
              <button
                type="button"
                aria-label="Decrease"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                type="button"
                aria-label="Increase"
                onClick={() => setQty((q) => q + 1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={onAdd} size="lg" className="h-12 flex-1 rounded-full">
              Add to bag — {formatPrice(product.price * qty)}
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Wishlist"
              onClick={() => wishToggle(product.id)}
              className="h-12 w-12 rounded-full"
            >
              <Heart className={cn("h-4 w-4", wishlisted && "fill-foreground")} />
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 rounded-2xl bg-secondary/60 p-5 text-sm">
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4" /> Free shipping on orders over $60
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4" /> 30-day no-fuss returns
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="font-display text-lg">Details</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl md:text-3xl">Reviews</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl bg-background p-6 ring-1 ring-border">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < r.rating ? "fill-foreground text-foreground" : "text-foreground/20",
                    )}
                  />
                ))}
              </div>
              <p className="mt-3 font-medium">{r.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                {r.author} · {r.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-2xl md:text-3xl">You might also love</h2>
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
