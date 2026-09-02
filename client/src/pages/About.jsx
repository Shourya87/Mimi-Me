export default function About() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#5f4a3a]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#c98f84]">
            About Mimi & Me
          </p>

          <h1 className="text-4xl font-bold leading-tight text-[#5f4a3a] md:text-6xl">
            Little moments deserve
            <span className="block text-[#c98f84]">beautiful things.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#8d7968] md:text-lg">
            Mimi & Me is a thoughtfully curated clothing brand for babies,
            little girls, women, and moms. We believe clothing should feel
            comfortable, look beautiful, and make everyday moments a little
            more special.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#f8ebe3]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src="/about-story.jpg"
              alt="Mimi & Me collection"
              className="h-105 w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
              Our Story
            </p>

            <h2 className="text-3xl font-bold text-[#5f4a3a] md:text-4xl">
              Made with love, chosen with care.
            </h2>

            <p className="mt-6 leading-8 text-[#8d7968]">
              At Mimi & Me, we focus on bringing together clothing that
              combines comfort, quality, and timeless style. Every piece is
              selected with the idea that what you wear should not only look
              good but also feel right.
            </p>

            <p className="mt-4 leading-8 text-[#8d7968]">
              From playful outfits for little ones to elegant everyday styles
              for women, our collection is designed for the moments that
              become memories.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
            What We Believe
          </p>

          <h2 className="text-3xl font-bold text-[#5f4a3a] md:text-4xl">
            More than just clothing
          </h2>

          <p className="mt-4 leading-7 text-[#8d7968]">
            We keep three things at the heart of everything we curate.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#eadfd5] bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8ebe3] text-2xl">
              ♡
            </div>

            <h3 className="mt-6 text-xl font-semibold text-[#5f4a3a]">
              Comfort
            </h3>

            <p className="mt-3 leading-7 text-[#8d7968]">
              Clothing should feel as good as it looks, especially for
              everyday wear.
            </p>
          </div>

          <div className="rounded-3xl border border-[#eadfd5] bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8ebe3] text-2xl">
              ✦
            </div>

            <h3 className="mt-6 text-xl font-semibold text-[#5f4a3a]">
              Quality
            </h3>

            <p className="mt-3 leading-7 text-[#8d7968]">
              We value pieces that bring together thoughtful design and
              lasting quality.
            </p>
          </div>

          <div className="rounded-3xl border border-[#eadfd5] bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8ebe3] text-2xl">
              ✿
            </div>

            <h3 className="mt-6 text-xl font-semibold text-[#5f4a3a]">
              Timeless Style
            </h3>

            <p className="mt-3 leading-7 text-[#8d7968]">
              Beautiful styles that feel special today and remain meaningful
              tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-[#f5eee7]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <h2 className="text-3xl font-bold text-[#5f4a3a] md:text-4xl">
            For every little moment.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#8d7968]">
            Whether it is a first outfit, a family celebration, or simply
            another beautiful day, Mimi & Me is here to make getting dressed
            feel a little more special.
          </p>
        </div>
      </section>
    </main>
  );
}