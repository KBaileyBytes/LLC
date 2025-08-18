import LLCBooth from "@/public/images/LLC_booth.jpg";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="sm:p-16 my-8 ml-12 grid gap-4">
      <p className="koh-santepheap text-neutral-800 text-6xl font-bold py-4">
        About
      </p>
      <section className="flex flex-col xl:flex-row gap-12 items-center xl:items-start">
        <section>
          <p className="text-lg text-neutral-500 italic pb-4">
            From canvas to coaster, each piece is thoughtfully crafted to bring
            color, warmth, and joy into your space.
          </p>
          <section className="text-lg xl:text-xl">
            <p>
              Hi I’m Leah, the artist behind Leelees Creationz. My passion for
              resin art started with a simple curiosity and turned into a love
              creating pieces with resin. I draw inspiration from my love of
              colour and texture. From abalone shells to sparkle, each creation
              is handcrafted with love. Thank you for visiting my website and
              supporting my small business. This is truly a dream come true.
            </p>
          </section>
        </section>
        <Image
          src={LLCBooth}
          alt="LLC Booth"
          className="rounded-lg max-w-3xl object-contain hidden lg:block"
        />
      </section>
    </section>
  );
}
