"use client";

import { useState, useEffect } from "react";
import LayoutGroup from "./LayoutGroup";

export default function LayoutManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();
        setProducts(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <p className="text-3xl font-bold py-8">Product Layout</p>
      <section className="flex flex-col gap-4">
        <LayoutGroup
          title="Carousel"
          products={products.filter((product) =>
            product.placement.includes("Carousel")
          )}
        />
        <LayoutGroup
          title="Unique"
          products={products.filter((product) =>
            product.placement.includes("Unique")
          )}
        />
        <LayoutGroup
          title="New"
          products={products.filter((product) =>
            product.placement.includes("New")
          )}
        />
        <LayoutGroup
          title="Best Sellers"
          products={products.filter((product) =>
            product.placement.includes("BestSeller")
          )}
        />
      </section>
    </>
  );
}
