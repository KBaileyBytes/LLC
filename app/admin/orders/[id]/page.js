"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function OrderPage() {
  const { id } = useParams(); // get the slug from the URL
  const router = useRouter();

  const [subtotal, setSubtotal] = useState(0);
  const [order, setOrder] = useState({});

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${id}`);
        if (!res.ok) throw new Error("Order not found");
        const order = await res.json();

        reset({
          first: order.customer.firstName,
          last: order.customer?.lastName,
          email: order.customer.email,
          message: order.message,
          status: order.status,
          _id: order._id,
        });

        setSubtotal(order.subtotal);
        setOrder(order);
      } catch (err) {
        console.error("Failed to load order:", err);
        router.push("/admin");
      }
    };

    fetchOrder();
  }, [id, reset, router]);

  const onSubmit = async (data) => {
    const response = await fetch(`/api/admin/orders/${data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      router.push("/admin/");
    } else {
      console.error("Failed to update order");
    }
  };

  return (
    <section className="p-16 h-full flex flex-col gap-8 justify-around 2xl:flex-row">
      <section className="w-full h-full">
        <p className="koh-santepheap text-neutral-800 text-4xl font-bold py-4 px-8">
          Order {order?._id?.slice(0, 7)}
        </p>
        <section className="py-6 px-7 font-bold flex justify-between border-b-1 border-neutral-300">
          <p>Product Details</p>
          <section className="flex justify-between w-1/7">
            <p>Qty</p>
            <p>Total</p>
          </section>
        </section>
        {order?.products?.map((item, i) => (
          <section key={i} className="grid lg:grid-cols-3 p-4">
            <CldImage
              src={item.image}
              width={200}
              height={200}
              className="rounded-2xl py-2 "
              alt={item.name}
            />
            <div className="grid gap-2 p-6 mx-auto lg:mr-auto max-w-xs lg:grid-rows-3 w-2xs">
              <p className="font-semibold pb-2 koh-santepheap">{item.name}</p>
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
      </section>
      <section className="w-full h-full">
        <p className="koh-santepheap text-neutral-800 text-4xl font-bold py-4 mb-8">
          Customer Form
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
            <Label>Order Message</Label>
            <Textarea
              {...register("message")}
              className="h-28 border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            />
          </div>
          <div className="grid gap-2">
            <Label>Order Status</Label>
            <select
              {...register("status")}
              className="border border-neutral-300 p-2 rounded-md focus-visible:outline-none focus-visible:ring-1"
              defaultValue={order.status || "Pending"}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <section className="py-4 my-4 flex justify-between border-t-1 border-neutral-300">
            <p className="text-lg">Total Cost</p>
            <p className="text-lg font-bold">${subtotal}</p>
          </section>
          <section className="flex gap-3 justify-between">
            <section className="flex gap-4 items-center">
              <Button
                className=" py-5 bg-green-700 text-white hover:cursor-pointer rounded-lg "
                type="submit"
              >
                Edit Order
              </Button>
              <Link aschild="true" href={`/admin`}>
                <Button className=" py-5 bg-neutral-400 hover:cursor-pointer rounded-lg ">
                  Back
                </Button>
              </Link>
            </section>
            <Button
              className="py-5 text-neutral-700 font-bold bg-red-500 hover:cursor-pointer  hover:shadow-md border border-red-700 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteProduct();
              }}
            >
              Delete Order
            </Button>
          </section>
        </form>
      </section>
    </section>
  );
}
