import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/store/cart";
import { getProductById } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { useAuth } from "@/hooks/use-auth";
import { placeOrder } from "@/lib/api/orders.functions";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  address: z.string().min(3, "Required"),
  city: z.string().min(1, "Required"),
  zip: z.string().min(3, "Required"),
  country: z.string().min(2, "Required"),
  payment: z.enum(["card", "applepay", "paypal", "qr"]),
  paymentRef: z.string().optional(),
}).refine((data) => {
  if (data.payment === "qr" && (!data.paymentRef || data.paymentRef.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Transaction Reference ID is required for QR payments",
  path: ["paymentRef"],
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Mini & Me" },
      { name: "description", content: "Securely complete your Mini & Me order with fast US shipping and 30-day returns." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: Checkout,
});

function Checkout() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email ?? "",
      country: "United States",
      payment: "card",
      paymentRef: "",
    },
  });

  const selectedPayment = form.watch("payment");

  const onSubmit = async (values: FormValues) => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Build item snapshots with product data
      const orderItems = items.map((i) => {
        const p = getProductById(i.productId);
        return {
          productId: i.productId,
          variantId: i.variantId,
          name: p?.name ?? "Unknown product",
          price: p?.price ?? 0,
          quantity: i.quantity,
          image: p?.image ?? "",
        };
      });

      const result = await placeOrder({
        data: {
          userId: user?.id,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          city: values.city,
          zip: values.zip,
          country: values.country,
          items: orderItems,
          subtotal,
          shippingCost: shipping,
          discount: 0,
          total,
          paymentMethod: values.payment,
          paymentRef: values.paymentRef || undefined,
        },
      });

      clear();
      toast.success("Order placed!", {
        description: `Thank you ${values.firstName}! Order ${result.orderNumber} is confirmed.`,
      });
      navigate({ to: "/orders/$id", params: { id: result.orderNumber } });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>
      <p className="mt-2 text-muted-foreground">Secure, simple, and shipped within 1–2 days.</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-10">
          {/* Contact */}
          <section>
            <h2 className="font-display text-xl">Contact</h2>
            <div className="mt-5 grid gap-4">
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input
                  type="email"
                  {...form.register("email")}
                  className="h-11 rounded-xl bg-background"
                  autoComplete="email"
                />
              </Field>
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="font-display text-xl">Shipping</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" error={form.formState.errors.firstName?.message}>
                <Input {...form.register("firstName")} className="h-11 rounded-xl bg-background" autoComplete="given-name" />
              </Field>
              <Field label="Last name" error={form.formState.errors.lastName?.message}>
                <Input {...form.register("lastName")} className="h-11 rounded-xl bg-background" autoComplete="family-name" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address" error={form.formState.errors.address?.message}>
                  <Input {...form.register("address")} className="h-11 rounded-xl bg-background" autoComplete="street-address" />
                </Field>
              </div>
              <Field label="City" error={form.formState.errors.city?.message}>
                <Input {...form.register("city")} className="h-11 rounded-xl bg-background" autoComplete="address-level2" />
              </Field>
              <Field label="ZIP / Postal code" error={form.formState.errors.zip?.message}>
                <Input {...form.register("zip")} className="h-11 rounded-xl bg-background" autoComplete="postal-code" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Country" error={form.formState.errors.country?.message}>
                  <Input {...form.register("country")} className="h-11 rounded-xl bg-background" autoComplete="country-name" />
                </Field>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-display text-xl">Payment</h2>
            <p className="mt-1 text-sm text-muted-foreground">Demo only — no charges are made.</p>
            {/* TODO_FOR_HUMAN: Integrate Stripe Elements here for real payment processing.
                Install @stripe/react-stripe-js and @stripe/stripe-js, add VITE_STRIPE_PUBLISHABLE_KEY
                to .env, and replace the RadioGroup below with a <PaymentElement />. */}
            <RadioGroup
              defaultValue="card"
              onValueChange={(v) => form.setValue("payment", v as FormValues["payment"])}
              className="mt-5 grid gap-3"
            >
              {[
                { v: "card", label: "Credit / Debit Card" },
                { v: "applepay", label: "Apple Pay" },
                { v: "paypal", label: "PayPal" },
                { v: "qr", label: "Scan QR Code (UPI / Bank Pay)" },
              ].map((opt) => (
                <label
                  key={opt.v}
                  htmlFor={`pay-${opt.v}`}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-background px-5 py-4 transition hover:bg-secondary/60"
                >
                  <RadioGroupItem id={`pay-${opt.v}`} value={opt.v} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>

            {selectedPayment === "qr" && (
              <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex flex-col items-center text-center space-y-3">
                  <p className="text-sm font-medium">Scan to Pay: {formatPrice(total)}</p>
                  <div className="rounded-2xl bg-white p-3 shadow-sm border border-border">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=miniandme@upi&pn=Mini%20and%20Me&am=${(total * 83).toFixed(2)}&cu=INR&tn=Order`)}`}
                      alt="Payment QR Code"
                      className="h-44 w-44 object-contain"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Please scan the QR code above with any UPI app (GPay, PhonePe, Paytm) to pay <strong>{formatPrice(total)}</strong> (~₹{(total * 83).toFixed(0)}).
                  </p>
                </div>

                <div className="border-t border-border pt-4 font-normal text-left">
                  <Field label="Transaction ID / UPI Reference No" error={form.formState.errors.paymentRef?.message}>
                    <Input
                      type="text"
                      {...form.register("paymentRef")}
                      placeholder="Enter 12-digit Ref No or Transaction ID"
                      className="h-11 rounded-xl bg-background"
                      disabled={isSubmitting}
                    />
                  </Field>
                </div>
              </div>
            )}
          </section>

          {/* Trust badges */}
          <ul className="grid gap-3 rounded-2xl bg-secondary/60 p-5 text-sm">
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 shrink-0" /> Free shipping on orders over $60
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 shrink-0" /> 30-day no-fuss returns
            </li>
          </ul>

          <Button
            type="submit"
            size="lg"
            className="h-12 w-full rounded-full lg:hidden"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? "Placing order…" : `Pay ${formatPrice(total)}`}
          </Button>
        </div>

        {/* Order Summary sidebar */}
        <aside className="h-fit rounded-3xl bg-secondary/60 p-7 lg:sticky lg:top-24">
          <h2 className="font-display text-xl">Order summary</h2>
          <ul className="mt-5 space-y-4">
            {items.map((i) => {
              const p = getProductById(i.productId);
              if (!p) return null;
              return (
                <li key={i.productId + (i.variantId ?? "")} className="flex gap-3 text-sm">
                  <img src={p.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{p.name}</p>
                    {i.variantId && (
                      <p className="text-xs text-muted-foreground">
                        {p.variants?.options.find((o) => o.id === i.variantId)?.label}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">Qty {i.quantity}</p>
                  </div>
                  <p className="font-medium">{formatPrice(p.price * i.quantity)}</p>
                </li>
              );
            })}
          </ul>
          <div className="my-5 border-t border-border" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
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
          <Button
            type="submit"
            form=""
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
            className="mt-6 hidden h-12 w-full rounded-full lg:inline-flex"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSubmitting ? "Placing order…" : `Pay ${formatPrice(total)}`}
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
