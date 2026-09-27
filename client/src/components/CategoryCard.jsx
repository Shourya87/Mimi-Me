import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { categoryToSlug } from "../utils/categoryUtils";

export default function CategoryCard({
  category,
  image = "/placeholder.png",
}) {
  const categorySlug = categoryToSlug(category);

  return (
    <Link
      to={`/categories/${categorySlug}`}
      className="group overflow-hidden rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] shadow-[0_8px_25px_rgba(109,91,77,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D3B8A3] hover:shadow-[0_15px_35px_rgba(109,91,77,0.10)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F1E9DD]">
        <img
          src={image}
          alt={category}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = "/placeholder.png";
          }}
          className="aspect-[4/4.5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Image Overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Single Image Arrow */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-[#FFFCF9]/90 text-[#74533F] opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-[#4F3C30] transition-colors duration-300 group-hover:text-[#8A6652] sm:text-lg">
            {category}
          </h2>

          <p className="mt-1 text-[11px] text-[#9A8879] sm:text-xs">
            Explore collection
          </p>
        </div>
      </div>
    </Link>
  );
}