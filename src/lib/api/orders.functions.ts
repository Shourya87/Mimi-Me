import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ─── Generate a readable order number ────────────────────────
function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 900 + 100).toString();
  return `MM-${timestamp}${random}`;
}

// ─── Snapshot item schema ─────────────────────────────────────
const orderItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
  image: z.string().optional(),
});

const placeOrderSchema = z.object({
  // Auth (optional — guest checkout supported)
  userId: z.string().uuid().optional(),
  // Contact
  email: z.string().email(),
  // Shipping
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(3),
  city: z.string().min(1),
  zip: z.string().min(3),
  country: z.string().min(2),
  // Items
  items: z.array(orderItemSchema).min(1),
  // Totals
  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  total: z.number().nonnegative(),
  // Payment
  paymentMethod: z.enum(["card", "applepay", "paypal", "qr"]).default("card"),
  paymentRef: z.string().optional(),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator(placeOrderSchema)
  .handler(async ({ data }) => {
    const orderNumber = generateOrderNumber();

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: data.userId ?? null,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        city: data.city,
        zip: data.zip,
        country: data.country,
        items: data.items,
        subtotal: data.subtotal,
        shipping_cost: data.shippingCost,
        discount: data.discount,
        total: data.total,
        payment_method: data.paymentMethod,
        payment_ref: data.paymentRef ?? null,
        status: "confirmed",
      })
      .select("id, order_number, status, created_at")
      .single();

    if (error) {
      console.error("[placeOrder] Supabase error:", error);
      throw new Error("Failed to place order. Please try again.");
    }

    return {
      orderId: order.id,
      orderNumber: order.order_number,
      status: order.status,
      createdAt: order.created_at,
    };
  });

// ─── Get all orders for a user ────────────────────────────────
const getMyOrdersSchema = z.object({
  userId: z.string().uuid(),
});

export const getMyOrders = createServerFn({ method: "POST" })
  .inputValidator(getMyOrdersSchema)
  .handler(async ({ data }) => {
    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select(
        "id, order_number, status, total, created_at, first_name, last_name, items",
      )
      .eq("user_id", data.userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getMyOrders] Supabase error:", error);
      throw new Error("Failed to load orders.");
    }

    return orders ?? [];
  });

// ─── Get single order ─────────────────────────────────────────
const getOrderSchema = z.object({
  orderNumber: z.string(),
  userId: z.string().uuid().optional(),
});

export const getOrder = createServerFn({ method: "POST" })
  .inputValidator(getOrderSchema)
  .handler(async ({ data }) => {
    let query = supabaseAdmin
      .from("orders")
      .select("*")
      .eq("order_number", data.orderNumber);

    // If authenticated, verify ownership
    if (data.userId) {
      query = query.eq("user_id", data.userId);
    }

    const { data: order, error } = await query.single();

    if (error || !order) {
      console.error("[getOrder] Supabase error:", error);
      throw new Error("Order not found.");
    }

    return order;
  });

// ─── Admin Auth Helper ─────────────────────────────────────────
async function adminAuthCheck(userId: string) {
  const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserById(userId);
  if (error || !user || user.email !== "admin@miniandme.co") {
    throw new Error("Unauthorized. Admin access only.");
  }
}

// ─── Admin: Get all orders ─────────────────────────────────────
const getAllOrdersAdminSchema = z.object({
  adminUserId: z.string().uuid(),
});

export const getAllOrdersAdmin = createServerFn({ method: "POST" })
  .inputValidator(getAllOrdersAdminSchema)
  .handler(async ({ data }) => {
    await adminAuthCheck(data.adminUserId);

    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getAllOrdersAdmin] Supabase error:", error);
      throw new Error("Failed to load all orders.");
    }

    return orders ?? [];
  });

// ─── Admin: Update order status ────────────────────────────────
const updateOrderStatusAdminSchema = z.object({
  adminUserId: z.string().uuid(),
  orderId: z.string().uuid(),
  status: z.enum(["confirmed", "packed", "shipped", "delivered", "cancelled"]),
  notes: z.string().optional(),
});

export const updateOrderStatusAdmin = createServerFn({ method: "POST" })
  .inputValidator(updateOrderStatusAdminSchema)
  .handler(async ({ data }) => {
    await adminAuthCheck(data.adminUserId);

    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        status: data.status,
        notes: data.notes ?? null,
      })
      .eq("id", data.orderId);

    if (error) {
      console.error("[updateOrderStatusAdmin] Supabase error:", error);
      throw new Error("Failed to update order status.");
    }

    return { success: true };
  });

// ─── Admin: Get Sales Analytics ───────────────────────────────
const getAnalyticsAdminSchema = z.object({
  adminUserId: z.string().uuid(),
});

export const getAnalyticsAdmin = createServerFn({ method: "POST" })
  .inputValidator(getAnalyticsAdminSchema)
  .handler(async ({ data }) => {
    await adminAuthCheck(data.adminUserId);

    // Fetch all orders
    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select("*");

    if (error || !orders) {
      console.error("[getAnalyticsAdmin] Supabase error:", error);
      throw new Error("Failed to compute analytics.");
    }

    // Compute metrics
    const totalSales = orders.reduce((acc, order) => acc + Number(order.total), 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Group sales by day (last 30 days) and aggregate products
    const salesByDayMap: Record<string, number> = {};
    const productSalesMap: Record<string, { name: string; quantity: number; revenue: number; image?: string }> = {};

    orders.forEach((order) => {
      // Sales by day
      const dateStr = new Date(order.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      salesByDayMap[dateStr] = (salesByDayMap[dateStr] || 0) + Number(order.total);

      // Parse items for product sales
      const items = (order.items as unknown as any[]) || [];
      items.forEach((item) => {
        const id = item.productId;
        const current = productSalesMap[id] || { name: item.name, quantity: 0, revenue: 0, image: item.image };
        current.quantity += item.quantity;
        current.revenue += (item.price * item.quantity);
        productSalesMap[id] = current;
      });
    });

    const salesByDay = Object.entries(salesByDayMap).map(([date, amount]) => ({
      date,
      amount,
    })).slice(-30); // Take last 30 entries

    const topProducts = Object.entries(productSalesMap)
      .map(([id, details]) => ({
        id,
        ...details,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Take top 5 products

    return {
      totalSales,
      totalOrders,
      averageOrderValue,
      salesByDay,
      topProducts,
    };
  });
