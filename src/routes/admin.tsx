import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  CheckCircle,
  Truck,
  Package,
  XCircle,
  Search,
  Filter,
  Loader2,
  Lock,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, signIn, signUp, signOut } from "@/hooks/use-auth";
import { getAllOrdersAdmin, updateOrderStatusAdmin, getAnalyticsAdmin } from "@/lib/api/orders.functions";
import { formatPrice } from "@/lib/format";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Mini & Me" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type Order = Tables<"orders">;

interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  salesByDay: { date: string; amount: number }[];
  topProducts: { id: string; name: string; quantity: number; revenue: number; image?: string }[];
}

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginValues = z.infer<typeof loginSchema>;

const statusColors: Record<string, string> = {
  confirmed: "bg-lavender/60 text-foreground border-lavender",
  packed: "bg-blush/60 text-foreground border-blush",
  shipped: "bg-sage/60 text-foreground border-sage",
  delivered: "bg-sage text-white border-sage-dark",
  cancelled: "bg-muted text-muted-foreground border-border",
};

function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState<Record<string, string>>({});

  // Auth inputs states (for fallback login)
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [adminSetupAvailable, setAdminSetupAvailable] = useState(false);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const isAdmin = user?.email === "admin@miniandme.co";

  const loadAdminData = async () => {
    if (!user || !isAdmin) return;
    setLoading(true);
    try {
      const [ordersData, analyticsData] = await Promise.all([
        getAllOrdersAdmin({ data: { adminUserId: user.id } }),
        getAnalyticsAdmin({ data: { adminUserId: user.id } }),
      ]);
      setOrders(ordersData as Order[]);
      setAnalytics(analyticsData as AnalyticsData);
    } catch (err: unknown) {
      console.error("Error loading admin data:", err);
      toast.error("Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      loadAdminData();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleLogin = async (values: LoginValues) => {
    setIsLoggingIn(true);
    try {
      await signIn(values.email, values.password);
      toast.success("Welcome, Admin");
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Invalid login credentials")) {
        toast.error("Invalid credentials.", {
          description: "If this is a new Supabase project, click the setup button to create the admin account.",
        });
        setAdminSetupAvailable(true);
      } else {
        toast.error(err.message || "Failed to log in.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAutoSetup = async () => {
    setIsLoggingIn(true);
    try {
      await signUp("admin@miniandme.co", "admin123", "Store Administrator");
      toast.success("Admin account created successfully!", {
        description: "Credentials: admin@miniandme.co / admin123",
      });
      // Sign in right away
      await signIn("admin@miniandme.co", "admin123");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Setup failed. Check database configuration.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signIn("admin@miniandme.co", "admin123");
      toast.success("Logged in as Demo Admin");
    } catch (err: any) {
      console.error(err);
      // If user doesn't exist, create it automatically
      if (err.message?.includes("Invalid login credentials") || err.message?.includes("User not found")) {
        handleAutoSetup();
      } else {
        toast.error(err.message || "Failed to log in as demo admin.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order["status"]) => {
    if (!user) return;
    setUpdatingId(orderId);
    try {
      await updateOrderStatusAdmin({
        data: {
          adminUserId: user.id,
          orderId,
          status: newStatus,
          notes: notesInput[orderId] || undefined,
        },
      });
      toast.success(`Order status updated to ${newStatus}`);
      await loadAdminData();
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || (loading && orders.length === 0)) {
    return (
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">Initializing Admin Portal...</p>
      </div>
    );
  }

  // Fallback unauthorized login screen
  if (!user || !isAdmin) {
    return (
      <div className="container-page flex min-h-[85vh] items-center justify-center py-12">
        <Card className="w-full max-w-md border-border/80 shadow-lg rounded-3xl overflow-hidden">
          <CardHeader className="bg-secondary/40 border-b border-border/50 text-center pb-8 pt-8 px-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <CardTitle className="font-display text-2xl">Admin Portal</CardTitle>
            <CardDescription className="text-muted-foreground mt-1.5 text-xs">
              Access restricted to store administrators.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Admin Email</Label>
                <Input
                  type="email"
                  placeholder="admin@miniandme.co"
                  {...loginForm.register("email")}
                  className="h-11 rounded-xl bg-background border-border/60"
                  disabled={isLoggingIn}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-xs text-destructive">{loginForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...loginForm.register("password")}
                  className="h-11 rounded-xl bg-background border-border/60"
                  disabled={isLoggingIn}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-destructive">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full h-11 rounded-full mt-2" disabled={isLoggingIn}>
                {isLoggingIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                Sign In
              </Button>
            </form>

            <div className="relative flex py-2 items-center text-xs">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-muted-foreground uppercase tracking-widest text-[9px]">Demo Controls</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full h-11 rounded-full border-border/60 hover:bg-secondary/40"
                onClick={handleDemoLogin}
                disabled={isLoggingIn}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Login as Demo Admin
              </Button>
              {adminSetupAvailable && (
                <Button
                  variant="secondary"
                  className="w-full h-11 rounded-full"
                  onClick={handleAutoSetup}
                  disabled={isLoggingIn}
                >
                  Create Admin Account (admin123)
                </Button>
              )}
              <p className="text-[10px] text-center text-muted-foreground mt-3 leading-normal">
                Clicking <strong>"Login as Demo Admin"</strong> will automatically register the account <code>admin@miniandme.co</code> with password <code>admin123</code> if it is not already present in your Supabase Auth instance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      o.order_number.toLowerCase().includes(query) ||
      o.email.toLowerCase().includes(query) ||
      o.first_name.toLowerCase().includes(query) ||
      o.last_name.toLowerCase().includes(query) ||
      (o.payment_ref && o.payment_ref.toLowerCase().includes(query));

    const matchesStatus = statusFilter === "all" || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Store Management</span>
          <h1 className="font-display text-3xl md:text-4xl mt-1">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full px-5 text-xs h-10 border-border/60" onClick={() => loadAdminData()}>
            Refresh Data
          </Button>
          <Button variant="secondary" className="rounded-full px-5 text-xs h-10" onClick={() => { signOut(); navigate({ to: "/login" }); }}>
            Sign Out
          </Button>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="space-y-8">
        <TabsList className="bg-secondary/40 p-1 rounded-full inline-flex border border-border/40">
          <TabsTrigger value="analytics" className="rounded-full px-6 py-2 text-xs font-medium data-[state=active]:bg-background">
            Sales & Analytics
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-full px-6 py-2 text-xs font-medium data-[state=active]:bg-background">
            Order Fulfillment ({orders.length})
          </TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-8 animate-in fade-in duration-300">
          {analytics ? (
            <>
              {/* Metrics Grid */}
              <div className="grid gap-6 sm:grid-cols-3">
                <Card className="rounded-3xl border-border/60 bg-secondary/20 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-display text-3xl">{formatPrice(analytics.totalSales)}</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Accumulated store sales</p>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border-border/60 bg-secondary/20 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-display text-3xl">{analytics.totalOrders}</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Orders placed across all customers</p>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border-border/60 bg-secondary/20 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Average Value (AOV)</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="font-display text-3xl">{formatPrice(analytics.averageOrderValue)}</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Average spent per transaction</p>
                  </CardContent>
                </Card>
              </div>

              {/* Sales Chart & Top Selling Products */}
              <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
                {/* Sales Chart Card */}
                <Card className="rounded-3xl border-border/60 shadow-sm overflow-hidden">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="font-display text-xl">Revenue Trend</CardTitle>
                    <CardDescription className="text-xs">Sales performance over time</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <div className="h-[320px] w-full">
                      {analytics.salesByDay.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={analytics.salesByDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-primary, currentColor)" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="var(--color-primary, currentColor)" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 10 }} />
                            <YAxis tickLine={false} tickFormatter={(val) => `$${val}`} tick={{ fontSize: 10 }} />
                            <Tooltip formatter={(val) => [`$${Number(val).toFixed(2)}`, "Revenue"]} />
                            <Area type="monotone" dataKey="amount" stroke="currentColor" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                          No sales data available.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Products Card */}
                <Card className="rounded-3xl border-border/60 shadow-sm overflow-hidden">
                  <CardHeader className="p-6">
                    <CardTitle className="font-display text-xl">Top Selling Products</CardTitle>
                    <CardDescription className="text-xs">Ordered products list by volume</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    {analytics.topProducts.length > 0 ? (
                      <ul className="space-y-4">
                        {analytics.topProducts.map((p) => (
                          <li key={p.id} className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="h-12 w-12 rounded-xl object-cover bg-secondary" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate text-foreground">{p.name}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{p.quantity} units sold</p>
                            </div>
                            <p className="text-xs font-bold text-foreground">{formatPrice(p.revenue)}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-12 text-sm text-muted-foreground">
                        No product sales recorded yet.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-sm text-muted-foreground">
              Failed to load sales analytics details.
            </div>
          )}
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6 animate-in fade-in duration-300">
          {/* Controls bar */}
          <div className="flex flex-wrap items-center gap-4 justify-between bg-secondary/20 p-4 rounded-2xl border border-border/40">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search order no, email, name, reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-xl bg-background border-border/60 text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-background border border-border/60 rounded-xl text-xs px-3 py-2 h-10 text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Payment Pending</option>
                <option value="packed">Packed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered (Done)</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length > 0 ? (
            <div className="rounded-3xl border border-border overflow-hidden bg-background">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-secondary/40 border-b border-border/60 text-muted-foreground font-semibold">
                      <th className="p-4">Order Details</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredOrders.map((o) => {
                      const items = (o.items as unknown as any[]) || [];
                      const itemSummary = items.map((i) => `${i.name} (${i.quantity})`).join(", ");

                      return (
                        <tr key={o.id} className="hover:bg-secondary/10 transition-colors">
                          <td className="p-4 space-y-1">
                            <p className="font-bold text-foreground">{o.order_number}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {new Date(o.created_at).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate max-w-[200px]" title={itemSummary}>
                              {itemSummary}
                            </p>
                          </td>
                          <td className="p-4 space-y-0.5">
                            <p className="font-medium text-foreground">
                              {o.first_name} {o.last_name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{o.email}</p>
                            <p className="text-[10px] text-muted-foreground leading-normal max-w-[160px] truncate" title={o.address}>
                              {o.address}, {o.city}
                            </p>
                          </td>
                          <td className="p-4 space-y-1">
                            <p className="font-semibold text-foreground">{formatPrice(o.total)}</p>
                            <span className="inline-block rounded-full bg-secondary/80 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                              {o.payment_method === "qr" ? "Scan QR" : o.payment_method}
                            </span>
                            {o.payment_method === "qr" && o.payment_ref && (
                              <p className="text-[9px] font-mono text-muted-foreground mt-0.5">
                                Ref: <span className="bg-secondary px-1 py-0.2 rounded text-foreground">{o.payment_ref}</span>
                              </p>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-medium capitalize ${statusColors[o.status] || "bg-secondary"}`}>
                              {o.status === "confirmed" && o.payment_method === "qr" ? "Verification Pending" : o.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex flex-col items-end gap-1.5">
                              <div className="flex gap-1 justify-end">
                                {/* Verify Payment / Pack (if confirmed) */}
                                {o.status === "confirmed" && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleUpdateStatus(o.id, "packed")}
                                    className="h-8 rounded-lg text-[10px] px-2.5"
                                    disabled={updatingId === o.id}
                                  >
                                    <Package className="mr-1 h-3.5 w-3.5" />
                                    {o.payment_method === "qr" ? "Verify & Pack" : "Pack Order"}
                                  </Button>
                                )}

                                {/* Ship Order (if packed) */}
                                {o.status === "packed" && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleUpdateStatus(o.id, "shipped")}
                                    className="h-8 rounded-lg text-[10px] px-2.5"
                                    disabled={updatingId === o.id}
                                  >
                                    <Truck className="mr-1 h-3.5 w-3.5" />
                                    Ship Order
                                  </Button>
                                )}

                                {/* Mark Delivered / Done (if shipped or packed) */}
                                {["packed", "shipped"].includes(o.status) && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleUpdateStatus(o.id, "delivered")}
                                    className="h-8 rounded-lg text-[10px] px-2.5 bg-sage text-white hover:bg-sage-dark"
                                    disabled={updatingId === o.id}
                                  >
                                    <CheckCircle className="mr-1 h-3.5 w-3.5" />
                                    Mark Done (Delivered)
                                  </Button>
                                )}

                                {/* Cancel Order (if not delivered or cancelled) */}
                                {o.status !== "delivered" && o.status !== "cancelled" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUpdateStatus(o.id, "cancelled")}
                                    className="h-8 rounded-lg text-[10px] px-2.5 text-destructive border-destructive/20 hover:bg-destructive/10"
                                    disabled={updatingId === o.id}
                                  >
                                    <XCircle className="mr-1 h-3.5 w-3.5" />
                                    Cancel
                                  </Button>
                                )}
                              </div>
                              
                              {/* Notes Input for tracking or details */}
                              <div className="w-full max-w-[200px] flex gap-1 items-center mt-1">
                                <Input
                                  placeholder="Tracking link/Reason..."
                                  value={notesInput[o.id] || o.notes || ""}
                                  onChange={(e) => setNotesInput({ ...notesInput, [o.id]: e.target.value })}
                                  className="h-6 text-[10px] rounded-lg px-2"
                                  disabled={updatingId === o.id}
                                />
                                {notesInput[o.id] !== undefined && notesInput[o.id] !== o.notes && (
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleUpdateStatus(o.id, o.status)}
                                    className="h-6 w-6 rounded-md hover:bg-secondary"
                                    title="Save notes"
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-background p-12 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-display text-lg">No orders found</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                There are no orders matching your query.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
