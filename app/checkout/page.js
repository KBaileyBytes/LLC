"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Delete } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { CldImage } from "next-cloudinary";

export default function CheckoutPage() {
  const { cart, removeFromCart, itemCount, subtotal, updateProductQuantity } =
    useCart();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  console.log(cart);

  if (!hasMounted) return null; // or a loader

  const onSubmit = async (data) => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, total: subtotal, cart }),
    });

    if (response.ok) {
      redirect("/checkout/success");
    } else {
      console.error("Failed to send email");
    }
  };

  return (
    <section className="p-16 h-full flex flex-col gap-8 justify-around 2xl:flex-row">
      <section className="w-full h-full">
        <p className="koh-santepheap text-neutral-800 text-4xl font-bold py-4 px-8">
          Shopping Cart
        </p>
        <section className="py-6 px-7 font-bold flex justify-between border-b-1 border-neutral-300">
          <p>Product Details</p>
          <section className="flex justify-between w-1/7">
            <p>Qty</p>
            <p>Total</p>
          </section>
        </section>
        {cart.map((item, i) => (
          <section
            key={i}
            className="grid text-center lg:text-start lg:grid-cols-3 p-4"
          >
            <CldImage
              src={item.image}
              width={400}
              height={600}
              className="rounded-2xl justify-center py-2 mx-auto"
              alt={item.name}
            />
            <div className="grid gap-2 p-6 mx-auto lg:mr-auto max-w-xs lg:grid-rows-3 w-2xs">
              <p className="font-semibold pb-2 koh-santepheap self-center">
                {item.name}
              </p>
              {item.size && (
                <p className="text-sm italic text-neutral-500">{item.size}</p>
              )}
              {item.details && (
                <p className="text-sm italic text-neutral-500">
                  {item.details}
                </p>
              )}
              {item.isCustom && item.custom?.description && (
                <>
                  <p className="text-sm italic text-neutral-800 font-bold text-start pt-4">
                    Custom Request:
                  </p>
                  <p className="text-sm italic text-neutral-500 text-start">
                    {item.custom.description}
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-4 mt-2 justify-center lg:justify-end">
              <section className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    updateProductQuantity(item, -1);
                    if (item.quantity <= 1) removeFromCart(item._id);
                  }}
                  className="cursor-pointer pl-0"
                >
                  -
                </Button>
                <p className="text-sm border border-neutral-300 rounded-md p-2 shadow-inner">
                  {item.quantity}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => updateProductQuantity(item, 1)}
                  className="cursor-pointer"
                >
                  +
                </Button>
              </section>

              <p className="py-2 self-center">
                ${(item.quantity * parseFloat(item.price)).toFixed(2)}
              </p>
            </div>
          </section>
        ))}

        <section className="w-full border-t-1 border-neutral-300 pt-6">
          <Link href="/shop" className="border-t-1 border-neutral-300">
            <span className="flex gap-2 italic text-lg text-blue-400">
              <ArrowLeftIcon />
              Continue Shopping
            </span>
          </Link>
        </section>
      </section>
      <section className="w-full h-full">
        <p className="koh-santepheap text-neutral-800 text-4xl font-bold py-4 mb-8">
          Order Form
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <section className="grid md:grid-cols-2 gap-8">
            <div className="grid gap-2">
              <Label>First Name</Label>
              <Input
                {...register("first", {
                  required: "Required",
                })}
                placeholder="Jane"
                className=" border-neutral-300 focus-visible:outline-none focus-visible:ring-1"
              />
              {errors.first && (
                <span className=" text-sm text-red-600 italic ">
                  {errors.first.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Last Name</Label>
              <Input
                {...register("last")}
                placeholder="Smith"
                className=" border-neutral-300 focus-visible:outline-none focus-visible:ring-1"
              />
            </div>
          </section>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="email@janesfakedomain.net"
              className=" border-neutral-300 focus-visible:outline-none focus-visible:ring-1"
            />
            {errors.email && (
              <span className=" text-sm text-red-600 italic ">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Your Message</Label>
            <Textarea
              {...register("message")}
              placeholder="Enter your question or message"
              className="h-28 border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            />
          </div>

          <section className="py-8">
            <p className="italic text-sm text-neutral-500">
              <span className="font-bold">Please Note:</span> Your order details
              will be sent to the artist, who will contact you with payment
              instructions and next steps.
            </p>
            <p className="italic text-sm text-neutral-500">
              Expect a response within 2 - 3 days.
            </p>
            <section className="py-4">
              <p className="italic text-sm text-neutral-400">
                Canada-wide shipping available
              </p>
              <p className="italic text-sm text-neutral-400">
                Free delivery within Winnipeg, MB
              </p>
            </section>
          </section>
          <section className="py-4 my-4 flex justify-between border-t-1 border-neutral-300">
            <p className="text-lg">Total Cost</p>
            <p className="text-lg font-bold">${subtotal}</p>
          </section>
          <Button
            className="py-5 bg-neutral-800 text-white cursor-pointer rounded-lg w-full text-lg"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </section>
    </section>
  );
}
