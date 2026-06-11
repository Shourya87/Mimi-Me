import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";
import { getProductById } from "@/lib/data/products";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: CartItem) => void;
  remove: (productId: string, variantId?: string) => void;
  setQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
}

const sameLine = (a: CartItem, b: CartItem) =>
  a.productId === b.productId && (a.variantId ?? "") === (b.variantId ?? "");

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => sameLine(i, item));
          if (existing) {
            return {
              items: s.items.map((i) =>
                sameLine(i, item) ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
            };
          }
          return { items: [...s.items, item] };
        }),
      remove: (productId, variantId) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.productId === productId && (i.variantId ?? "") === (variantId ?? "")),
          ),
        })),
      setQuantity: (productId, quantity, variantId) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.productId === productId && (i.variantId ?? "") === (variantId ?? "")
                ? { ...i, quantity }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      subtotal: () =>
        get().items.reduce((sum, i) => {
          const p = getProductById(i.productId);
          return sum + (p?.price ?? 0) * i.quantity;
        }, 0),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
    }),
    { name: "miniandme.cart" },
  ),
);
