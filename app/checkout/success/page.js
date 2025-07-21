"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function OrderSuccessPage() {
  const { cart, removeFromCart, subtotal } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [orderSubtotal, setOrderSubtotal] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (cart.length < 1) {
      redirect("/");
    } else {
      setCartItems(cart); // Set all items at once
      setOrderSubtotal(subtotal);
      // Clear cart after setting cart items
      cart.forEach((item) => {
        removeFromCart(item.id);
      });
    }
  }, []);

  const itemsToShow = expanded ? cartItems : cartItems.slice(0, 3);
  const hasMore = cartItems.length > 3;

  return (
    <section className="p-16">
      <div className="flex items-center gap-4 bg-green-500 px-6 py-4 rounded-2xl shadow-md mb-8">
        <CheckCircle size={64} className="text-white m-1" />
        <p className="koh-santepheap text-white font-bold text-4xl self-center">
          Order Submitted
        </p>
      </div>

      {/* Cart Items in Collapsible */}
      <ScrollArea className="h-120">
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <div className="grid gap-4">
            {itemsToShow.map((item, i) => (
              <Card
                key={i}
                className="flex gap-4 p-4 items-center md:items-start flex-row border-neutral-300"
              >
                <CldImage
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-2xl"
                />

                <CardContent className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {hasMore && (
            <div className="mt-4 text-center">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:underline"
                >
                  {expanded ? (
                    <>
                      Show Less <ChevronUp className="ml-2" size={16} />
                    </>
                  ) : (
                    <>
                      Show All ({cartItems.length}){" "}
                      <ChevronDown className="ml-2" size={16} />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          )}
        </Collapsible>
      </ScrollArea>

      {/* Order Total */}
      <div className="flex justify-between mt-8">
        <Link href="/shop">
          <span className="flex gap-2 italic text-lg text-blue-400">
            <ArrowLeftIcon />
            Continue Shopping
          </span>
        </Link>{" "}
        <p className="text-xl font-bold">
          Subtotal: ${orderSubtotal.toFixed(2)}
        </p>
      </div>
    </section>
  );
}
