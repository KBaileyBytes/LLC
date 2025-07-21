"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";

export default function ContactMePage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      reset();
      toast.success(`Message Sent!`, {
        description: `Message successfully sent to LLC!`,
        duration: 10000,
        icon: <CheckIcon />,
      });
    } else {
      console.error("Failed to send email");
    }
  };

  return (
    <section className="p-24 m-8 grid justify-center my-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-2 border-neutral-200 border-1 p-12 rounded-4xl max-w-7xl"
      >
        <p className="koh-santepheap text-neutral-800 text-3xl font-bold pb-4">
          Contact Me
        </p>

        <section className="grid gap-4">
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
              {...register("message", {
                required: "Required",
              })}
              placeholder="Enter your question or message"
              className="h-28 border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            />
            {errors.message && (
              <span className=" text-sm text-red-600 italic ">
                {errors.message.message}
              </span>
            )}
          </div>
          <Button
            className="py-5 bg-neutral-800 text-white cursor-pointer rounded-lg "
            type="submit"
          >
            Submit
          </Button>
        </section>
      </form>
    </section>
  );
}
