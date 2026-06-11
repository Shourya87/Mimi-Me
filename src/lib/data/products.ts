import type { Product, Review } from "@/lib/types";
import swaddle from "@/assets/product-swaddle.jpg";
import bonnet from "@/assets/product-bonnet.jpg";
import teether from "@/assets/product-teether.jpg";
import loungewear from "@/assets/product-loungewear.jpg";
import keepsake from "@/assets/product-keepsake.jpg";
import bunny from "@/assets/product-bunny.jpg";
import blanket from "@/assets/product-blanket.jpg";

export const categories = [
  { id: "baby", name: "Baby", description: "Soft essentials for the littlest one." },
  { id: "mom", name: "Mom", description: "Loungewear and self-care for mama." },
  { id: "matching", name: "Mini & Me", description: "Matching sets to twin in." },
  { id: "gifts", name: "Gifts", description: "Thoughtful keepsakes, ready to give." },
  { id: "home", name: "Nursery", description: "Calm corners for sweet sleep." },
] as const;

export const products: Product[] = [
  {
    id: "p-001",
    slug: "blush-muslin-swaddle",
    name: "Blush Muslin Swaddle",
    tagline: "Organic cotton, cloud-soft.",
    description:
      "Hand-finished organic cotton swaddle, woven for breathability and a featherweight feel. Designed to grow with your little one — from newborn naps to toddler picnics.",
    price: 38,
    compareAt: 46,
    image: swaddle,
    category: "baby",
    badge: "New",
    rating: 4.9,
    reviewCount: 128,
    bestSeller: true,
    variants: {
      name: "Color",
      options: [
        { id: "blush", label: "Blush", value: "blush" },
        { id: "cream", label: "Cream", value: "cream" },
        { id: "sage", label: "Sage", value: "sage" },
      ],
    },
    details: [
      "100% GOTS-certified organic cotton",
      "47\" x 47\" — generous, lightweight weave",
      "Machine wash cold, tumble dry low",
    ],
  },
  {
    id: "p-002",
    slug: "knit-bonnet",
    name: "Heirloom Knit Bonnet",
    tagline: "Hand-knit warmth for tiny heads.",
    description:
      "A timeless ribbed bonnet, hand-knit from merino blend yarn. Gentle ties, no tags, no fuss — the kind of piece you'll keep forever.",
    price: 32,
    image: bonnet,
    category: "baby",
    rating: 4.8,
    reviewCount: 86,
    variants: {
      name: "Size",
      options: [
        { id: "0-3", label: "0–3 m", value: "0-3" },
        { id: "3-6", label: "3–6 m", value: "3-6" },
        { id: "6-12", label: "6–12 m", value: "6-12" },
      ],
    },
    details: ["Merino & cotton blend", "Hand-finished ties", "Hand wash, lay flat"],
  },
  {
    id: "p-003",
    slug: "wooden-teether",
    name: "Sage Wooden Teether",
    tagline: "Natural beech, food-grade silicone.",
    description:
      "A simple, sensory-rich teether made from sustainably-sourced beechwood and soft food-grade silicone beads.",
    price: 18,
    image: teether,
    category: "baby",
    rating: 4.9,
    reviewCount: 214,
    bestSeller: true,
    details: ["Untreated beechwood", "BPA & phthalate free", "Wipe clean with damp cloth"],
  },
  {
    id: "p-004",
    slug: "mini-and-me-loungewear",
    name: "Mini & Me Loungewear Set",
    tagline: "Matching softness for two.",
    description:
      "Buttery-soft modal loungewear sets for mama and baby. The kind of pieces you live in on slow Sundays.",
    price: 124,
    compareAt: 148,
    image: loungewear,
    category: "matching",
    badge: "Bestseller",
    rating: 5,
    reviewCount: 67,
    bestSeller: true,
    variants: {
      name: "Mom size",
      options: [
        { id: "xs", label: "XS", value: "xs" },
        { id: "s", label: "S", value: "s" },
        { id: "m", label: "M", value: "m" },
        { id: "l", label: "L", value: "l" },
      ],
    },
    details: ["95% modal, 5% elastane", "Tagless, flat-seam construction", "Machine wash gentle"],
  },
  {
    id: "p-005",
    slug: "porcelain-keepsake",
    name: "Porcelain Keepsake Jar",
    tagline: "For first curls, first tooth, first everything.",
    description:
      "A hand-glazed porcelain jar with a small brass finial — a quiet place to hold the moments you don't want to forget.",
    price: 48,
    image: keepsake,
    category: "gifts",
    rating: 4.9,
    reviewCount: 41,
    details: ["Hand-glazed porcelain", "Brass finial detail", "Gift-boxed"],
  },
  {
    id: "p-006",
    slug: "plush-bunny",
    name: "Little Bunny Plush",
    tagline: "The first friend.",
    description:
      "An impossibly soft plush bunny with hand-embroidered features. Weighted just right for tiny hands to hold.",
    price: 28,
    image: bunny,
    category: "baby",
    badge: "Loved",
    rating: 5,
    reviewCount: 302,
    bestSeller: true,
    details: ["Recycled polyester plush", "Hand-embroidered face", "Surface wash only"],
  },
  {
    id: "p-007",
    slug: "waffle-knit-blanket",
    name: "Waffle Knit Blanket",
    tagline: "Pram, crib, or couch — it just works.",
    description:
      "A textured waffle-knit blanket in undyed organic cotton. Lightweight but warm, with a softness that only gets better with time.",
    price: 64,
    image: blanket,
    category: "home",
    rating: 4.8,
    reviewCount: 154,
    bestSeller: true,
    details: ["100% organic cotton", "36\" x 40\"", "Machine wash cold"],
  },
  {
    id: "p-008",
    slug: "new-mama-gift-set",
    name: "New Mama Gift Set",
    tagline: "A welcome for the whole family.",
    description:
      "A curated little bundle — swaddle, bonnet, teether, and a hand-written note. Wrapped in our signature cream box.",
    price: 96,
    compareAt: 112,
    image: keepsake,
    category: "gifts",
    badge: "Gift",
    rating: 4.9,
    reviewCount: 58,
    details: ["Includes 4 pieces", "Gift box & ribbon", "Optional hand-written note"],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const getRelatedProducts = (productId: string, limit = 4) =>
  products.filter((p) => p.id !== productId).slice(0, limit);

export const reviewsFor = (productId: string): Review[] => [
  {
    id: `${productId}-r1`,
    author: "Sophie L.",
    rating: 5,
    date: "2 weeks ago",
    title: "Better than I imagined",
    body: "The quality is unreal for the price. We use it daily and it has only gotten softer.",
  },
  {
    id: `${productId}-r2`,
    author: "Mira K.",
    rating: 5,
    date: "1 month ago",
    title: "A keeper",
    body: "Gifted one to my sister and immediately ordered another for us. Beautifully packaged.",
  },
  {
    id: `${productId}-r3`,
    author: "Hannah P.",
    rating: 4,
    date: "1 month ago",
    title: "Lovely",
    body: "Shipping took a few extra days but the product is genuinely lovely. Will be back.",
  },
];
