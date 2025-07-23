"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CldImage } from "next-cloudinary";
import { format, addMonths, parseISO } from "date-fns";
import CalendarGrid from "@/components/ui/events/CalendarGrid";
import { useState, useEffect } from "react";

export default function UpcomingEventsPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/admin/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        setEvents(data);
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    fetchEvents();
  }, []);

  const months = Array.from({ length: 5 }, (_, i) =>
    format(addMonths(new Date(), i), "MMMM")
  );

  const filteredEvents = events.filter(
    (event) => format(event.date, "MMMM") === format(selectedMonth, "MMMM")
  );

  return (
    <div className="relative p-12 space-y-6">
      <p className="koh-santepheap font-bold text-4xl lg:text-5xl mb-10 mx-12">
        Upcoming Events
      </p>

      <section className="py-2 pl-16">
        <Breadcrumb>
          <BreadcrumbList>
            {months.map((month, i) => (
              <div key={i} className="flex flex-row items-center gap-4">
                <BreadcrumbItem className="hover:cursor-pointer italic text-neutral-500">
                  <BreadcrumbLink
                    className={`text-lg ${
                      format(selectedMonth, "MMMM") === month &&
                      " text-cyan-500"
                    }`}
                    onClick={() =>
                      setSelectedMonth(new Date(`${month} 1, 2025`))
                    }
                  >
                    {month}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i !== months.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <CalendarGrid
        selectedDate={selectedMonth}
        relatedEvents={filteredEvents}
      />

      <section className="relative flex flex-col">
        {filteredEvents.length < 1 ? (
          <p className="mx-8 p-8 koh-santepheap font-bold text-3xl">
            No events in {format(selectedMonth, "MMMM")}
          </p>
        ) : (
          <>
            {/* Vertical divider that stretches with the content */}
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-300" />

            {/* Event content */}
            <div className="pl-8">
              {filteredEvents.map(
                (event, index) =>
                  (event.description || event.image) && (
                    <div
                      key={index}
                      className="relative not-last:border-b-1 my-4 py-4 border-neutral-300"
                    >
                      <Card className="border-0 shadow-none">
                        <CardContent className="space-y-6">
                          <h3 className="text-2xl font-semibold">
                            {event.title}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={`text-white text-sm font-bold py-1 ${
                              event.category === "Craft Show"
                                ? "bg-purple-500"
                                : event.category === "New Release"
                                ? "bg-green-500"
                                : event.category === "News"
                                ? "bg-orange-600"
                                : ""
                            }`}
                          >
                            {event.category}
                          </Badge>
                          {event.image && (
                            <CldImage
                              src={event.image}
                              alt={event.title}
                              width={400}
                              height={600}
                              className="self-center rounded-2xl"
                            />
                          )}
                          <section className="grid gap-2 text-lg">
                            <p className="text-neutral-500 py-4">
                              {event.description}
                            </p>
                            <p className="text-neutral-500">
                              {new Date(event.date).toLocaleDateString(
                                "en-CA",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  timeZone: "UTC",
                                }
                              )}
                            </p>
                            <p className="text-neutral-500">{event.time}</p>
                            <p className="text-neutral-500">{event.place}</p>
                          </section>
                        </CardContent>
                      </Card>
                    </div>
                  )
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
