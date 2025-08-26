"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";

const PRODUCT_CATEGORIES = [
  "New & Unique",
  "Seasonal",
  "Coasters",
  "Resin Bowls",
  "Thinkers",
  "Turtle Family",
];
const PLACEMENT_OPTIONS = ["New", "Unique", "BestSeller", "Carousel"];

export default function EditProductPage() {
  const params = useParams();
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      customizable: {
        options: [""],
      },
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "customizable.options",
    defaultValues: {
      customizable: {
        options: [""],
      },
    },
  });
  const [resource, setResource] = useState();
  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(true);
  const customizableEnabled = watch("customizable.enabled");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${params.id}`);
        if (!res.ok) throw new Error("Product not found");

        const product = await res.json();

        reset(product);
        console.log(product);

        if (product.customizable?.options) {
          replace(product.customizable.options);
        } else {
          replace([{ value: "" }]);
        }

        setProduct(product);
        setResource(product.image);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    const flattened = {
      ...data,
      customizable: {
        ...data.customizable,
        options: data.customizable?.options?.map((opt) =>
          typeof opt === "string" ? opt : opt?.value || ""
        ),
      },
    };

    const response = await fetch(`/api/admin/products/${product._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flattened),
    });

    if (response.ok) {
      toast.success(`Product Edited`, {
        description: `Successfully Edited product`,
        duration: 6000,
        icon: <CheckIcon />,
      });
    } else {
      console.error("Failed to Edit product");
    }
  };

  const handleDeleteProduct = async () => {
    const response = await fetch(`/api/admin/products/${params.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success(`Product Deleted`, {
        description: `Successfully deleted product`,
        duration: 6000,
        icon: <CheckIcon />,
      });
      redirect("/admin/");
    } else {
      console.error("Failed to delete product");
    }
  };

  if (loading)
    return (
      <div className="animate-pulse grid gap-6 mx-auto border border-neutral-200 p-12 rounded-4xl shadow-lg min-w-2xs max-w-4xl">
        <div className="h-10 bg-neutral-200 rounded w-1/3" />
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="h-5 bg-neutral-200 rounded w-1/2" />
            <div className="h-10 bg-neutral-200 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-5 bg-neutral-200 rounded w-1/2" />
            <div className="h-10 bg-neutral-200 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="h-5 bg-neutral-200 rounded w-1/2" />
            <div className="h-10 bg-neutral-200 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-5 bg-neutral-200 rounded w-1/2" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 bg-neutral-200 rounded" />
              <div className="h-10 bg-neutral-200 rounded" />
              <div className="h-10 bg-neutral-200 rounded" />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-5 bg-neutral-200 rounded w-1/3" />
          <div className="h-12 bg-neutral-200 rounded w-48" />
        </div>
        <div className="space-y-3">
          <div className="h-5 bg-neutral-200 rounded w-1/3" />
          <div className="h-48 bg-neutral-200 rounded w-48" />
        </div>
        <div className="space-y-3">
          <div className="h-5 bg-neutral-200 rounded w-1/3" />
          <div className="h-24 bg-neutral-200 rounded" />
        </div>
        <div className="flex gap-4 justify-between">
          <div className="h-12 w-40 bg-neutral-200 rounded" />
          <div className="h-12 w-40 bg-neutral-200 rounded" />
        </div>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 mx-auto border-neutral-200 border-1 p-12 rounded-4xl shadow-lg min-w-2xs max-w-4xl"
    >
      <p className="koh-santepheap text-neutral-800 text-3xl font-bold pb-4">
        Edit Product
      </p>

      <section className="grid gap-8">
        <section className="grid grid-cols-2 gap-8">
          <div className="grid gap-3">
            <Label>Product Name *</Label>
            <Input
              {...register("name")}
              className=" border-neutral-300 focus-visible:outline-none focus-visible:ring-1"
            />
            {errors.name && (
              <span className=" text-sm text-red-600 italic ">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label>Category *</Label>
            <select
              {...register("category")}
              className="border rounded-md p-2 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
              defaultValue="New & Unique"
            >
              {PRODUCT_CATEGORIES.map((cat) => (
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
        <section className="grid grid-cols-2 gap-8">
          <div className="grid gap-3">
            <Label>Price *</Label>
            <Input
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              type="number"
              step="0.01"
              min="0"
              className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
            />
            {errors.price && (
              <span className=" text-sm text-red-600 italic ">
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
                <option value="mm">mm</option>
                <option value="cm">cm</option>
                <option value="inch">inch</option>
              </select>
              <Input
                {...register("dimensions.width", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0.01"
                placeholder={0.01}
              />
              <Input
                {...register("dimensions.height", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0.01"
                placeholder={0.01}
              />
            </div>
          </div>
        </section>
        <div className="flex items-center gap-3">
          <Label htmlFor="customizable.enabled">Customizable</Label>
          <input
            type="checkbox"
            {...register("customizable.enabled")}
            id="customizable.enabled"
          />
        </div>
        {customizableEnabled && (
          <div className="grid gap-3">
            <Label>Custom Options</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4">
                <Input
                  {...register(`customizable.options.${index}`, {
                    required: "Option cannot be empty",
                  })}
                  placeholder="e.g. Glitter, Swirl, Additional Colors"
                  className="w-full"
                  defaultValue={typeof field === "string" ? field : ""} // because field is just a string
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
              onClick={() => append("")}
              className="bg-neutral-200 hover:cursor-pointer"
            >
              Add Custom Option
            </Button>
          </div>
        )}
        <div className="grid gap-3">
          <Label>Product Image *</Label>
          <CldUploadWidget
            uploadPreset="LLC_unsigned"
            onSuccess={(result, { widget }) => {
              const imageUrl = result?.info?.secure_url;
              setResource(imageUrl); // for preview
              setValue("image", imageUrl); // register in form
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
              <img
                src={resource}
                alt="Preview"
                className="w-48 rounded-md border border-neutral-300"
              />
            </div>
          )}
          {errors.image && (
            <span className=" text-sm text-red-600 italic ">
              {errors.image.message}
            </span>
          )}
        </div>
        <div className="grid gap-3">
          <Label>Product Summary *</Label>
          <Textarea
            {...register("details")}
            placeholder="Description of the product"
            className="border-1 border-neutral-300 focus-visible:ring-neutral-700 focus-visible:ring-1"
          />
          {errors.details && (
            <span className=" text-sm text-red-600 italic ">
              {errors.details.message}
            </span>
          )}
        </div>
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
        <section className="flex gap-3 justify-between">
          <section className="flex gap-4 items-center">
            <Button
              className=" py-5 bg-green-700 text-white hover:cursor-pointer rounded-lg "
              type="submit"
            >
              Edit Product
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
            Delete Product
          </Button>
        </section>
      </section>
    </form>
  );
}
