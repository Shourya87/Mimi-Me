import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/store/cart";
import { getProductById } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  address: z.string().min(3, "Required"),
  city: z.string().min(1, "Required"),
  zip: z.string().min(3, "Required"),
  country: z.string().min(2, "Required"),
  payment: z.enum(["card", "applepay", "paypal"]),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Mini & Me" },
      {
        name: "description",
        content:
          "Securely complete your Mini & Me order with fast US shipping and 30-day returns.",
      },
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
  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { country: "United States", payment: "card" },
  });

  const onSubmit = (values: FormValues) => {
    toast.success("Order placed!", {
      description: `Thank you ${values.firstName}, your order is on its way.`,
    });
    clear();
    navigate({ to: "/orders/$id", params: { id: "MM-" + Date.now().toString().slice(-6) } });
  };

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>
      <p className="mt-2 text-muted-foreground">Secure, simple, and shipped within 1–2 days.</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl">Contact</h2>
            <div className="mt-5 grid gap-4">
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input type="email" {...form.register("email")} className="h-11 rounded-xl bg-background" />
              </Field>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl">Shipping</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="First name" error={form.formState.errors.firstName?.message}>
                <Input {...form.register("firstName")} className="h-11 rounded-xl bg-background" />
              </Field>
              <Field label="Last name" error={form.formState.errors.lastName?.message}>
                <Input {...form.register("lastName")} className="h-11 rounded-xl bg-background" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address" error={form.formState.errors.address?.message}>
                  <Input {...form.register("address")} className="h-11 rounded-xl bg-background" />
                </Field>
              </div>
              <Field label="City" error={form.formState.errors.city?.message}>
                <Input {...form.register("city")} className="h-11 rounded-xl bg-background" />
              </Field>
              <Field label="ZIP / Postal code" error={form.formState.errors.zip?.message}>
                <Input {...form.register("zip")} className="h-11 rounded-xl bg-background" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Country" error={form.formState.errors.country?.message}>
                  <Input {...form.register("country")} className="h-11 rounded-xl bg-background" />
                </Field>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl">Payment</h2>
            <p className="mt-1 text-sm text-muted-foreground">Demo only — no charges are made.</p>
            <RadioGroup
              defaultValue="card"
              onValueChange={(v) => form.setValue("payment", v as FormValues["payment"])}
              className="mt-5 grid gap-3"
            >
              {[
                { v: "card", label: "Credit / Debit Card" },
                { v: "applepay", label: "Apple Pay" },
                { v: "paypal", label: "PayPal" },
              ].map((opt) => (
                <label
                  key={opt.v}
                  htmlFor={`pay-${opt.v}`}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-background px-5 py-4"
                >
                  <RadioGroupItem id={`pay-${opt.v}`} value={opt.v} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          </section>

          <Button type="submit" size="lg" className="h-12 w-full rounded-full lg:hidden">
            Pay {formatPrice(total)}
          </Button>
        </div>

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
          <Button type="submit" form="" onClick={form.handleSubmit(onSubmit)} size="lg" className="mt-6 hidden h-12 w-full rounded-full lg:inline-flex">
            Pay {formatPrice(total)}
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
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
