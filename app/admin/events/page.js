"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";
import { redirect } from "next/navigation";

const EVENT_CATEGORIES = ["Craft Show", "News", "New Release"];

export default function AddEventPage() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm();
  const [resource, setResource] = useState(null);

  const onSubmit = async (data) => {
    const response = await fetch(`/api/admin/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      reset();
      toast.success(`Event Created`, {
        description: `Successfully created event`,
        duration: 6000,
        icon: <CheckIcon />,
      });
    } else {
      console.error("Failed to create event");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 mx-auto border-neutral-200 border-1 p-12 rounded-4xl shadow-lg min-w-2xs max-w-4xl"
    >
      <p className="koh-santepheap text-neutral-800 text-3xl font-bold pb-4">
        Create Event
      </p>

      <section className="grid gap-8">
        <section className="grid grid-cols-2 gap-8">
          <div className="grid gap-3">
            <Label>Title *</Label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              className=" border-neutral-300 focus-visible:outline-none focus-visible:ring-1"
            />
            {errors.title && (
              <span className=" text-sm text-red-600 italic ">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Category *</Label>
            <select
              {...register("category", { required: "Category is required" })}
              className="border rounded-md p-2 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
              defaultValue="New Release"
            >
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className=" text-sm text-red-600 italic ">
                {errors.category.message}
              </span>
            )}
          </div>
        </section>
        <section className="grid grid-cols-3 gap-8">
          <div className="grid gap-3">
            <Label>Date</Label>
            <Input
              {...register("date", { required: "Date is required" })}
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            />
            {errors.date && (
              <span className=" text-sm text-red-600 italic ">
                {errors.date.message}
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Time</Label>
            <Input
              {...register("time")}
              placeholder="10 AM - 4 PM"
              className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            />
            {errors.time && (
              <span className=" text-sm text-red-600 italic ">
                {errors.time.message}
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Place</Label>
            <Input
              {...register("place")}
              placeholder="Address"
              className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            />
            {errors.place && (
              <span className=" text-sm text-red-600 italic ">
                {errors.place.message}
              </span>
            )}
          </div>
        </section>
        <div className="grid gap-3">
          <Label>Product Image *</Label>
          <CldUploadWidget
            uploadPreset="LLC_unsigned"
            onSuccess={(result) => {
              const imageUrl = result?.info?.secure_url;
              setResource(imageUrl); // For preview
              setValue("image", imageUrl, { shouldValidate: true }); // Register in form and validate
            }}
          >
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                setResource(undefined);
                open();
              }
              return (
                <Button
                  className="bg-neutral-200 hover:cursor-pointer"
                  onClick={handleOnClick}
                >
                  Upload an Image
                </Button>
              );
            }}
          </CldUploadWidget>
          <input type="hidden" {...register("image")} />
          {resource && (
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-sm text-green-600">Image uploaded!</p>
              <img
                src={resource}
                alt="Preview"
                className="w-48 rounded-md border border-neutral-300"
              />
            </div>
          )}
          {errors.image && (
            <span className="text-sm text-red-600 italic">
              {errors.image.message}
            </span>
          )}
        </div>
        <div className="grid gap-3">
          <Label>Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Description"
            className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
          />
          {errors.description && (
            <span className=" text-sm text-red-600 italic ">
              {errors.description.message}
            </span>
          )}
        </div>
        <section className="flex gap-3 justify-between">
          <section className="flex gap-4 items-center">
            <Button
              className=" py-5 bg-green-700 text-white hover:cursor-pointer rounded-lg "
              type="submit"
            >
              Create Event
            </Button>
            <Button
              className=" py-5 bg-neutral-400 hover:cursor-pointer rounded-lg "
              onClick={(e) => {
                e.preventDefault();
                redirect("/admin/");
              }}
            >
              Back
            </Button>
          </section>
        </section>
      </section>
    </form>
  );
}
