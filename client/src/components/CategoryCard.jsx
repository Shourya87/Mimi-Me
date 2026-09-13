import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function CategoryCard({ category }) {
  const { title, slug, image } = category;

  return (
    <Link
      to={`/categories/${slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image?.url || "/placeholder.png"}
          alt={title}
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

        {/* Explore Icon */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>

        {/* Category Title */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-white/80">
            Explore collection
          </p>
        </div>
      </div>
    </Link>
  );
}