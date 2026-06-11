import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-20 lg:gap-16 lg:py-28">
        <div className="order-2 md:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-blush/60 px-3 py-1 text-xs uppercase tracking-widest text-foreground">
            New · Spring softness
          </span>
          <h1 className="mt-5 font-display text-[2.75rem] leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Made for the
            <br />
            <span className="italic">softest</span> moments.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Thoughtfully designed essentials for mothers, babies, and the small,
            quiet rituals that hold a family together.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/shop">
                Shop the collection
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full">
              <Link to="/about">Our story</Link>
            </Button>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Reviews</dt>
              <dd className="mt-1 font-display text-2xl">4.9★</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Families</dt>
              <dd className="mt-1 font-display text-2xl">40k+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground">Shipping</dt>
              <dd className="mt-1 font-display text-2xl">Free*</dd>
            </div>
          </dl>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-lavender/70 blur-2xl md:h-64 md:w-64" aria-hidden />
          <div className="absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-sage/70 blur-2xl md:h-56 md:w-56" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] bg-blush/40">
            <img
              src={hero}
              alt="Mother holding a smiling baby in soft natural light"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
