import ProductTab from "./ProductTab";

const PRODUCT_CATEGORIES = [
  "New & Unique",
  "Seasonal",
  "Coasters",
  "Resin Bowls",
  "Thinkers",
  "Turtle Family",
];

export default function ProductCategoryList({ products }) {
  return (
    <div className="w-full">
      <div className="mx-auto px-4">
        {PRODUCT_CATEGORIES.map((category) => {
          const filtered = products.filter(
            (product) => product.category === category
          );
          return filtered.map((product, index) => (
            <ProductTab
              key={`${category}-${index}`}
              index={index}
              product={product}
              category={category}
            />
          ));
        })}
      </div>
    </div>
  );
}
