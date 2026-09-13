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
    description:
      "Carefully selected styles made with quality and comfort in mind.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Get your favorite styles delivered safely and conveniently.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Shop confidently with a safe and secure checkout experience.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description:
      "A simple return experience when something isn't quite right.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      {/* Section Heading */}
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#dfc2b3]" />

          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9a8879]">
            Why Mimi & Me
          </p>

          <span className="h-px w-8 bg-[#dfc2b3]" />
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-[#6d5b4d] sm:text-4xl">
          Shopping made simple
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#9a8879] sm:text-base">
          Everything you need for a comfortable, reliable, and enjoyable
          shopping experience.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-3xl border border-[#eadfd5] bg-[#fffaf7] p-6 text-center shadow-[0_8px_25px_rgba(109,91,77,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#dfc2b3] hover:shadow-[0_15px_35px_rgba(109,91,77,0.10)]"
            >
              {/* Icon */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#dfc2b3] bg-[#f8ebe3] text-[#c98f84] transition-all duration-300 group-hover:bg-[#c98f84] group-hover:text-white">
                <Icon size={24} strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 className="mt-5 text-base font-semibold text-[#6d5b4d]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-[#9a8879]">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}