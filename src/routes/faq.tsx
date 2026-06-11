import { createFileRoute } from "@tanstack/react-router";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { faqs } from "@/lib/data/faqs";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Mini & Me" },
      {
        name: "description",
        content:
          "Answers to common questions about shipping, returns, baby-safe materials, gift wrapping, and international delivery at Mini & Me.",
      },
      { property: "og:title", content: "Frequently Asked Questions — Mini & Me" },
      {
        property: "og:description",
        content: "Shipping, returns, materials, and gifting — answered.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <section className="container-page pt-12 md:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Help center</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-muted-foreground">
            Everything you might want to know about ordering, materials, and care.
          </p>
        </div>
      </section>
      <FaqAccordion />
    </>
  );
}
