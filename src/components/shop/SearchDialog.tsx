import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: Props) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q) return products.slice(0, 6);
    const needle = q.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.tagline.toLowerCase().includes(needle) ||
        p.category.includes(needle),
    );
  }, [q]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search products, categories..." value={q} onValueChange={setQ} />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
            <Search className="h-5 w-5" />
            <p className="text-sm">No products match "{q}"</p>
          </div>
        </CommandEmpty>
        <CommandGroup heading="Products">
          {results.map((p) => (
            <CommandItem
              key={p.id}
              value={p.name}
              onSelect={() => {
                onOpenChange(false);
              }}
              asChild
            >
              <Link
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="flex items-center gap-3"
              >
                <img
                  src={p.image}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.tagline}</p>
                </div>
                <span className="text-sm text-muted-foreground">{formatPrice(p.price)}</span>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
