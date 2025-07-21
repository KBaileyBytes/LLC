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
import { parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "../badge";

export function EventsTable() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/admin/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const columns = [
    {
      accessorKey: "title",
      header: () => <span>Event Title</span>,
      cell: ({ row }) => <div>{row.original.title}</div>,
    },
    {
      accessorKey: "date",
      header: () => <span>Date & Time</span>,
      cell: ({ row }) => {
        const date = parseISO(row.original.date);

        const formattedDate = date.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        });

        return (
          <div className="font-medium line-clamp-1">
            {formattedDate}
            {row.original?.time ? ` - ${row.original.time}` : ``}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <span>Category</span>,
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`px-3 my-3 text-white text-xs italic font-bold rounded-full ${
            row.original.category === "Craft Show"
              ? "bg-purple-500"
              : row.original.category === "New Release"
              ? "bg-green-500"
              : row.original.category === "News"
              ? "bg-orange-600"
              : ""
          }`}
        >
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "place",
      header: () => <span>Place</span>,
      cell: ({ row }) => <div>{row.original.place}</div>,
    },
    {
      accessorKey: "description",
      header: () => <span>Description</span>,
      cell: ({ row }) => (
        <div className="whitespace-normal text-sm text-neutral-600 overflow-hidden line-clamp-2">
          {row.original.description}
        </div>
      ),
    },
    {
      accessorKey: "modify",
      header: () => <p>Modify</p>,
      cell: ({ row }) => (
        <Button
          onClick={() => {
            router.push(`/admin/events/${row.original._id}`);
          }}
          className="hover:cursor-pointer hover:shadow-md border border-neutral-300"
        >
          Edit
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: events,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-2xl border-1 border-neutral-200 shadow-md p-12">
      <Button
        onClick={() => router.push("admin/events")}
        className="bg-teal-300 border-1 border-neutral-500 hover:cursor-pointer mx-4 my-2 px-6 py-3"
        size="lg"
      >
        Add Event
      </Button>
      {loading ? (
        <div className="space-y-4">
          {/* Table Header Skeleton */}
          <div className="flex space-x-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-10 w-full bg-neutral-200 rounded"
              />
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
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-lg font-bold py-4"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                      className={`py-6 ${
                        cell.column.id == "title" ? "font-bold" : ""
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
      )}
    </div>
  );
}
