import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Package, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Mini & Me" },
      {
        name: "description",
        content:
          "View your Mini & Me orders, manage your profile, and update your shipping and notification preferences.",
      },
      { property: "og:url", content: "/account" },
    ],
    links: [{ rel: "canonical", href: "/account" }],
  }),
  component: Account,
});

const orders = [
  { id: "MM-204912", date: "Mar 12, 2026", total: "$124.00", status: "Delivered" },
  { id: "MM-204318", date: "Feb 28, 2026", total: "$38.00", status: "Delivered" },
  { id: "MM-203881", date: "Feb 14, 2026", total: "$96.00", status: "Delivered" },
];

function Account() {
  return (
    <div className="container-page py-12 md:py-16">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Account</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Hello, Amelia.</h1>
        </div>
        <Button variant="outline" className="rounded-full">Sign out</Button>
      </div>

      <Tabs defaultValue="orders" className="mt-10">
        <TabsList className="rounded-full bg-secondary p-1">
          <TabsTrigger value="orders" className="rounded-full px-4"><Package className="mr-2 h-4 w-4" />Orders</TabsTrigger>
          <TabsTrigger value="wishlist" className="rounded-full px-4"><Heart className="mr-2 h-4 w-4" />Wishlist</TabsTrigger>
          <TabsTrigger value="profile" className="rounded-full px-4"><User className="mr-2 h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full px-4"><Settings className="mr-2 h-4 w-4" />Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-8">
          <div className="overflow-hidden rounded-2xl ring-1 ring-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-border bg-background">
                    <td className="px-5 py-4 font-medium">{o.id}</td>
                    <td className="px-5 py-4 text-muted-foreground">{o.date}</td>
                    <td className="px-5 py-4">{o.total}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-sage/60 px-3 py-1 text-xs">{o.status}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link to="/orders/$id" params={{ id: o.id }} className="text-sm hover:underline">
                        Track →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="wishlist" className="mt-8">
          <p className="text-sm text-muted-foreground">
            Your saved items live on the <Link to="/wishlist" className="underline">Wishlist page</Link>.
          </p>
        </TabsContent>

        <TabsContent value="profile" className="mt-8">
          <div className="grid gap-4 rounded-2xl bg-background p-6 ring-1 ring-border sm:grid-cols-2">
            <Field label="Name" value="Amelia Rivers" />
            <Field label="Email" value="amelia@example.com" />
            <Field label="Phone" value="+1 (555) 010-2025" />
            <Field label="Address" value="221b Linen St., Brooklyn, NY" />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-8">
          <p className="text-sm text-muted-foreground">Notification & privacy preferences will live here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
