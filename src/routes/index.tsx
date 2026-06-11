import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/marketing/Hero";
import { FeaturedProducts } from "@/components/marketing/FeaturedProducts";
import { CategoryCards } from "@/components/marketing/CategoryCards";
import { WhyUs } from "@/components/marketing/WhyUs";
import { BestSellers } from "@/components/marketing/BestSellers";
import { TestimonialSlider } from "@/components/marketing/TestimonialSlider";
import { Newsletter } from "@/components/marketing/Newsletter";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Discover thoughtfully designed essentials for moms, babies, and families. Soft, considered, and made to be loved — with free US shipping over $60.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Mini & Me",
          description:
            "Soft essentials for mothers, babies, and the families they grow.",
          url: "/",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryCards />
      <WhyUs />
      <BestSellers />
      <TestimonialSlider />
      <Newsletter />
      <FaqAccordion />
    </>
  );
}
