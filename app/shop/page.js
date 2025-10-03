"use client";

import BestSellers from "@/components/ui/shop/BestSellers";
import ProductCategoryList from "@/components/ui/shop/ProductCategoryList";
import ShopCategoryTabs from "@/components/ui/shop/ShopCategoryTabs";
import { Tabs } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();

    fetchProducts();
  }, []);

  return (
    <section className="p-8">
      <BestSellers allProducts={products} />
      <Tabs defaultValue="New & Unique" className="px-8 flex flex-col gap-6">
        <ShopCategoryTabs categories={categories} />
        <ProductCategoryList products={products} />
      </Tabs>
    </section>
  );
}
