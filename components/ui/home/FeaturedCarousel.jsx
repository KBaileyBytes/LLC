import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";

export default function FeaturedCarousel({ props }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/carousel");
        if (!res.ok) throw new Error("Failed to fetch carousel products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading carousel products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderSkeletons = () => (
    <Carousel className="w-full px-4">
      <CarouselContent>
        {[...Array(3)].map((_, i) => (
          <CarouselItem
            key={i}
            className="transition-all duration-300 content-center"
          >
            <Card className="shadow-none border-0">
              <CardContent className="flex flex-col items-start p-6">
                <Skeleton className="h-[600px] w-full max-w-[90%] sm:max-w-md rounded-2xl mx-auto" />{" "}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );

  if (loading) return renderSkeletons();
  if (!products.length) return null;

  return (
    <Carousel
      className="w-full px-4"
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      opts={{
        loop: true,
        align: "center",
      }}
    >
      <CarouselContent>
        {products.map((product, i) => (
          <CarouselItem
            key={i}
            className="transition-all duration-300 content-center"
            onClick={() => router.push(`/shop/${product._id}`)}
          >
            <Card className="shadow-none border-0">
              <CardContent className="flex flex-col items-start p-6">
                <CldImage
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl object-cover max-w-[90%] sm:max-w-md mx-auto cursor-pointer hover:scale-103 transition-transform"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
}
