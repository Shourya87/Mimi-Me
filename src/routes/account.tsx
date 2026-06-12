import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart, Package, Settings, User, Loader2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, signOut } from "@/hooks/use-auth";
import { getMyOrders } from "@/lib/api/orders.functions";
import { getProfile, updateProfile } from "@/lib/api/profile.functions";
import { products } from "@/lib/data/products";
import { useWishlist } from "@/lib/store/wishlist";
import { ProductCard } from "@/components/shop/ProductCard";
import { formatPrice } from "@/lib/format";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Mini & Me" },
      { name: "description", content: "View your Mini & Me orders, manage your profile, and update your preferences." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/account" },
    ],
    links: [{ rel: "canonical", href: "/account" }],
  }),
  component: Account,
});

type Order = Tables<"orders">;
type Profile = Tables<"profiles">;

const profileSchema = z.object({
  fullName: z.string().min(2, "Required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});
type ProfileValues = z.infer<typeof profileSchema>;

const statusColors: Record<string, string> = {
  confirmed: "bg-lavender/60 text-foreground",
  packed: "bg-blush/60 text-foreground",
  shipped: "bg-sage/60 text-foreground",
  delivered: "bg-sage text-foreground",
  cancelled: "bg-muted text-muted-foreground",
};

function Account() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const ids = useWishlist((s) => s.ids);
  const wishlistProducts = products.filter((p) => ids.includes(p.id));

  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login", search: { next: "/account" } });
    }
  }, [user, loading, navigate]);

  // Load orders and profile
  useEffect(() => {
    if (!user) return;
    setDataLoading(true);

    Promise.all([
      getMyOrders({ data: { userId: user.id } }),
      getProfile({ data: { userId: user.id } }),
    ])
      .then(([ordersData, profileData]) => {
        setOrders(ordersData);
        setProfile(profileData);
        if (profileData) {
          form.reset({
            fullName: profileData.full_name ?? user.user_metadata?.full_name ?? "",
            phone: profileData.phone ?? "",
            address: profileData.address ?? "",
            city: profileData.city ?? "",
            zip: profileData.zip ?? "",
            country: profileData.country ?? "United States",
          });
        }
      })
      .catch(() => toast.error("Failed to load account data."))
      .finally(() => setDataLoading(false));
  }, [user, form]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out.");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  const onSaveProfile = async (values: ProfileValues) => {
    if (!user) return;
    setSavingProfile(true);
    try {
      await updateProfile({
        data: {
          userId: user.id,
          fullName: values.fullName,
          phone: values.phone,
          address: values.address,
          city: values.city,
          zip: values.zip,
          country: values.country,
        },
      });
      toast.success("Profile updated.");
      setEditingProfile(false);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              full_name: values.fullName,
              phone: values.phone ?? null,
              address: values.address ?? null,
              city: values.city ?? null,
              zip: values.zip ?? null,
              country: values.country ?? null,
            }
          : prev,
      );
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  // Loading state
  if (loading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const displayName =
    profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0] || "there";
  const firstName = displayName.split(" ")[0];

  return (
    <div className="container-page py-12 md:py-16">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Account</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Hello, {firstName}.</h1>
        </div>
        <Button variant="outline" className="rounded-full" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>

      <Tabs defaultValue="orders" className="mt-10">
        <TabsList className="rounded-full bg-secondary p-1">
          <TabsTrigger value="orders" className="rounded-full px-4">
            <Package className="mr-2 h-4 w-4" />Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="rounded-full px-4">
            <Heart className="mr-2 h-4 w-4" />Wishlist
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-full px-4">
            <User className="mr-2 h-4 w-4" />Profile
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full px-4">
            <Settings className="mr-2 h-4 w-4" />Settings
          </TabsTrigger>
        </TabsList>

        {/* ── Orders ── */}
        <TabsContent value="orders" className="mt-8">
          {dataLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading orders…
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl bg-background p-10 text-center ring-1 ring-border">
              <p className="font-display text-xl">No orders yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Once you place an order, it'll appear here.</p>
              <Button asChild className="mt-6 rounded-full px-6">
                <Link to="/shop">Start shopping</Link>
              </Button>
            </div>
          ) : (
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
                      <td className="px-5 py-4 font-medium">{o.order_number}</td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {new Date(o.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4">{formatPrice(o.total)}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs capitalize ${statusColors[o.status] ?? "bg-secondary"}`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to="/orders/$id"
                          params={{ id: o.order_number }}
                          className="text-sm hover:underline"
                        >
                          Track →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* ── Wishlist ── */}
        <TabsContent value="wishlist" className="mt-8">
          {wishlistProducts.length === 0 ? (
            <div className="rounded-2xl bg-background p-10 text-center ring-1 ring-border">
              <p className="font-display text-xl">Nothing saved yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any product to save it here.</p>
              <Button asChild className="mt-6 rounded-full px-6">
                <Link to="/shop">Browse the shop</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* ── Profile ── */}
        <TabsContent value="profile" className="mt-8">
          <form onSubmit={form.handleSubmit(onSaveProfile)}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">Personal information</h2>
              {!editingProfile ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-1.5"
                  onClick={() => setEditingProfile(true)}
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-full gap-1.5"
                    onClick={() => { setEditingProfile(false); form.reset(); }}
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-full gap-1.5"
                    disabled={savingProfile}
                  >
                    {savingProfile
                      ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      : <Check className="h-3.5 w-3.5" />}
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-4 rounded-2xl bg-background p-6 ring-1 ring-border sm:grid-cols-2">
              <ProfileField
                label="Full name"
                name="fullName"
                form={form}
                editing={editingProfile}
                value={profile?.full_name ?? ""}
              />
              <ProfileField
                label="Email"
                name="email"
                form={null}
                editing={false}
                value={user.email ?? ""}
              />
              <ProfileField
                label="Phone"
                name="phone"
                form={form}
                editing={editingProfile}
                value={profile?.phone ?? ""}
              />
              <ProfileField
                label="Country"
                name="country"
                form={form}
                editing={editingProfile}
                value={profile?.country ?? "United States"}
              />
              <div className="sm:col-span-2">
                <ProfileField
                  label="Address"
                  name="address"
                  form={form}
                  editing={editingProfile}
                  value={profile?.address ?? ""}
                />
              </div>
              <ProfileField
                label="City"
                name="city"
                form={form}
                editing={editingProfile}
                value={profile?.city ?? ""}
              />
              <ProfileField
                label="ZIP / Postal code"
                name="zip"
                form={form}
                editing={editingProfile}
                value={profile?.zip ?? ""}
              />
            </div>
          </form>
        </TabsContent>

        {/* ── Settings ── */}
        <TabsContent value="settings" className="mt-8">
          <div className="rounded-2xl bg-background p-6 ring-1 ring-border space-y-6">
            <div>
              <h3 className="font-display text-lg">Account</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{user.email}</span>
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="font-display text-lg text-destructive">Danger zone</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign out of your account on this device.
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-white"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Small helper component ────────────────────────────────────
function ProfileField({
  label,
  name,
  form,
  editing,
  value,
}: {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  editing: boolean;
  value: string;
}) {
  if (!editing || !form) {
    return (
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium">{value || "—"}</p>
      </div>
    );
  }

  return (
    <div>
      <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      <Input
        {...form.register(name)}
        className="h-10 rounded-xl bg-secondary/40"
      />
      {form.formState.errors[name] && (
        <p className="mt-1 text-xs text-destructive">{form.formState.errors[name]?.message}</p>
      )}
    </div>
  );
}
