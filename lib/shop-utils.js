import { Shop } from "./utils";

export function getProductById(id) {
  return Shop.products.find((product) => product.id === id);
}

/**
 * Get products for a specific content section
 */
export function getProductsSection(section) {
  const ids = Shop.contentSections[section];
  return ids.map(getProductById).filter(Boolean); // Filters out undefined
}

export function getRelatedProducts(categories, excludeId = null) {
  return Shop.products.filter(
    (product) =>
      product.id !== excludeId &&
      product.categories?.some((cat) => categories.includes(cat))
  );
}
