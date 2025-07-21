import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { Skeleton } from "../skeleton";

export default function BestSellers({ allProducts }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const bestSellers = allProducts
      .filter((p) => p.placement?.includes("BestSeller"))
      .slice(0, 3); // .slice instead of .splice (to avoid mutating)

    setProducts(bestSellers);
    setLoading(false);
  }, [allProducts]);

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
    return <section className="py-18">{renderSkeletons()}</section>;
  }

  return (
    <section className="w-full py-32 px-4">
      {products.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {products.slice(0, 3).map((product, i) => (
            <div
              key={i}
              className={`
            ${i === 0 ? "lg:row-span-2" : ""}
          `}
            >
              <ProductCard product={product} key={i} index={i} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
