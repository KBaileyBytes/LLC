"use client";

import FeaturedCarousel from "@/components/ui/home/FeaturedCarousel";
import HeaderTitle from "@/components/ui/home/HeaderTitle";
import UpcomingEvents from "@/components/ui/home/UpcomingEventsSection";
import ShopUnique from "@/components/ui/home/ShopUnique";
import SeeWhatsNew from "@/components/ui/home/SeeWhatsNew";
import CustomerReviews from "@/components/ui/home/CustomerReviews";

export default function Home() {
  return (
    <>
      <section className="p-8 mx-8">
        <HeaderTitle />
        <FeaturedCarousel />
        <ShopUnique />
        <UpcomingEvents />
      </section>
      <SeeWhatsNew />
      <CustomerReviews />
    </>
  );
}
