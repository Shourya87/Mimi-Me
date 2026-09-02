import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">
        {/* Content */}
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            Welcome to Mimi & Me
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-stone-900 sm:text-6xl">
            Style made
            <span className="block text-orange-500">for every moment.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
            Discover beautiful styles for women, girls, and little ones.
            Thoughtfully selected pieces made to bring comfort and confidence
            to every day.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              Shop Collection
            </Link>

            <Link
              to="/shop?category=Women"
              className="rounded-xl border border-stone-300 bg-white px-6 py-3.5 font-semibold text-stone-800 transition hover:border-orange-400 hover:text-orange-600"
            >
              Explore Women
            </Link>
          </div>

          {/* Small highlights */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-stone-600">
            <div>
              <p className="font-semibold text-stone-900">Premium Quality</p>
              <p>Carefully selected styles</p>
            </div>

            <div>
              <p className="font-semibold text-stone-900">Easy Shopping</p>
              <p>Simple & secure checkout</p>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative flex items-center justify-center">
          {/* Decorative blobs */}
          <div className="absolute -right-8 top-0 h-40 w-40 rounded-full bg-orange-200/50 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-pink-200/60 blur-3xl" />

          <div className="relative w-full max-w-lg">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl">
              <div className="flex h-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-orange-100 via-pink-100 to-amber-100">
                <div className="text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white/70 shadow-sm">
                    <span className="text-4xl">M&M</span>
                  </div>

                  <p className="mt-6 text-2xl font-semibold text-stone-800">
                    Mimi & Me
                  </p>

                  <p className="mt-2 text-sm text-stone-500">
                    Fashion for every generation
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-lg backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                New Collection
              </p>
              <p className="mt-1 font-bold text-stone-800">
                Fresh styles are here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}