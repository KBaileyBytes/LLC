import AddToCart from "@/components/ui/AddToCart";
import { TabsContent } from "@/components/ui/tabs";
import { CldImage } from "next-cloudinary";
import { redirect } from "next/navigation";

export default function ProductTab({ product, category, index }) {
  return (
    <TabsContent
      key={index}
      value={category}
      className={`flex justify-between w-full flex-col items-center xl:flex-row xl:items-start my-8 py-16 ${
        index !== 0 ? "border-t-2 border-t-zinc-200" : ""
      }`}
    >
      <CldImage
        src={product.image}
        alt={product.name}
        width={400}
        height={600}
        className="cursor-pointer rounded-2xl"
      />
      <div className="w-full flex justify-center xl:justify-start">
        <div className="sm:max-w-xl w-full xl:px-16 xl:max-w-4xl">
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
                <p className="py-1 italic">{product.details}</p>
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
    </TabsContent>
  );
}
