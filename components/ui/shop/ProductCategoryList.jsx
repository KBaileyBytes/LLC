"use client";

import ProductTab from "./ProductTab";
import { useEffect, useState } from "react";

export default function ProductCategoryList({ products }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.categories || []);
        console.log(data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto px-4">
        {categories.map((category) => {
          console.log(products);
          console.log(category);
          const filtered = products.filter(
            (product) => String(product.category) === String(category._id)
          );
          console.log(filtered);
          return filtered.map((product, index) => (
            <ProductTab
              key={`${category}-${index}`}
              index={index}
              product={product}
              category={category.name}
            />
          ));
        })}
      </div>
    </div>
  );
}
