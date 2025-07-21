import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeaderTitle({ props }) {
  return (
    <>
      <p className="koh-santepheap text-4xl sm:text-6xl font-bold">Leelee's</p>
      <p className="koh-santepheap text-4xl sm:text-6xl font-bold">Creationz</p>
      <section className="py-8 flex flex-col sm:flex-row justify-between">
        <p className="sm:w-2/3 md:w-1/2 w-2/3 text-neutral-500">
          From canvas to coaster, each piece is thoughtfully crafted to bring
          color, warmth, and joy into your space.{" "}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-black text-white self-center font-bold mt-8 sm:mt-0"
        >
          <Link href="/shop">Shop</Link>
        </Button>
      </section>
    </>
  );
}
