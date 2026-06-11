import { createFileRoute, Link } from "@tanstack/react-router";
import about from "@/assets/about.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our story — Mini & Me" },
      {
        name: "description",
        content:
          "A small team of mothers, designing soft, sustainable essentials for the families they love. Meet the people behind Mini & Me.",
      },
      { property: "og:title", content: "Our story — Mini & Me" },
      {
        property: "og:description",
        content: "Started by a mother. Made for many — meet the team behind Mini & Me.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { t: "Soft on the skin", b: "Only certified, baby-safe materials. Every seam considered." },
  { t: "Soft on the planet", b: "Low-impact dyes, recycled packaging, carbon-neutral shipping." },
  { t: "Soft on you", b: "Honest prices, generous returns, real humans answering emails." },
];

function About() {
  return (
    <div className="pb-16">
      <section className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Our story</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">
            Started by a mother. Made for many.
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Mini &amp; Me began in a quiet apartment in 2022, with a swaddle that didn't exist yet.
            We couldn't find one that was beautiful, practical, and gentle enough — so we made it.
            Today we're a small team of designers, mothers, and makers building the brand we wished
            we'd had on day one.
          </p>
          <Button asChild className="mt-8 rounded-full px-6">
            <Link to="/shop">Shop the collection</Link>
          </Button>
        </div>
        <div className="overflow-hidden rounded-[2rem]">
          <img src={about} alt="Cream linen with lavender and a wooden block" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">What we believe</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Three soft promises.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.t} className="rounded-3xl bg-secondary/60 p-8">
              <p className="font-display text-5xl text-foreground/30">0{i + 1}</p>
              <h3 className="mt-4 font-display text-xl">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-[2rem] bg-blush/40 p-10 md:p-16">
          <p className="font-display text-2xl leading-snug md:text-4xl">
            "We design for the in-between moments — the bath time, the nap time, the just-because
            moments that fill a family's day. Soft, simple, and meant to last."
          </p>
          <p className="mt-6 text-sm text-muted-foreground">— Amelia, founder</p>
        </div>
      </section>
    </div>
  );
}
