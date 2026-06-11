export type Category = "baby" | "mom" | "matching" | "gifts" | "home";

export interface ProductVariant {
  id: string;
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  image: string;
  category: Category;
  badge?: string;
  rating: number;
  reviewCount: number;
  bestSeller?: boolean;
  variants?: {
    name: string;
    options: ProductVariant[];
  };
  details: string[];
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
}

export interface Faq {
  q: string;
  a: string;
}
