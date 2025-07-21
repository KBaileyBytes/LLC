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
import { Badge } from "../badge";
import { useState, useEffect } from "react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { Skeleton } from "../skeleton";

const getBadgeColor = (category) => {
  switch (category?.trim().toLowerCase()) {
    case "pending":
      return "yellow";
    case "processing":
      return "orange";
    case "delivered":
      return "green";
    default:
      return "gray";
  }
};

export function OrderTable() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  const columns = [
    {
      accessorKey: "_id",
      header: () => <span>Order ID</span>,
      cell: ({ row }) => (
        <div className="font-mono">{row.original?._id?.slice(0, 7)}</div>
      ),
    },
    {
      accessorKey: "customer",
      header: () => <span>Customer</span>,
      cell: ({ row }) => {
        const { firstName, lastName, email } = row.original.customer || {};
        return (
          <div className="text-sm">
            <p>
              {firstName} {lastName}
            </p>
            <p className="italic text-neutral-500">{email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "products",
      header: () => <span>Products</span>,
      cell: ({ row }) => (
        <ul className="text-sm text-neutral-600 space-y-1">
          {row.original.products.slice(0, 3).map((prod, i) => (
            <li key={i}>
              {prod.name} x{prod.quantity}
              {prod.isCustom && " (Custom)"}
            </li>
          ))}
          {row.original.products.length > 3 && <li>...</li>}
        </ul>
      ),
    },
    {
      accessorKey: "status",
      header: () => <span>Status</span>,
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`bg-${getBadgeColor(
            row.original.status
          )}-400 rounded-full shadow-sm font-bold text-neutral-700 px-2 py-1`}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "subtotal",
      header: () => <span>Total</span>,
      cell: ({ row }) => <div>${row.original.subtotal.toFixed(2)}</div>,
    },
    {
      accessorKey: "modify",
      header: () => <span>Modify</span>,
      cell: ({ row }) => (
        <Button
          className="hover:cursor-pointer hover:shadow-md border-1 border-neutral-300"
          onClick={() => {
            router.push(`/admin/orders/${row.original._id}`);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Table Header Skeleton */}
        <div className="flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full bg-neutral-200 rounded" />
          ))}
        </div>
        {/* Table Rows Skeleton */}
        {[...Array(5)].map((_, rowIdx) => (
          <div key={rowIdx} className="flex space-x-4">
            {[...Array(6)].map((_, colIdx) => (
              <Skeleton
                key={colIdx}
                className="h-10 w-full bg-neutral-100 rounded"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 shadow-md p-12">
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
                className="hover:bg-neutral-50 border-none font-bold"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-neutral-600 italic py-6 font-bold"
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
