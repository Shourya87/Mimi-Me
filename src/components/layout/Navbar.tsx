import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Search, User, Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { MobileMenu } from "./MobileMenu";
import { SearchDialog } from "@/components/shop/SearchDialog";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Categories", search: { category: "matching" as const } },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCart((s) => s.count());
  const wishCount = useWishlist((s) => s.ids.length);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-secondary md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-foreground" aria-hidden />
            <span className="font-display text-xl tracking-tight md:text-2xl">Mini &amp; Me</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search}
                className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="rounded-full"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
            >
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-secondary sm:inline-flex"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
