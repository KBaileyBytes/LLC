"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("/api/admin/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      reset();
      toast.success(`Signed In`, {
        description: `Successfully signed in`,
        duration: 6000,
        icon: <CheckIcon />,
      });
      router.push("/admin");
    } else {
      toast.error("Sign In Failed", {
        description: "Invalid email or password",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 mx-auto border-neutral-200 border-1 p-12 rounded-4xl shadow-lg min-w-2xs max-w-4xl"
    >
      <p className="koh-santepheap text-neutral-800 text-3xl font-bold pb-4">
        Sign In
      </p>

      <section className="grid gap-6">
        <div className="grid gap-2">
          <Label>Email *</Label>

          <Input
            type="email"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className=" border-neutral-300 focus-visible:outline-none focus-visible:ring-1"
          />
          {errors.email && (
            <span className=" text-sm text-red-600 italic ">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label>Password *</Label>
          <Input
            {...register("password", {
              required: "Required",
            })}
            placeholder="Password"
            type="password"
            className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
          />
          {errors.password && (
            <span className=" text-sm text-red-600 italic ">
              {errors.password.message}
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
  );
}
