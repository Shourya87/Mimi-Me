// utils/formatCurrency.js

export default function formatCurrency (price) {
  return `₹${price.toLocaleString("en-IN")}`;
};