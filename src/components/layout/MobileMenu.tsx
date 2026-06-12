import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, User } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { categories } from "@/lib/data/products";

interface Props {
  open: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
  onSignOut: () => void;
}

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop all" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/wishlist", label: "Wishlist" },
];

export function MobileMenu({ open, onClose, user, onSignOut }: Props) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="left" className="w-[88%] max-w-sm bg-background p-0">
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <SheetTitle className="font-display text-2xl">Mini &amp; Me</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-6 py-4">
          {links.map((l) => (
            <Link
              key={l.to + l.label}
              to={l.to}
              onClick={onClose}
              className="border-b border-border/40 py-4 font-display text-2xl text-foreground"
            >
              {l.label}
            </Link>
          ))}

          {/* Auth link */}
          {user ? (
            <>
              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center gap-2 border-b border-border/40 py-4 font-display text-2xl text-foreground"
              >
                <User className="h-5 w-5" />
                Account
              </Link>
              <button
                onClick={() => { onClose(); onSignOut(); }}
                className="flex items-center gap-2 py-4 font-display text-2xl text-foreground/60"
              >
                <LogOut className="h-5 w-5" />
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center gap-2 border-b border-border/40 py-4 font-display text-2xl text-foreground"
            >
              <LogIn className="h-5 w-5" />
              Sign in
            </Link>
          )}
        </nav>

        <div className="px-6 pb-6">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Shop by category
          </p>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/shop"
                  search={{ category: c.id }}
                  onClick={onClose}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
