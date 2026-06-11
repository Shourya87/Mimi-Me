import { Leaf, HeartHandshake, Truck, ShieldCheck } from "lucide-react";

const items = [
  { icon: Leaf, title: "Gently made", text: "GOTS & OEKO-TEX certified materials, tested for what you can't see." },
  { icon: HeartHandshake, title: "Family-owned", text: "A small team of mothers designing for mothers — every detail intentional." },
  { icon: Truck, title: "Free US shipping", text: "Complimentary shipping on every order over $60. Always carbon-neutral." },
  { icon: ShieldCheck, title: "30-day returns", text: "If it doesn't feel right, send it back. No hard feelings, no questions." },
];

export function WhyUs() {
  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Why Mini &amp; Me</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Built on trust. Made to last.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.title} className="rounded-3xl bg-background p-7">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blush/60">
                <i.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-xl">{i.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
