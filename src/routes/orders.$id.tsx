import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Package, Truck, Home, Loader2, AlertCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { getOrder } from "@/lib/api/orders.functions";
import { formatPrice } from "@/lib/format";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/orders/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.id} — Mini & Me` },
      {
        name: "description",
        content: `Track the status and delivery progress of your Mini & Me order ${params.id}.`,
      },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: `/orders/${params.id}` },
    ],
    links: [{ rel: "canonical", href: `/orders/${params.id}` }],
  }),
  component: OrderTracking,
});

type Order = Tables<"orders">;

interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

function OrderTracking() {
  const { id: orderNumber } = Route.useParams();
  const { user, loading: authLoading } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth state to load to optionally send userId
    if (authLoading) return;

    setLoading(true);
    setError(null);

    getOrder({
      data: {
        orderNumber,
        userId: user?.id,
      },
    })
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => {
        console.error("Error loading order:", err);
        setError(err instanceof Error ? err.message : "Failed to load order.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orderNumber, user, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-md rounded-3xl bg-secondary/40 p-8 text-center md:p-10">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 font-display text-2xl">Order Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "We couldn't find the order you were looking for. Please double check the order number."}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild className="rounded-full"><Link to="/account">View My Account</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link to="/shop">Go Shopping</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  // Parse items
  const items = (order.items as unknown as OrderItem[]) || [];

  // Determine active steps based on status
  // Statuses: 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled'
  const isCancelled = order.status === "cancelled";

  const steps = [
    {
      icon: Check,
      label: "Confirmed",
      description: "We have received your order",
      done: ["confirmed", "packed", "shipped", "delivered"].includes(order.status),
    },
    {
      icon: Package,
      label: "Packed with care",
      description: "Ready for carrier pickup",
      done: ["packed", "shipped", "delivered"].includes(order.status),
    },
    {
      icon: Truck,
      label: "On its way",
      description: order.tracking_url ? "Shipped with tracking" : "In transit to destination",
      done: ["shipped", "delivered"].includes(order.status),
    },
    {
      icon: Home,
      label: "Delivered",
      description: "Parcel has arrived at your address",
      done: order.status === "delivered",
    },
  ];

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-4xl grid gap-10 lg:grid-cols-[1.6fr_1fr]">

        {/* Tracking Details */}
        <div className="space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Order tracking</p>
              {isCancelled && (
                <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                  Cancelled
                </span>
              )}
            </div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl">Order {order.order_number}</h1>
            <p className="mt-2 text-muted-foreground">
              {isCancelled
                ? "This order was cancelled. Please contact support if you have any questions."
                : order.status === "delivered"
                  ? "Your order has been delivered! We hope you love your new items."
                  : "Thank you — we are preparing your order. You'll receive updates as it progresses."}
            </p>
          </div>

          {order.payment_method === "qr" && order.status === "confirmed" && (
            <div className="rounded-3xl border border-blush/60 bg-blush/20 p-5 text-sm text-foreground flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Payment Verification Pending</p>
                <p className="text-xs text-muted-foreground mt-1">
                  An admin is verifying your payment transaction reference <strong>{order.payment_ref}</strong>. Once approved, your order status will be updated.
                </p>
              </div>
            </div>
          )}

          {/* Tracking progress */}
          {!isCancelled ? (
            <div className="rounded-3xl border border-border p-6 md:p-8">
              <h2 className="font-display text-lg mb-6">Status Timeline</h2>
              <ol className="relative border-l border-border pl-6 space-y-8 ml-2">
                {steps.map((s) => (
                  <li key={s.label} className="relative">
                    {/* Circle marker */}
                    <span className={`absolute -left-[37px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${s.done ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}>
                      <s.icon className="h-3 w-3" />
                    </span>
                    <div>
                      <p className={`font-medium ${s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="rounded-3xl border border-border p-6 md:p-8 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">This order has been marked as cancelled.</p>
              {order.notes && <p className="mt-2 text-xs italic text-muted-foreground">Reason: "{order.notes}"</p>}
            </div>
          )}

          {/* Delivery & Shipping Info */}
          <div className="rounded-3xl border border-border p-6 md:p-8 space-y-6">
            <h2 className="font-display text-lg">Shipping details</h2>
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <h3 className="font-medium text-muted-foreground mb-1 uppercase tracking-wider text-[10px]">Shipping Address</h3>
                <p>{order.first_name} {order.last_name}</p>
                <p>{order.address}</p>
                <p>{order.city}, {order.zip}</p>
                <p>{order.country}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-1 uppercase tracking-wider text-[10px]">Contact Info</h3>
                <p>{order.email}</p>
                <div className="mt-4">
                  <h3 className="font-medium text-muted-foreground mb-1 uppercase tracking-wider text-[10px]">Payment Method</h3>
                  <p className="capitalize">
                    {order.payment_method === "card"
                      ? "Credit / Debit Card"
                      : order.payment_method === "qr"
                        ? "Scan QR Code"
                        : order.payment_method}
                  </p>
                  {order.payment_method === "qr" && order.payment_ref && (
                    <div className="mt-2 text-xs">
                      <span className="text-muted-foreground block uppercase tracking-wider text-[9px] font-medium">Reference ID</span>
                      <code className="bg-secondary px-1.5 py-0.5 rounded text-foreground font-mono">{order.payment_ref}</code>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {order.tracking_url && (
              <div className="pt-4 border-t border-border">
                <Button asChild variant="outline" className="w-full rounded-full">
                  <a href={order.tracking_url} target="_blank" rel="noopener noreferrer">
                    Track parcel with carrier
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary sidebar */}
        <div className="h-fit rounded-3xl bg-secondary/40 p-6 md:p-8 space-y-6">
          <h2 className="font-display text-lg">Items in order</h2>

          <ul className="divide-y divide-border/60">
            {items.map((i, idx) => (
              <li key={i.productId + (i.variantId ?? "") + idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                {i.image ? (
                  <img src={i.image} alt={i.name} className="h-16 w-16 rounded-xl object-cover bg-secondary" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary">
                    <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 text-sm">
                  <p className="font-medium">{i.name}</p>
                  {i.variantId && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Variant: {i.variantId}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatPrice(i.price)} × {i.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium">{formatPrice(i.price * i.quantity)}</p>
              </li>
            ))}
          </ul>

          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{order.shipping_cost === 0 ? "Free" : formatPrice(order.shipping_cost)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-destructive">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="border-t border-border my-2 pt-2 flex justify-between font-medium text-base">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="mx-auto max-w-4xl mt-12 flex flex-wrap gap-4 justify-center">
        <Button asChild className="rounded-full px-8"><Link to="/shop">Continue shopping</Link></Button>
        <Button asChild variant="outline" className="rounded-full px-8"><Link to="/account">View all orders</Link></Button>
      </div>
    </div>
  );
}

