import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const heroSlides = [
  {
    image: "/images/hero-1.jpg",
    label: "New Season",
    title: "Made for",
    accent: "beautiful moments.",
  },
  {
    image: "/images/hero-2.jpg",
    label: "Women's Edit",
    title: "Quietly",
    accent: "beautiful.",
  },
  {
    image: "/images/hero-3.jpg",
    label: "Little Ones",
    title: "Little styles,",
    accent: "big memories.",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const slide = heroSlides[activeSlide];

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#fffaf7]">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#f8ebe3]/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#eadfd5]/50 blur-3xl" />

      {/* Hero Container */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-8">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}
          <div className="relative z-10 max-w-xl">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#dfc2b3]" />

              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#8d7968]">
                Mimi & Me
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#6d5b4d] sm:text-6xl lg:text-[5rem]">
              {slide.title}

              <span className="mt-2 block font-serif font-normal italic text-[#c98f84]">
                {slide.accent}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-md text-sm leading-7 text-[#8d7968] sm:text-base">
              Thoughtfully chosen fashion for women, girls, and little ones —
              designed around comfort, confidence, and the moments that matter.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 rounded-full bg-[#6d5b4d] px-7 py-3.5 text-sm font-medium text-white shadow-[0_8px_25px_rgba(109,91,77,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#58493e] hover:shadow-lg"
              >
                Explore Collection

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight size={14} />
                </span>
              </Link>

              <Link
                to="/shop?category=Women"
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#7d6a59]"
              >
                Women's Edit

                <span className="h-px w-6 bg-[#dfc2b3] transition-all duration-300 group-hover:w-10 group-hover:bg-[#c98f84]" />
              </Link>
            </div>

            {/* Bottom Information */}
            <div className="mt-10 grid max-w-md grid-cols-2 border-t border-[#eadfd5] pt-5">
              <div className="pr-6">
                <p className="text-sm font-medium text-[#6d5b4d]">
                  Thoughtfully Selected
                </p>

                <p className="mt-1 text-xs leading-5 text-[#9a8879]">
                  Styles chosen with care
                </p>
              </div>

              <div className="border-l border-[#eadfd5] pl-6">
                <p className="text-sm font-medium text-[#6d5b4d]">
                  Made for Everyday
                </p>

                <p className="mt-1 text-xs leading-5 text-[#9a8879]">
                  Comfort meets style
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT VISUAL
          ====================================================== */}
          <div className="relative mx-auto w-full max-w-[580px]">
            {/* Slide Number */}
            <div className="absolute -left-5 top-5 z-20 hidden text-[10px] font-medium uppercase tracking-[0.3em] text-[#9a8879] sm:block">
              0{activeSlide + 1}
            </div>

            {/* Image Wrapper */}
            <div className="relative ml-auto w-[78%] sm:w-[72%] lg:w-[76%]">
              {/* Main Image */}
              <div className="relative aspect-[4/5] max-h-[calc(100vh-155px)] overflow-hidden rounded-[2rem] border border-[#eadfd5] bg-[#f8ebe3] shadow-[0_25px_70px_rgba(109,91,77,0.12)]">
                {heroSlides.map((item, index) => (
                  <img
                    key={item.image}
                    src={item.image}
                    alt={`${item.label} — Mimi & Me`}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                      index === activeSlide
                        ? "scale-100 opacity-100"
                        : "scale-105 opacity-0"
                    }`}
                  />
                ))}

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4f4036]/35 via-transparent to-transparent" />

                {/* Image Label */}
                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80">
                    {slide.label}
                  </p>

                  <p className="mt-1 text-lg font-medium text-white">
                    Mimi & Me
                  </p>
                </div>
              </div>

              {/* =================================================
                  FLOATING CARD
              ================================================== */}
              <div className="absolute -bottom-5 -left-6 z-10 hidden w-44 rounded-2xl border border-[#eadfd5] bg-[#fffaf7]/95 p-4 shadow-[0_15px_40px_rgba(109,91,77,0.12)] backdrop-blur-xl sm:block">
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8ebe3]">
                    <Sparkles size={14} className="text-[#c98f84]" />
                  </span>

                  <span className="text-[10px] text-[#9a8879]">
                    0{activeSlide + 1}/0{heroSlides.length}
                  </span>
                </div>

                <p className="text-xs font-medium uppercase tracking-wider text-[#9a8879]">
                  The Edit
                </p>

                <p className="mt-1 text-sm font-semibold text-[#6d5b4d]">
                  Discover your next favorite.
                </p>
              </div>

              {/* =================================================
                  SLIDER CONTROLS
              ================================================== */}
              <div className="absolute -bottom-5 right-0 z-20 flex items-center gap-2 rounded-full border border-[#e6d7c9] bg-[#fffaf5] p-1.5 shadow-[0_10px_30px_rgba(109,91,77,0.10)]">
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#7d6a59] transition-all duration-300 hover:bg-[#f8ebe3] hover:text-[#c98f84]"
                >
                  <ChevronLeft size={17} />
                </button>

                {/* Indicators */}
                <div className="flex items-center gap-1.5 px-1">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeSlide
                          ? "w-6 bg-[#c98f84]"
                          : "w-1.5 bg-[#dfc2b3]"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#7d6a59] transition-all duration-300 hover:bg-[#f8ebe3] hover:text-[#c98f84]"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            {/* Decorative Vertical Text */}
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] font-medium uppercase tracking-[0.35em] text-[#9a8879] lg:block">
              Fashion • Comfort • Memories
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}