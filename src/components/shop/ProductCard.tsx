import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/lib/store/wishlist";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: Props) {
  const wishlisted = useWishlist((s) => s.has(product.id));
  const toggle = useWishlist((s) => s.toggle);

  return (
    <div className="group flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-3xl bg-secondary"
      >
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={1000}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] uppercase tracking-wider text-foreground backdrop-blur">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground transition hover:bg-background"
        >
          <Heart className={cn("h-4 w-4", wishlisted && "fill-foreground")} />
        </button>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="block truncate font-display text-lg leading-tight"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{product.tagline}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{formatPrice(product.price)}</p>
          {product.compareAt && (
            <p className="text-xs text-muted-foreground line-through">
              {formatPrice(product.compareAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
