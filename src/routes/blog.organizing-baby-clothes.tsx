import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/organizing-baby-clothes")({
  head: () => ({
    meta: [
      { title: "How to Organize Baby Clothes by Size and Season — Mini & Me" },
      {
        name: "description",
        content:
          "A simple, calm system for organizing baby clothes by size and season — drawer setups, rotation tips, and storage ideas from a mother-founded brand.",
      },
      {
        property: "og:title",
        content: "How to Organize Baby Clothes by Size and Season",
      },
      {
        property: "og:description",
        content:
          "A simple, calm system to keep baby clothes sorted, accessible, and ready for the next growth spurt.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blog/organizing-baby-clothes" },
    ],
    links: [{ rel: "canonical", href: "/blog/organizing-baby-clothes" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "How to Organize Baby Clothes by Size and Season",
          description:
            "A simple, calm system for organizing baby clothes by size and season.",
          author: { "@type": "Organization", name: "Mini & Me" },
          publisher: { "@type": "Organization", name: "Mini & Me" },
        }),
      },
    ],
  }),
  component: OrganizingPost,
});

function OrganizingPost() {
  return (
    <article className="container-page py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Journal</span>
        </nav>

        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
          Nursery · 6 min read
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">
          How to organize baby clothes by size and season
        </h1>
        <p className="mt-4 text-muted-foreground">
          A gentle, repeatable system so the right outfit is always within reach
          — and the next size up is ready before you need it.
        </p>

        <div className="mt-10 space-y-6 text-foreground/85">
          <h2 className="font-display text-2xl">Start with the size you're in</h2>
          <p>
            Babies grow in unpredictable bursts. Keep only the current size in
            the top drawer or the most-reached shelf. Everything else lives in
            labeled bins by size: <em>0–3m</em>, <em>3–6m</em>, <em>6–12m</em>,
            and so on. Clear bins beat opaque ones — you'll actually open them.
          </p>

          <h2 className="font-display text-2xl">Sort by use, not category</h2>
          <p>
            Group sleepers together, then daywear, then layering pieces. You
            dress your baby by occasion, not by clothing type — your drawers
            should match the rhythm of your day.
          </p>

          <h2 className="font-display text-2xl">Rotate with the season</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Twice a year, do a 20-minute swap: out-of-season → bin, in-season → drawer.</li>
            <li>Keep a single "transition" basket for shoulder-season layers.</li>
            <li>Tuck a swaddle or muslin in every bin — they work in every season.</li>
          </ul>

          <h2 className="font-display text-2xl">Plan one size ahead</h2>
          <p>
            Always have the next size washed, folded, and ready in a labeled
            bin. The day a onesie suddenly doesn't fit is not the day you want
            to be shopping.
          </p>

          <h2 className="font-display text-2xl">Keep keepsakes separate</h2>
          <p>
            The going-home outfit, the first knit bonnet, the matching set from
            grandma — these belong in a dedicated keepsake box, not the daily
            rotation. A simple{" "}
            <Link
              to="/product/$slug"
              params={{ slug: "porcelain-keepsake" }}
              className="underline"
            >
              porcelain keepsake jar
            </Link>{" "}
            is perfect for the tiniest mementos.
          </p>
        </div>

        <div className="mt-12 rounded-3xl bg-secondary/60 p-8 text-center">
          <p className="font-display text-xl">Building your nursery basics?</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Soft, certified-organic essentials made to grow with your little one.
          </p>
          <Link
            to="/shop"
            search={{ category: "baby" }}
            className="mt-5 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
          >
            Shop baby essentials
          </Link>
        </div>
      </div>
    </article>
  );
}
