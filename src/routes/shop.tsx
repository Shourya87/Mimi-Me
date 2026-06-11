import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { ProductCard } from "@/components/shop/ProductCard";
import { products, categories } from "@/lib/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "rating"]).optional(),
  page: z.number().optional(),
});
type SearchValues = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — Mini & Me" },
      {
        name: "description",
        content:
          "Browse soft essentials for mom, baby, and family — swaddles, knits, keepsakes, and gifts. Free US shipping over $60.",
      },
      { property: "og:title", content: "Shop the collection — Mini & Me" },
      {
        property: "og:description",
        content: "Quietly designed pieces for mom, baby, and the home.",
      },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const PAGE_SIZE = 8;

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const category = search.category;
  const q = search.q ?? "";
  const sort = search.sort ?? "featured";
  const page = search.page ?? 1;

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (q)
      list = list.filter((p) =>
        (p.name + p.tagline + p.category).toLowerCase().includes(q.toLowerCase()),
      );
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [category, q, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Shop</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">
          {category
            ? categories.find((c) => c.id === category)?.name ?? "Shop"
            : "Everything we make."}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Quietly designed pieces, made to be lived in.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <Link
          to="/shop"
          search={{}}
          className={`rounded-full border px-4 py-2 text-sm transition ${!category ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:bg-secondary"}`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/shop"
            search={{ category: c.id }}
            className={`rounded-full border px-4 py-2 text-sm transition ${category === c.id ? "border-foreground bg-foreground text-background" : "border-border bg-background hover:bg-secondary"}`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products"
            value={q}
            onChange={(e) =>
              navigate({ search: (s: SearchValues) => ({ ...s, q: e.target.value || undefined, page: 1 }) })
            }
            className="h-11 rounded-full bg-background pl-11"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
          </span>
          <Select
            value={sort}
            onValueChange={(v) =>
              navigate({ search: (s: SearchValues) => ({ ...s, sort: v as typeof sort, page: 1 }) })
            }
          >
            <SelectTrigger className="h-11 w-[170px] rounded-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Nothing matched. Try a different search.
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              to="/shop"
              search={(s: SearchValues) => ({ ...s, page: n })}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm transition ${n === current ? "bg-foreground text-background" : "bg-background hover:bg-secondary"}`}
            >
              {n}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
