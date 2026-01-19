"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CldImage } from "next-cloudinary";
import { toast } from "sonner";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

export function ProductTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { control, register, handleSubmit, getValues, reset } = useForm({
    defaultValues: { category: [""] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "category",
  });
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/products/categories");
      const data = await res.json();
      setCategories(data.categories);
      reset({
        category: data.categories.map((cat) => ({
          _id: cat._id,
          name: cat.name,
        })),
      });
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!products.length || !categories.length) return;

    const updatedProducts = products.map((product) => {
      const matchedCategory = categories.find(
        (category) => category._id === product.category
      );

      return {
        ...product,
        category: matchedCategory ? matchedCategory.name : product.category,
      };
    });

    setProducts(updatedProducts);
  }, [products.length, categories]);

  async function handleCreateCategory(name) {
    try {
      const res = await fetch("/api/admin/products/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: name }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create category");
      }

      const data = await res.json();
      console.log("Created category:", data.category);

      // refetch categories here
      await fetchCategories();

      toast.success("Category created successfully");
    } catch (err) {
      console.error("Error creating category:", err);
      toast.error("Failed to create category");
    }
  }

  async function handleUpdateCategory(id, name) {
    try {
      const res = await fetch(`/api/admin/products/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update category");
      }

      const data = await res.json();
      console.log("Updated category:", data.category);

      toast.success("Category updated successfully");
    } catch (err) {
      console.error("Error updating category:", err);
      toast.error("Failed to update category");
    }
  }

  async function handleDeleteCategory(id) {
    try {
      const res = await fetch(`/api/admin/products/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete category");
      }

      const data = await res.json();
      console.log("Deleted category:", data.category);

      toast.success("Category deleted successfully");

      // refetch categories here
      await fetchCategories();
    } catch (err) {
      toast.error(err.message || "Failed to delete category");
    }
  }

  const columns = [
    {
      accessorKey: "image",
      header: () => <span>Image</span>,
      cell: ({ row }) => (
        <CldImage
          src={row.original.image}
          width={100}
          height={125}
          alt={row.original.name}
          className="h-16 w-16 object-cover rounded"
        />
      ),
    },
    {
      accessorKey: "name",
      header: () => <span>Name</span>,
      cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: "category",
      header: () => <span>Category</span>,
      cell: ({ row }) => <div>{row.original?.category}</div>,
    },
    {
      accessorKey: "price",
      header: () => <span>Price</span>,
      cell: ({ row }) => <div>${row.original.price.toFixed(2)}</div>,
    },
    {
      accessorKey: "dimensions",
      header: () => <span>Dimensions</span>,
      cell: ({ row }) => {
        const d = row.original.dimensions;
        return d ? `${d.width} x ${d.height} ${d.metric}` : "—";
      },
    },
    {
      accessorKey: "customizable",
      header: () => <span>Customizable</span>,
      cell: ({ row }) => (
        <Badge variant={row.original.customizable ? "default" : "secondary"}>
          {row.original.customizable ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      accessorKey: "placement",
      header: () => <span>Placement</span>,
      cell: ({ row }) => <div>{row.original.placement.join(", ")}</div>,
    },
    {
      accessorKey: "modify",
      header: () => <p className="text-center">Modify</p>,
      cell: ({ row }) => (
        <Link aschild="true" href={`/admin/products/${row.original._id}`}>
          <Button className="hover:cursor-pointer hover:shadow-md border-1 border-neutral-300">
            Edit
          </Button>
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-2xl xl:border-1 border-neutral-200 xl:shadow-md xl:p-12">
      <section className="flex flex-row gap-4">
        <Link aschild="true" href={`admin/products`}>
          <Button
            className=" bg-teal-300 border-1 border-neutral-500 hover:cursor-pointer font-bold"
            size="lg"
          >
            Add Product
          </Button>
        </Link>
        <Button
          className=" bg-teal-300 border-1 border-neutral-500 hover:cursor-pointer font-bold"
          size="lg"
          onClick={() => setOpen(true)}
        >
          Product Categories
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="bg-white text-neutral-900 border border-neutral-300 shadow-xl rounded-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-semibold">
                Update Product Categories
              </AlertDialogTitle>
              <AlertDialogDescription>
                Only categories without associated products can be deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="grid gap-4 py-4">
              {fields.map((field, index) => (
                <div
                  key={field?._id && field.id}
                  className="flex items-center gap-4"
                >
                  <input
                    {...register(`category.${index}.name`, {
                      required: "Required",
                    })}
                    className="w-full border rounded p-2"
                  />

                  {index < categories.length ? (
                    <>
                      <Button
                        type="button"
                        className="text-green-600 bg-neutral-100"
                        onClick={() =>
                          handleUpdateCategory(
                            field._id,
                            getValues(`category.${index}.name`)
                          )
                        }
                      >
                        Update
                      </Button>
                      <Button
                        type="button"
                        className="text-red-600 bg-neutral-100"
                        onClick={() => handleDeleteCategory(field._id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        className="text-blue-600 bg-neutral-100"
                        onClick={() =>
                          handleCreateCategory(
                            getValues(`category.${index}.name`)
                          )
                        }
                      >
                        Create
                      </Button>
                      <Button
                        type="button"
                        className="text-red-600 bg-neutral-100"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </div>
              ))}

              <Button
                type="button"
                onClick={() => append({ _id: Math.random(), name: "" })}
                className="bg-neutral-200 hover:bg-neutral-300"
              >
                + Add Category
              </Button>
            </div>

            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  Done
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      <section className="hidden xl:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-lg font-bold py-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-neutral-50 border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`py-6 text-neutral-600 ${
                        cell.column.id === "name" ? "font-bold" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
      <section className="xl:hidden flex-row">
        {products.map((product, i) => (
          <div key={i} className="py-6">
            <Card className="my-8 px-2 shadow-none border-0 border-neutral-100 overflow-hidden pt-0">
              <CldImage
                src={product.image}
                width={400}
                height={600}
                alt={product.name}
                className="w-full object-fit rounded-lg max-w-md self-center"
              />
              <CardHeader className="px-0">
                <CardTitle className="text-lg sm:text-xl">
                  {product.name}
                </CardTitle>
                <CardDescription>
                  {" "}
                  <Badge className="bg-teal-200 font-bold">
                    {product.category}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-0">
                <p className="line-clamp-4">{product.details}</p>
                <p className="text-neutral-700 text-sm italic">
                  {product.dimensions
                    ? `${product.dimensions.width} x ${product.dimensions.height} ${product.dimensions.metric}`
                    : "—"}
                </p>
                <p className="font-semibold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="self-center">
                <Link href={`/admin/products/${product._id}`} aschild="true">
                  <Button className="hover:cursor-pointer hover:shadow-md border-1 border-neutral-300">
                    Edit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <div
              className={`border-neutral-200 border-${
                i === products.length - 1 ? "0" : "1"
              }`}
            ></div>
          </div>
        ))}
      </section>
    </div>
  );
}
