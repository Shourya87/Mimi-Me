export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#6d5b4d]">
      {/* Hero */}
      <section className="border-b border-[#E7DBD0] bg-[#FFFCF9]">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D8BBA6]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9A7660] sm:text-xs">
              About Mimi & Me
            </span>
            <span className="h-px w-8 bg-[#D8BBA6]" />
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#4F3C30] sm:text-4xl lg:text-5xl">
            Little moments deserve
            <span className="block text-[#B77D73]">
              beautiful things.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#8D7968] sm:text-base">
            Mimi & Me is a thoughtfully curated clothing brand for babies,
            little girls, women, and moms. We believe clothing should feel
            comfortable, look beautiful, and make everyday moments a little
            more special.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#F3E8DE]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div className="overflow-hidden rounded-3xl border border-[#E2D2C4] bg-[#E9DDD2] shadow-[0_12px_35px_rgba(109,91,77,0.08)]">
            <img
              src="/about-story.jpg"
              alt="Mimi & Me collection"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.02]"
            />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-6 bg-[#D0AD97]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A7660] sm:text-xs">
                Our Story
              </p>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-[#4F3C30] sm:text-3xl lg:text-4xl">
              Made with love,
              <span className="block text-[#8A6652]">
                chosen with care.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#806F60] sm:text-base">
              At Mimi & Me, we focus on bringing together clothing that
              combines comfort, quality, and timeless style. Every piece is
              selected with the idea that what you wear should not only look
              good but also feel right.
            </p>

            <p className="mt-3 text-sm leading-7 text-[#806F60] sm:text-base">
              From playful outfits for little ones to elegant everyday styles
              for women, our collection is designed for the moments that
              become memories.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-[#D8BBA6]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A7660] sm:text-xs">
              What We Believe
            </p>
            <span className="h-px w-6 bg-[#D8BBA6]" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#4F3C30] sm:text-3xl lg:text-4xl">
            More than just clothing
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#8D7968]">
            We keep three things at the heart of everything we curate.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Comfort */}
          <div className="group rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] p-6 text-center shadow-[0_8px_25px_rgba(109,91,77,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D3B8A3] hover:shadow-[0_15px_35px_rgba(109,91,77,0.10)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F3E8DE] text-xl text-[#B77D73] transition duration-300 group-hover:bg-[#EEDDD5]">
              ♡
            </div>

            <h3 className="mt-5 text-lg font-semibold text-[#4F3C30]">
              Comfort
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#8D7968]">
              Clothing should feel as good as it looks, especially for
              everyday wear.
            </p>
          </div>

          {/* Quality */}
          <div className="group rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] p-6 text-center shadow-[0_8px_25px_rgba(109,91,77,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D3B8A3] hover:shadow-[0_15px_35px_rgba(109,91,77,0.10)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F3E8DE] text-xl text-[#8A6652] transition duration-300 group-hover:bg-[#EEDDD5]">
              ✦
            </div>

            <h3 className="mt-5 text-lg font-semibold text-[#4F3C30]">
              Quality
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#8D7968]">
              We value pieces that bring together thoughtful design and
              lasting quality.
            </p>
          </div>

          {/* Timeless Style */}
          <div className="group rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] p-6 text-center shadow-[0_8px_25px_rgba(109,91,77,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D3B8A3] hover:shadow-[0_15px_35px_rgba(109,91,77,0.10)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F3E8DE] text-xl text-[#9A7660] transition duration-300 group-hover:bg-[#EEDDD5]">
              ✿
            </div>

            <h3 className="mt-5 text-lg font-semibold text-[#4F3C30]">
              Timeless Style
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#8D7968]">
              Beautiful styles that feel special today and remain meaningful
              tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="border-t border-[#E7DBD0] bg-[#F3EAE2]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#D0AD97]" />
            <span className="text-[#B77D73]">✦</span>
            <span className="h-px w-7 bg-[#D0AD97]" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#4F3C30] sm:text-3xl lg:text-4xl">
            For every little moment.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#8D7968] sm:text-base">
            Whether it is a first outfit, a family celebration, or simply
            another beautiful day, Mimi & Me is here to make getting dressed
            feel a little more special.
          </p>
        </div>
      </section>
    </main>
  );
}