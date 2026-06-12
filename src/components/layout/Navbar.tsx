import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingBag, Search, User, Menu, Sparkles, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { MobileMenu } from "./MobileMenu";
import { SearchDialog } from "@/components/shop/SearchDialog";
import { useAuth, signOut } from "@/hooks/use-auth";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Categories", search: { category: "matching" as const } },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useCart((s) => s.count());
  const wishCount = useWishlist((s) => s.ids.length);
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully.");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  // Get initials for avatar
  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? "U";

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

            {/* Auth-aware user menu */}
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        aria-label="Account menu"
                        className="hidden h-10 w-10 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 transition sm:inline-flex"
                      >
                        {initials}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <div className="px-3 py-2">
                        <p className="text-xs font-medium truncate">{user.user_metadata?.full_name ?? "Account"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/account" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          My account
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/wishlist" className="cursor-pointer">
                          <Heart className="mr-2 h-4 w-4" />
                          Wishlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to="/login"
                    aria-label="Sign in"
                    className="hidden h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm hover:bg-secondary transition sm:inline-flex"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in
                  </Link>
                )}
              </>
            )}

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
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} onSignOut={handleSignOut} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
