import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" aria-hidden />
              <span className="font-display text-2xl">Mini &amp; Me</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Soft, considered essentials for mothers, babies, and the families they grow.
              Designed with love. Made to be loved.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:hello@miniandme.co"
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background hover:bg-accent"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-base">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop" className="text-muted-foreground hover:text-foreground">All products</Link></li>
              <li><Link to="/shop" search={{ category: "baby" }} className="text-muted-foreground hover:text-foreground">Baby</Link></li>
              <li><Link to="/shop" search={{ category: "mom" }} className="text-muted-foreground hover:text-foreground">Mom</Link></li>
              <li><Link to="/shop" search={{ category: "matching" }} className="text-muted-foreground hover:text-foreground">Mini &amp; Me</Link></li>
              <li><Link to="/shop" search={{ category: "gifts" }} className="text-muted-foreground hover:text-foreground">Gifts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-base">Help</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link to="/account" className="text-muted-foreground hover:text-foreground">Account</Link></li>
              <li><Link to="/orders/$id" params={{ id: "demo" }} className="text-muted-foreground hover:text-foreground">Order tracking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-base">Brand</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">Our story</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Sustainability</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground">Press</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Mini &amp; Me. Made with care.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
