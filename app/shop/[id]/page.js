"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import AddToCart from "@/components/ui/AddToCart";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

export default function ProductDetailPage() {
  const { id } = useParams();
  const ref = useRef();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [requestedProducts, setRequestedProducts] = useState(1);
  const { updateProductQuantity, subtotal, itemCount, addToCart } = useCart();
  const [customRequest, setCustomRequest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!product?.category) return;
      try {
        const res = await fetch(
          `/api/admin/products/related?category=${product.category}&exclude=${product._id}`
        );
        if (!res.ok) throw new Error("Failed to fetch related products");
        const data = await res.json();
        setRelatedProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRelated();
  }, [product]);

  if (!product || !relatedProducts) return null;

  return (
    <>
      <section className="p-4 sm:p-8 lg:p-16 mx-auto flex flex-col xl:flex-row gap-8 items-center xl:items-start max-w-7xl">
        {product.image && (
          <CldImage
            src={product.image}
            alt={product.name}
            width={400}
            height={600}
            className="self-center rounded-2xl"
          />
        )}
        <section className="w-full max-w-2xl flex flex-col gap-4">
          <p className="px-8 koh-santepheap text-2xl sm:text-4xl font-bold">
            {product.name}
          </p>
          <p className="px-8 text-lg font-bold pt-4">${product.price}</p>
          {product.details && (
            <p className="px-8 text-neutral-600">{product.details}</p>
          )}

          {product.dimensions && (
            <div className="px-8 text-sm text-neutral-500 italic">
              {product.dimensions.width} × {product.dimensions.height}{" "}
              {product.dimensions.metric}
            </div>
          )}
          <p className="px-8 pt-4 italic text-neutral-500">{product.size}</p>
          <section className="flex flex-row justify-between p-4 mx-4">
            <section className="flex flex-row gap-4">
              <Button
                className={`self-start ${
                  customRequest
                    ? " text-neutral-400 "
                    : "text-white hover:cursor-pointer"
                } bg-neutral-800 px-10`}
                variant="secondary"
                size="lg"
                onClick={() => {
                  if (!customRequest) {
                    for (let i = 0; i < requestedProducts; i++) {
                      addToCart(product);
                    }
                    toast.success(`${product.name} added to cart!`, {
                      description: `${
                        itemCount + requestedProducts
                      } items totalling $${(
                        parseFloat(subtotal) +
                        parseFloat(product.price) * requestedProducts
                      ).toFixed(2)}`,
                      duration: 10000,
                      icon: <CheckIcon />,
                    });
                    setRequestedProducts(1);
                  }
                }}
              >
                Add to cart
              </Button>
              {product.customizable?.enabled && (
                <Button
                  className="self-start hover:cursor-pointer"
                  variant="outline"
                  size="lg"
                  onClick={() => setCustomRequest((state) => !state)}
                >
                  Custom Request
                </Button>
              )}
            </section>
            <div className="flex items-center gap-2 mx-2">
              <Button
                variant="ghost"
                onClick={() => {
                  if (requestedProducts > 1) {
                    setRequestedProducts((state) => state - 1);
                  }
                }}
                className="cursor-pointer text-lg"
              >
                -
              </Button>
              <p className="py-2 px-3 border-1 border-neutral-300 rounded-lg text-center">
                {requestedProducts}
              </p>
              <Button
                variant="ghost"
                onClick={() => setRequestedProducts((state) => state + 1)}
                className="cursor-pointer text-lg"
              >
                +
              </Button>
            </div>
          </section>
          {customRequest && (
            <div className="grid px-8 gap-3">
              {product.customizable?.options && (
                <>
                  <p className="text-neutral-500 font-bold py-2">
                    Custom Options
                  </p>
                  <ul>
                    {product.customizable.options.map((option, i) => (
                      <li
                        className="text-sm text-neutral-500 italic pb-2"
                        key={i}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Textarea
                ref={ref}
                placeholder="Describe your custom details (e.g., gold swirls, sparkles, highlight colors)"
                id="message-2"
                className="h-28 border-1 border-neutral-400 focus-visible:ring-neutral-700 focus-visible:ring-1"
              />
              <p className="text-sm text-neutral-500 italic py-2">
                Your custom request will be sent to the creator for review.
                You’ll receive a confirmation email if approved.
              </p>
              <section className="grid grid-cols-2 gap-2">
                <Button
                  className="hover:cursor-pointer bg-neutral-800 text-white px-10"
                  onClick={() => {
                    const requestText = ref.current?.value?.trim();

                    if (!requestText) {
                      toast.error("Please enter custom details.");
                      return;
                    }

                    const customItem = {
                      ...product,
                      isCustom: true,
                      custom: { description: requestText },
                    };

                    for (let i = 0; i < requestedProducts; i++) {
                      addToCart(customItem);
                    }

                    toast.success(`${product.name} (custom) added to cart!`, {
                      description: `${
                        itemCount + requestedProducts
                      } items totalling $${(
                        parseFloat(subtotal) +
                        parseFloat(product.price) * requestedProducts
                      ).toFixed(2)}`,
                      duration: 8000,
                      icon: <CheckIcon />,
                    });

                    // Reset
                    if (ref.current) ref.current.value = "";
                    setRequestedProducts(1);
                    setCustomRequest(false);
                  }}
                >
                  Add custom item to cart
                </Button>
                <Button
                  className="hover:cursor-pointer px-10"
                  variant="outline"
                  onClick={() => setCustomRequest(false)}
                >
                  Cancel
                </Button>
              </section>
            </div>
          )}
        </section>
      </section>
      {relatedProducts.length > 0 && (
        <section className="m-16 pt-12 border-t-2 border-neutral-300">
          <h2 className="font-semibold mb-8 mx-8 text-3xl koh-santepheap text-center xl:text-start ">
            You may also like
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 justify-center xl:place-items-start place-items-center gap-8 px-4">
            {relatedProducts.map((related, i) => (
              <div className="flex flex-col gap-12 min-w-sm h-full" key={i}>
                <div className="p-4 rounded-md flex flex-col max-w-4xl justify-between h-full">
                  <CldImage
                    src={related.image}
                    alt={related.name}
                    width={400}
                    height={600}
                    className="cursor-pointer rounded-md"
                    onClick={() => router.push(`/shop/${related._id}`)}
                  />
                  <section>
                    <p
                      className="mt-4 mb-2 font-bold koh-santepheap text-xl cursor-pointer"
                      onClick={() => router.push(`/shop/${related._id}`)}
                    >
                      {related.name}
                    </p>
                    <p className="italic text-neutral-500">
                      {related.details.substring(0, 35)} ...
                    </p>
                    <section className="flex justify-between py-4  min-w-sm max-w-xl">
                      <p className="self-center">${related.price}</p>
                      <AddToCart product={related} />
                    </section>
                  </section>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
