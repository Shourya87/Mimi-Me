import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="container-page py-16 md:py-24">
      <div className="overflow-hidden rounded-[2rem] bg-blush/40 px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-foreground/70">The Letter</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">
            Soft notes, small joys.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join the family for early access, gentle inspiration, and 10% off your first order.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("Welcome to the family", {
                description: "Your 10% off code is on its way.",
              });
              setEmail("");
            }}
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full border-foreground/15 bg-background px-5"
              aria-label="Email"
            />
            <Button type="submit" size="lg" className="h-12 rounded-full px-7">
              Subscribe
            </Button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            No spam, ever. Unsubscribe with one click.
          </p>
        </div>
      </div>
    </section>
  );
}
