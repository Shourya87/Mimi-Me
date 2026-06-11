import { Link } from "@tanstack/react-router";
import { categories } from "@/lib/data/products";

const accent: Record<string, string> = {
  baby: "bg-blush/60",
  mom: "bg-lavender/60",
  matching: "bg-sage/60",
  gifts: "bg-blush/40",
  home: "bg-lavender/40",
};

export function CategoryCards() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Shop by</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">Find the right kind of soft.</h2>
        </div>
        <Link to="/shop" className="hidden text-sm text-foreground hover:underline md:inline">
          All products →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/shop"
            search={{ category: c.id }}
            className={`group flex aspect-square flex-col justify-between rounded-3xl p-5 transition hover:-translate-y-0.5 md:aspect-[3/4] ${accent[c.id]}`}
          >
            <span className="text-xs uppercase tracking-widest text-foreground/70">0{categories.indexOf(c) + 1}</span>
            <div>
              <h3 className="font-display text-2xl">{c.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-foreground/70">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
