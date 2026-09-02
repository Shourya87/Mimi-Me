import { ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-6 py-12 sm:px-10 lg:px-16">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-orange-400">
              <Tag size={20} />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Special Offer
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Refresh your wardrobe
              <span className="block text-orange-400">
                with up to 30% off.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-stone-300">
              Discover selected styles at special prices. Find something
              beautiful for yourself or someone you love.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/shop"
            className="group flex shrink-0 items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-600"
          >
            Shop Now
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}