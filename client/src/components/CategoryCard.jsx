import { Link } from "react-router-dom";

export default function CategoryCard({ categories }) {
  const { title, slug, image } = categories;

  return (
    <Link
      to={`/categories/${slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="overflow-hidden">
        <img
          src={image?.url}
          alt={title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-800 transition group-hover:text-pink-500">
          {title}
        </h3>
      </div>
    </Link>
  );
}