import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import useCategoryStore from "../store/categoryStore";

export default function Categories() {
  const {
    categories,
    getCategories,
    loading,
    error,
  } = useCategoryStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (loading) {
    return <Loader text="Loading Categories..." />;
  }

  if (error) {
    return (
      <main className="min-h-screen px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold text-stone-800">
            Unable to Load Categories
          </h1>

          <p className="mt-3 text-stone-500">
            {error}
          </p>

          <button
            onClick={getCategories}
            className="mt-6 rounded-xl bg-[#6F4E37] px-6 py-3 font-semibold text-white transition hover:bg-[#5A3F2D]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFCF8]">
      {/* Hero */}
      <section className="border-b border-[#E8DDD2] bg-[#F9F2EA]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#C98F84]">
            Explore Mimi & Me
          </p>

          <h1 className="text-4xl font-bold text-[#5A4636] md:text-5xl">
            Shop by Category
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#8D7968]">
            Discover thoughtfully curated styles for women, girls, babies,
            and more.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {categories.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-semibold text-stone-800">
              No Categories Found
            </h2>

            <p className="mt-2 text-stone-500">
              Categories will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#E8DDD2] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={category.image?.url || "/placeholder.png"}
                    alt={category.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="p-5 text-center">
                  <h2 className="text-xl font-semibold text-[#5A4636] transition group-hover:text-[#C98F84]">
                    {category.title}
                  </h2>

                  <span className="mt-2 inline-block text-sm font-medium text-[#9B8776]">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}