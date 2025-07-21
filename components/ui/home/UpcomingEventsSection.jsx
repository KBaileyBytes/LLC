"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import AcrylicCoaster from "@/public/images/LeeLeeCreationz-AcrylicCoasters.png";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/admin/events/upcoming");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (e) {
        console.error("Error loading events:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderSkeletons = () => (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="py-4">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-5 w-1/2 mb-2" />
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-20 w-full max-w-lg pr-16" />
        </div>
      ))}
    </>
  );

  return (
    <section className="pl-8 py-12 flex justify-between relative overflow-visible">
      <section>
        <p className="py-8 koh-santepheap text-2xl sm:text-4xl font-bold">
          Upcoming Events
        </p>

        {loading && renderSkeletons()}

        {!loading && events.length === 0 && (
          <p className="text-neutral-500">No upcoming events.</p>
        )}

        {!loading &&
          events.map((event) => {
            const dateObj = new Date(event.date);
            const formattedDate = dateObj.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <div key={event._id} className="py-4">
                <p className="koh-santepheap text-xl font-bold py-4">
                  {event.title}
                </p>
                <p className="text-neutral-500 text-lg">
                  {formattedDate}
                  {event.time ? ` ${event.time}` : ""}
                </p>
                {event.place && (
                  <p className="text-neutral-500 text-lg">{event.place}</p>
                )}
                {event.description && (
                  <p className="text-neutral-500 text-lg pr-16 py-6">
                    {event.description}
                  </p>
                )}
              </div>
            );
          })}
      </section>

      <Image
        src={AcrylicCoaster}
        alt="EventsCoaster"
        className="max-w-1/2 max-h-screen ml-auto -mr-16 object-contain hidden lg:block"
      />
    </section>
  );
}
