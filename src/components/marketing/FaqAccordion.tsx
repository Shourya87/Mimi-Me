import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data/faqs";

export function FaqAccordion() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">FAQ</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl">
            Anything we can answer?
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Still curious? Reach out at{" "}
            <a className="underline" href="mailto:hello@miniandme.co">
              hello@miniandme.co
            </a>
            .
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60">
              <AccordionTrigger className="py-5 text-left font-display text-lg hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
