"use client";

import BestSellers from "@/components/ui/shop/BestSellers";
import ProductCategoryList from "@/components/ui/shop/ProductCategoryList";
import ShopCategoryTabs from "@/components/ui/shop/ShopCategoryTabs";
import { Tabs } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const PRODUCT_CATEGORIES = [
  "New & Unique",
  "Seasonal",
  "Resin Bowls",
  "Thinkers",
  "Turtle Family",
];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="p-8">
      <BestSellers allProducts={products} />
      <Tabs defaultValue="New & Unique" className="px-8 flex flex-col gap-6">
        <ShopCategoryTabs categories={PRODUCT_CATEGORIES} />
        <ProductCategoryList products={products} />
      </Tabs>
    </section>
  );
}
