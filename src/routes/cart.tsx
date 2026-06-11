import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/store/cart";
import { getProductById } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { EmptyState } from "@/components/common/EmptyState";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your bag — Mini & Me" },
      {
        name: "description",
        content:
          "Review the soft essentials in your Mini & Me bag, apply a coupon, and head to a secure checkout.",
      },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 6;
  const total = Math.max(0, subtotal - discount) + shipping;

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<ShoppingBag className="h-6 w-6" />}
          title="Your bag is empty"
          body="Once you find something soft, it'll live here until you're ready."
          ctaLabel="Start shopping"
          ctaTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Your bag</h1>
      <p className="mt-2 text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
        <ul className="divide-y divide-border">
          {items.map((i) => {
            const p = getProductById(i.productId);
            if (!p) return null;
            return (
              <li key={i.productId + (i.variantId ?? "")} className="flex gap-5 py-6">
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="block h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-secondary"
                >
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to="/product/$slug" params={{ slug: p.slug }} className="font-display text-lg">
                        {p.name}
                      </Link>
                      {i.variantId && (
                        <p className="text-xs text-muted-foreground">
                          {p.variants?.options.find((o) => o.id === i.variantId)?.label}
                        </p>
                      )}
                    </div>
                    <button
                      aria-label="Remove"
                      onClick={() => remove(i.productId, i.variantId)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center rounded-full border border-border bg-background">
                      <button
                        aria-label="Decrease"
                        onClick={() => setQuantity(i.productId, i.quantity - 1, i.variantId)}
                        className="inline-flex h-9 w-9 items-center justify-center"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm">{i.quantity}</span>
                      <button
                        aria-label="Increase"
                        onClick={() => setQuantity(i.productId, i.quantity + 1, i.variantId)}
                        className="inline-flex h-9 w-9 items-center justify-center"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-medium">{formatPrice(p.price * i.quantity)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-3xl bg-secondary/60 p-7 lg:sticky lg:top-24">
          <h2 className="font-display text-xl">Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span>−{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="my-3 border-t border-border" />
            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (coupon.toUpperCase() === "MINI10") {
                setDiscount(subtotal * 0.1);
                toast.success("Coupon applied — 10% off");
              } else {
                toast.error("That code doesn't look right.");
              }
            }}
          >
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="h-11 rounded-full bg-background"
            />
            <Button type="submit" variant="outline" className="h-11 rounded-full">
              Apply
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">Try <span className="font-medium">MINI10</span></p>

          <Button asChild size="lg" className="mt-6 h-12 w-full rounded-full">
            <Link to="/checkout">Checkout</Link>
          </Button>
          <Link to="/shop" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
