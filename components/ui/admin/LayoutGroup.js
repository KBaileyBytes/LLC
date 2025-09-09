"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
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
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";
import { useState } from "react";
import { Badge } from "../badge";
import { CldImage } from "next-cloudinary";

export default function LayoutGroup({
  relatedProducts,
  allProducts,
  title,
  max,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const alt = title === "Best Sellers" ? "BestSeller" : title;
  const remaining = allProducts.filter((p) => !p.placement.includes(alt));

  const toggleSelect = (id) => {
    setSelected(
      (prev) =>
        prev.includes(id)
          ? prev.filter((s) => s !== id) // if already selected → remove it
          : [...prev, id] // if not selected → add it
    );
  };

  const handleRemove = async (id, placement) => {
    await fetch("/api/products/remove-placement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, placement }),
    });
  };

  const handleSave = async () => {
    console.log("Selected products to add:", selected);
    await fetch("/api/products/placement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ids: selected,
        placement: alt, // the section name
      }),
    });
    setOpen(false);
    setSelected([]);
  };

  return (
    <Card className="border-neutral-300 shadow-none">
      <CardHeader className="flex gap-3 flex-col">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          <span>
            {relatedProducts.length}
            {max && ` / ${max}`} products in this section
          </span>
        </CardDescription>
        <section>
          <Button
            className="bg-green-500 text-white cursor-pointer rounded-lg px-3 py-2 mx-auto"
            onClick={() => setOpen(true)}
          >
            Add Product
          </Button>
        </section>
      </CardHeader>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {relatedProducts.map((product, i) => (
          <li key={i}>
            <CardContent
              className={`rounded-xl py-4 flex flex-col items-center gap-3`}
            >
              <section className="flex justify-between items-center sm:min-w-[280px] max-w-[300px] text-xl">
                <p className="font-semibold">{product.name}</p>
                {(i < max || !max) && (
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-100 text-sm"
                  >
                    ✔
                  </Badge>
                )}
              </section>
              <CldImage
                src={product.image}
                alt={product.name}
                width={300}
                height={400}
                className="rounded-xl"
              />
              <Button
                className="bg-red-700 text-neutral-50 cursor-pointer rounded-lg px-3 py-2 self-center text-md"
                onClick={() => handleRemove(product._id, alt)}
              >
                Remove
              </Button>
            </CardContent>
          </li>
        ))}
      </ul>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-4xl bg-white text-neutral-900 border border-neutral-300 shadow-xl rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold">
              Select Products
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-600">
              Choose which products to add to <strong>{title}</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <ScrollArea className="h-[400px]">
            {remaining.map((product) => (
              <div
                key={product._id}
                className={`cursor-pointer border border-neutral-300 rounded-lg m-3 p-3 w-fit flex flex-col mx-auto hover:border-green-500 ${
                  selected.includes(product._id) &&
                  "bg-green-50 border-green-500"
                } hover:bg-green-50 transition`}
                onClick={() => toggleSelect(product._id)}
              >
                <p className="font-semibold text-center">{product.name}</p>
                <CldImage
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={250}
                  className="rounded-md"
                />
              </div>
            ))}
          </ScrollArea>

          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-neutral-100 hover:bg-neutral-200"
              onClick={() => setSelected([])}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={handleSave}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
