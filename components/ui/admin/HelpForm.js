"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";

export default function HelpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("/api/help", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      reset();
      toast.success(`Message Sent!`, {
        description: `Message successfully sent!`,
        duration: 10000,
        icon: <CheckIcon />,
      });
    } else {
      console.error("Failed to send email");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 mx-auto border-neutral-200 border-1 p-12 rounded-4xl shadow-lg min-w-2xs max-w-4xl"
    >
      <p className="koh-santepheap text-neutral-800 text-3xl font-bold pb-4">
        Contact Support
      </p>

      <section className="grid gap-6">
        <div className="grid gap-2">
          <Input
            {...register("subject")}
            placeholder="Subject"
            className=" border-neutral-300 focus-visible:outline-none focus-visible:ring-1"
          />
          {errors.subject && (
            <span className=" text-sm text-red-600 italic ">
              {errors.subject.message}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label>Your Message *</Label>
          <Textarea
            {...register("message", {
              required: "Required",
            })}
            placeholder="Describe your problem or question in detail"
            className="h-28 border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
          />
          {errors.message && (
            <span className=" text-sm text-red-600 italic ">
              {errors.message.message}
            </span>
          )}
        </div>
        {/* <ReCAPTCHA
            sitekey="6LdckiYrAAAAAD_FZOJEB_CvvigPxAG6Bhz0I4Cm"
            onChange={onChange}
          /> */}
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
