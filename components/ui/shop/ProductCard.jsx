import { Card, CardContent } from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import AddToCart from "../AddToCart";
import { redirect } from "next/navigation";

export default function ProductCard({ product, index }) {
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

  if (!product) {
    return (
      <section className="py-18">
        <p className="py-8 koh-santepheap text-2xl sm:text-4xl font-bold">
          Shop Unique, One-of-a-Kind Creations
        </p>
        {renderSkeletons()}
      </section>
    );
  }

  // Second and 3rd items are horizontal separating the single portrait card
  return (
    <Card className="border-0 shadow-none cursor-pointer hover:scale-102 transition-transform flex flex-col h-full gap-8">
      <CardContent
        className={`flex ${
          index === 1 || index === 2 ? "flex-col xl:flex-row" : "flex-col"
        } justify-between max-w-[500px] xl:max-w-[800px] mx-auto items-center gap-8`}
      >
        <CldImage
          src={product.image}
          alt={product.name}
          width={index === 1 || index === 2 ? 325 : 400}
          height={index === 1 || index === 2 ? 250 : 600}
          className="cursor-pointer rounded-2xl"
        />
        <div className="w-full flex justify-center xl:justify-start">
          <div className="w-full">
            <span>
              <p
                className="koh-santepheap text-3xl py-4 font-semibold cursor-pointer"
                onClick={() => {
                  redirect(`/shop/${product._id}`);
                }}
              >
                {product.name}
              </p>
            </span>
            <section className="flex justify-between">
              <section className="text-neutral-500">
                <p>{product.description}</p>

                {product.details && (
                  <p className="py-1 italic line-clamp-2">{product.details}</p>
                )}

                {product.dimensions && (
                  <p className="py-2 italic">
                    {product.dimensions.width} × {product.dimensions.height}{" "}
                    {product.dimensions.metric}
                  </p>
                )}

                <p className="font-bold py-4 text-black">${product.price}</p>
              </section>
              <AddToCart product={product} />
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
