import { ArrowUpRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#eadfd5] bg-[#f8ebe3] shadow-[0_15px_45px_rgba(109,91,77,0.08)]">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#c98f84]/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

        <div className="pointer-events-none absolute right-1/4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-white/60" />

        {/* Content */}
        <div className="relative flex flex-col items-start justify-between gap-8 px-7 py-9 sm:px-10 sm:py-11 lg:flex-row lg:items-center lg:px-14">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfc2b3] bg-white/70 text-[#c98f84]">
                <Tag size={16} />
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8d7968]">
                Special Offer
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight text-[#6d5b4d] sm:text-4xl lg:text-[2.7rem]">
              Refresh your wardrobe
              <span className="block font-serif font-normal italic text-[#c98f84]">
                with up to 30% off.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#8d7968] sm:text-base">
              Discover selected styles at special prices. Find something
              beautiful for yourself or someone you love.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/shop"
            className="group flex shrink-0 items-center gap-3 rounded-full bg-[#6d5b4d] px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_25px_rgba(109,91,77,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#58493e] hover:shadow-lg"
          >
            Shop Now

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}