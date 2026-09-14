import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

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
      <main className="min-h-screen bg-[#F8F5F1] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#E6D9CC] bg-[#FFFCF9] p-8 text-center shadow-[0_10px_40px_rgba(109,91,77,0.06)] sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EBE3] text-[#9A7660]">
            <Sparkles size={21} />
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-[#4F3C30] sm:text-3xl">
            Unable to Load Categories
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#8D7968]">
            {error}
          </p>

          <button
            type="button"
            onClick={getCategories}
            className="mt-6 rounded-xl bg-[#74533F] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#604330] hover:shadow-md"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5F1]">
      {/* Hero */}
      <section className="border-b border-[#E7DBD0] bg-[#FFFCF9]">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-7 bg-[#D8BBA6]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A7660] sm:text-xs">
              Explore Mimi & Me
            </span>

            <span className="h-px w-7 bg-[#D8BBA6]" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#4F3C30] sm:text-4xl lg:text-[2.7rem]">
            Shop by Category
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#8D7968] sm:text-base">
            Discover thoughtfully curated styles for women, girls,
            babies, and every little moment worth dressing up for.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {categories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#DCCDBF] bg-[#FFFCF9] py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EBE3] text-[#9A7660]">
              <Sparkles size={20} />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-[#4F3C30]">
              No Categories Found
            </h2>

            <p className="mt-2 text-sm text-[#8D7968]">
              Categories will appear here once they are added.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] shadow-[0_8px_25px_rgba(109,91,77,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D3B8A3] hover:shadow-[0_15px_35px_rgba(109,91,77,0.10)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-[#F1E9DD]">
                  <img
                    src={category.image?.url || "/placeholder.png"}
                    alt={category.title}
                    loading="lazy"
                    className="aspect-[4/4.5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  {/* Soft Image Overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Explore Badge */}
                  <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-[#FFFCF9]/90 text-[#74533F] opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowRight size={16} />
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-semibold text-[#4F3C30] transition-colors duration-300 group-hover:text-[#8A6652] sm:text-lg">
                      {category.title}
                    </h2>

                    <p className="mt-1 text-[11px] text-[#9A8879] sm:text-xs">
                      Explore collection
                    </p>
                  </div>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E4D6CA] bg-[#FAF5F0] text-[#8A6B56] transition-all duration-300 group-hover:border-[#C9A991] group-hover:bg-[#F3E8DE]">
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
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