"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Delete } from "lucide-react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

export default function CartContainer({ children }) {
  const {
    cart,
    updateProductQuantity,
    removeFromCart,
    itemCount,
    subtotal,
    addToCart,
  } = useCart();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative cursor-pointer font-semibold bg-neutral-900 text-white rounded-lg py-3 px-6">
          {children}
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col bg-neutral-100 border-none p-6 min-w-sm sm:min-w-md lg:min-w-3xl"
      >
        <SheetHeader className="p-0 py-2">
          <SheetTitle className="py-4 text-xl koh-santepheap">Cart</SheetTitle>
          <SheetDescription className="text-sm text-neutral-500 italic">
            Make changes to your cart here. Click Checkout when you're ready to
            order.
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)] my-4">
          <ScrollArea className="h-full">
            {cart.map((item, i) => (
              <section
                key={i}
                className="grid text-center lg:text-start lg:grid-cols-3 py-4"
              >
                <CldImage
                  src={item.image}
                  width={300}
                  height={200}
                  className="rounded-2xl justify-center py-2 mx-auto"
                  alt={item.name}
                />

                <div className="grid gap-2 p-6 mx-auto lg:mr-auto max-w-xs lg:grid-rows-1 w-2xs">
                  <p className="font-semibold pb-2 koh-santepheap self-center">
                    {item.name}
                  </p>
                  <p className="text-sm italic text-neutral-500">{item.size}</p>
                  <p className="text-sm italic text-neutral-500 line-clamp-3">
                    {item.details}
                  </p>
                  {item.isCustom && item.custom?.description && (
                    <div className="pt-4 text-start">
                      <p className="text-sm italic text-neutral-800 font-bold">
                        Custom Request:
                      </p>
                      <p className="text-sm italic text-neutral-500 whitespace-pre-wrap">
                        {item.custom.description}
                      </p>

                      {item.custom.dimensions && (
                        <div className="mt-2">
                          <p className="text-sm italic text-neutral-800 font-bold">
                            Dimensions:
                          </p>
                          <ul className="text-sm italic text-neutral-500 list-disc pl-5">
                            {Object.entries(item.custom.dimensions).map(
                              ([key, value]) => (
                                <li key={key}>
                                  {key}: {value}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 mt-2 justify-center lg:justify-end">
                  {/* Quantity controls */}
                  <section className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateProductQuantity(item, -1);
                        } else {
                          removeFromCart(item.id);
                        }
                      }}
                      className="cursor-pointer pl-0"
                    >
                      -
                    </Button>

                    <p className="text-sm">{item.quantity}</p>

                    <Button
                      variant="ghost"
                      onClick={() => updateProductQuantity(item, 1)}
                      className="cursor-pointer"
                    >
                      +
                    </Button>
                  </section>

                  {/* Delete button */}
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-700 text-white cursor-pointer rounded-lg px-3 py-2 self-center"
                  >
                    <Delete className="w-5 h-5" />
                  </Button>
                </div>
              </section>
            ))}
          </ScrollArea>
        </div>
        <SheetFooter className="border-t-1 border-neutral-300">
          <div className="text-lg font-semibold">
            Subtotal: ${subtotal.toFixed(2)}
          </div>
          <SheetTrigger asChild>
            <Link
              href="/checkout"
              className={`py-2 text-center bg-neutral-800 text-white font-bold cursor-pointer rounded-lg koh-santepheap text-md ${
                itemCount === 0 &&
                "disabled cursor-default text-neutral-400 italic bg-neutral-600"
              }`}
            >
              Checkout
            </Link>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
