import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { Button } from "@/components/ui/button";

export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((p) => (p + 1) % testimonials.length);

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-lavender/40 p-8 text-center md:p-16">
        <Quote className="mx-auto h-7 w-7 text-foreground/60" aria-hidden />
        <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">
          "{t.quote}"
        </p>
        <div className="mt-8 text-sm">
          <p className="font-medium">{t.author}</p>
          <p className="text-muted-foreground">{t.role}</p>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={prev} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"}`}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={next} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
