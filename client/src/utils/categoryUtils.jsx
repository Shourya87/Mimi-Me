export function categoryToSlug(category = "") {
  return category
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

export function slugToCategory(slug = "") {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}