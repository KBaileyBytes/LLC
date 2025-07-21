import ProductCard from "./ProductCard";

import { useState, useEffect } from "react";
import { Skeleton } from "../skeleton";

export default function ShopUnique() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/unique");
        if (!res.ok) throw new Error("Failed to fetch unique products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading unique products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderSkeletons = () => (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-1 place-items-center">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full max-w-[400px] p-4 my-8 rounded-2xl border border-neutral-200 shadow-sm"
        >
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </section>
  );

  if (loading) {
    return (
      <section className="py-18">
        <p className="py-8 koh-santepheap text-2xl sm:text-4xl font-bold">
          Shop Unique, One-of-a-Kind Creations
        </p>
        {renderSkeletons()}
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-18">
      <p className="py-8 koh-santepheap text-3xl sm:text-4xl font-bold">
        Shop Unique, One-of-a-Kind Creations
      </p>
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-1 place-items-center">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </section>
    </section>
  );
}
