"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { useParams } from "next/navigation";

const EVENT_CATEGORIES = ["Craft Show", "News", "New Release"];

export default function EventPage() {
  const params = useParams();
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/admin/events/${params.id}`);
        if (!res.ok) throw new Error("Event not found");

        const event = await res.json();

        // Convert event.date to YYYY-MM-DD format
        if (event.date) {
          const dateObj = new Date(event.date);
          event.date = dateObj.toISOString().split("T")[0]; // "YYYY-MM-DD"
        }

        if (event.image) {
          setResource(event.image);
        }

        reset(event);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEvent();
    }
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    const response = await fetch(`/api/admin/events/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      toast.success(`Event Saved`, {
        description: `Successfully edited event`,
        duration: 6000,
        icon: <CheckIcon />,
      });
      redirect("/admin/");
    } else {
      console.error("Failed to edit event");
    }
  };

  const handleDeleteEvent = async () => {
    const response = await fetch(`/api/admin/events/${params.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success(`Event Deleted`, {
        description: `Successfully deleted event`,
        duration: 6000,
        icon: <CheckIcon />,
      });
      redirect("/admin/");
    } else {
      console.error("Failed to delete event");
    }
  };

  if (loading)
    return (
      <div className="grid gap-4 mx-auto border-neutral-200 border p-12 rounded-4xl shadow-lg min-w-2xs max-w-4xl">
        <Skeleton className="h-8 w-40 mb-4 bg-neutral-200" />

        <section className="grid gap-8">
          {/* First Row - Title + Category */}
          <div className="grid grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="grid gap-3">
                <Skeleton className="h-4 w-20 bg-neutral-200" />
                <Skeleton className="h-10 w-full bg-neutral-100 rounded-md" />
              </div>
            ))}
          </div>

          {/* Second Row - Date, Time, Place */}
          <div className="grid grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid gap-3">
                <Skeleton className="h-4 w-20 bg-neutral-200" />
                <Skeleton className="h-10 w-full bg-neutral-100 rounded-md" />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="grid gap-3">
            <Skeleton className="h-4 w-24 bg-neutral-200" />
            <Skeleton className="h-24 w-full bg-neutral-100 rounded-md" />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32 rounded-lg bg-neutral-300" />
              <Skeleton className="h-12 w-24 rounded-lg bg-neutral-300" />
            </div>
            <Skeleton className="h-12 w-32 rounded-lg bg-red-300" />
          </div>
        </section>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 mx-auto border-neutral-200 border-1 p-12 rounded-4xl shadow-lg min-w-2xs max-w-4xl"
    >
      <p className="koh-santepheap text-neutral-800 text-3xl font-bold pb-4">
        Edit Event
      </p>

      <section className="grid gap-8">
        <section className="grid grid-cols-2 gap-8">
          <div className="grid gap-3">
            <Label>Title *</Label>
            <Input
              {...register("title")}
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
              {...register("category")}
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
              {...register("date")}
              type="date"
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
          <Label>Product Image</Label>
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
              Edit Event
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
          <Button
            className="py-5 text-neutral-700 font-bold bg-red-500 hover:cursor-pointer  hover:shadow-md border border-red-700 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteEvent();
            }}
          >
            Delete Event
          </Button>
        </section>
      </section>
    </form>
  );
}
