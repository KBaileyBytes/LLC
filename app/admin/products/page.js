"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";

const PLACEMENT_OPTIONS = ["New", "Unique", "BestSeller", "Carousel"];
const DIMENSION_UNITS = ["mm", "cm", "inch"];

export default function AddProductPage() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      category: "New & Unique",
      price: "",
      dimensions: {
        metric: "inch",
        width: "",
        height: "",
      },
      image: "",
      details: "",
      customizable: {
        enabled: false,
        options: [],
      },
      placement: ["New"],
    },
  });

  // UseFieldArray for customizable options
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customizable.options",
  });

  const [resource, setResource] = useState(null);
  const customizableEnabled = watch("customizable.enabled");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products/categories");
        const data = await res.json();
        setCategories(data.categories); // e.g. ["New & Unique", "Seasonal", ...]
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    const response = await fetch("/api/admin/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      reset({
        name: "",
        category: "New & Unique",
        price: "",
        dimensions: {
          metric: "inch",
          width: "",
          height: "",
        },
        image: "",
        details: "",
        customizable: {
          enabled: false,
          options: [],
        },
        placement: ["New"],
      });
      setResource(null);
      toast.success("Product Created", {
        description: "Successfully created product",
        duration: 6000,
        icon: <CheckIcon />,
      });
    } else {
      console.error("Failed to create product");
      toast.error("Failed to create product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 mx-auto border-neutral-200 border-1 p-12 rounded-4xl shadow-lg min-w-2xs max-w-4xl"
    >
      <p className="koh-santepheap text-neutral-800 text-3xl font-bold pb-4">
        Create Product
      </p>

      <section className="grid gap-8">
        {/* Name and Category */}
        <section className="grid grid-cols-2 gap-8">
          <div className="grid gap-3">
            <Label>Product Name *</Label>
            <Input
              {...register("name", { required: "Name is required" })}
              className="border-neutral-300 focus-visible:outline-none focus-visible:ring-1"
            />
            {errors.name && (
              <span className="text-sm text-red-600 italic">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Category *</Label>
            <select
              {...register("category", { required: "Category is required" })}
              className="border rounded-md p-2 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-sm text-red-600 italic">
                {errors.category.message}
              </span>
            )}
          </div>
        </section>

        {/* Price and Dimensions */}
        <section className="grid grid-cols-2 gap-8">
          <div className="grid gap-3">
            <Label>Price *</Label>
            <Input
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price must be positive" },
              })}
              type="number"
              step="0.01"
              min="0"
              className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            />
            {errors.price && (
              <span className="text-sm text-red-600 italic">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Dimensions</Label>
            <div className="grid grid-cols-3 gap-2">
              <select
                {...register("dimensions.metric")}
                className="border rounded-md p-2 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
              >
                {DIMENSION_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <Input
                {...register("dimensions.width", {
                  valueAsNumber: true,
                  min: { value: 0.01, message: "Must be > 0" },
                })}
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Width"
              />
              <Input
                {...register("dimensions.height", {
                  valueAsNumber: true,
                  min: { value: 0.01, message: "Must be > 0" },
                })}
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Height"
              />
            </div>
            {(errors.dimensions?.width || errors.dimensions?.height) && (
              <span className="text-sm text-red-600 italic">
                {errors.dimensions?.width?.message ||
                  errors.dimensions?.height?.message}
              </span>
            )}
          </div>
        </section>

        {/* Customizable Checkbox */}
        <div className="flex items-center gap-3">
          <Label htmlFor="customizable">Customizable</Label>
          <input
            type="checkbox"
            {...register("customizable.enabled")}
            id="customizable"
          />
        </div>

        {customizableEnabled && (
          <div className="grid gap-3">
            <Label>Custom Options</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Input
                  {...register(`customizable.options.${index}.value`, {
                    required: "Option cannot be empty",
                  })}
                  placeholder="e.g. Glitter, Swirl, Additional Colors"
                  className="w-full"
                  defaultValue={field.value}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ value: "" })}
              className="bg-neutral-200 hover:cursor-pointer"
            >
              Add Custom Option
            </Button>
          </div>
        )}

        {/* Product Image */}
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
          <input
            type="hidden"
            {...register("image", { required: "Image is required" })}
          />
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

        {/* Product Summary */}
        <div className="grid gap-3">
          <Label>Product Summary *</Label>
          <Textarea
            {...register("details", { required: "Summary is required" })}
            placeholder="Description of the product"
            className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
          />
          {errors.details && (
            <span className="text-sm text-red-600 italic">
              {errors.details.message}
            </span>
          )}
        </div>

        {/* Placement Options */}
        <div className="grid gap-3">
          <Label>Placement Options</Label>
          <div className="grid grid-cols-2 gap-2">
            {PLACEMENT_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register("placement")}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <section className="flex gap-3 justify-between">
          <section className="flex gap-4 items-center">
            <Button
              className="py-5 bg-green-700 text-white hover:cursor-pointer rounded-lg"
              type="submit"
            >
              Create Product
            </Button>
            <Link aschild="true" href={`/admin`}>
              <Button className="py-5 bg-neutral-400 hover:cursor-pointer rounded-lg">
                Back
              </Button>
            </Link>
          </section>
        </section>
      </section>
    </form>
  );
}
