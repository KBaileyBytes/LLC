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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CldImage } from "next-cloudinary";

export function ProductTable() {
  const router = useRouter();
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
        <Button
          className="hover:cursor-pointer hover:shadow-md border-1 border-neutral-300"
          onClick={() => {
            router.push(`/admin/products/${row.original._id}`);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-2xl border-1 border-neutral-200 shadow-md p-12">
      <Button
        onClick={() => router.push("admin/products")}
        className="bg-teal-300 border-1 border-neutral-500 hover:cursor-pointer mx-4 my-2 px-6 py-3"
        size="lg"
      >
        Add Product
      </Button>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
