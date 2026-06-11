import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Package, Truck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const steps = [
  { icon: Check, label: "Confirmed", date: "Today, 9:14 AM", done: true },
  { icon: Package, label: "Packed with care", date: "Tomorrow", done: true },
  { icon: Truck, label: "On its way", date: "In 2 days", done: false },
  { icon: Home, label: "Delivered", date: "In 4–6 days", done: false },
];

function OrderTracking() {
  const { id } = Route.useParams();

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Order tracking</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">Order {id}</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you — we're packing your order with care. You'll get a tracking email when it ships.
        </p>

        <ol className="mt-12 space-y-6">
          {steps.map((s, i) => (
            <li key={s.label} className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${s.done ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"}`}
                >
                  <s.icon className="h-4 w-4" />
                </div>
                {i < steps.length - 1 && <div className="mt-2 h-12 w-px bg-border" />}
              </div>
              <div className="pt-2.5">
                <p className="font-display text-lg">{s.label}</p>
                <p className="text-sm text-muted-foreground">{s.date}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild className="rounded-full px-6"><Link to="/shop">Continue shopping</Link></Button>
          <Button asChild variant="outline" className="rounded-full px-6"><Link to="/account">View all orders</Link></Button>
        </div>
      </div>
    </div>
  );
}
