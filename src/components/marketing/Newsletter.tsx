import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter({
        data: { email },
      });
      
      toast.success("Welcome to the family", {
        description: "Your 10% off code is on its way.",
      });
      setEmail("");
    } catch (err: unknown) {
      console.error("Newsletter error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onSubmit={onSubmit}
          >
            <Input
              type="email"
              required
              disabled={isSubmitting}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full border-foreground/15 bg-background px-5"
              aria-label="Email"
            />
            <Button type="submit" size="lg" className="h-12 rounded-full px-7" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? "Subscribing..." : "Subscribe"}
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

