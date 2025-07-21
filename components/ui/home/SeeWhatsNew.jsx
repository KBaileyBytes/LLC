import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export default function SeeWhatsNew(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/new");
        if (!res.ok) throw new Error("Failed to fetch unique products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading new products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderSkeletons = () => (
    <section className="grid lg:grid-cols-2 lg:gap-0 gap-8 place-items-center">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="w-[400px] h-[600px] p-4 rounded-2xl border border-neutral-200 shadow-sm"
        >
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <section className="p-16 bg-cyan-50">
      <p className=" py-8 koh-santepheap text-2xl sm:text-4xl font-bold">
        See What's New
      </p>

      {loading ? (
        renderSkeletons()
      ) : (
        <section className="grid lg:grid-cols-2 lg:gap-0 gap-8 place-items-center">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </section>
      )}
    </section>
  );
}
