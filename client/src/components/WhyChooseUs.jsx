import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Carefully selected styles made with quality and comfort in mind.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your favorite styles delivered safely and conveniently.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Shop confidently with a safe and secure checkout experience.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "A simple return experience when something isn't quite right.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      {/* Heading */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Why Mimi & Me
        </p>

        <h2 className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
          Shopping made simple
        </h2>

        <p className="mt-4 text-stone-500">
          Everything you need for a comfortable, reliable, and enjoyable
          shopping experience.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <Icon size={26} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-stone-900">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}