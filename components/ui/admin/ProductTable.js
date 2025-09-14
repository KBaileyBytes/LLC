"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchProducts();
  }, []);

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
      cell: ({ row }) => <div>{row.original.category}</div>,
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
        >
          Update Product Categories
        </Button>
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
