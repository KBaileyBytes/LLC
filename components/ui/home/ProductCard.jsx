"use client";

import { Card, CardContent } from "@/components/ui/card";

import { redirect } from "next/navigation";
import AddToCart from "../AddToCart";
import Link from "next/link";

import { CldImage } from "next-cloudinary";

export default function ProductCard({ product }) {
  return (
    <Card className="border-0 shadow-none cursor-pointer hover:scale-102 transition-transform flex flex-col h-full gap-8">
      <Link aschild="true" href={`/shop/${product._id}`}>
        <CardContent
          className={`flex justify-between max-w-[400px] flex-col items-center gap-8`}
        >
          <CldImage
            src={product.image}
            alt={product.name}
            width={400}
            height={600}
            className="cursor-pointer rounded-2xl"
          />
          <div className="w-full flex justify-center xl:justify-start">
            <div className="w-full">
              <span>
                <p className="koh-santepheap text-3xl py-4 font-semibold cursor-pointer">
                  {product.name}
                </p>
              </span>
              <section className="flex justify-between my-4 gap-8">
                <section className="text-neutral-500">
                  <p>{product.description}</p>

                  {product.details && (
                    <p className="italic line-clamp-2">{product.details}</p>
                  )}
                </section>
                <AddToCart product={product} />
              </section>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
