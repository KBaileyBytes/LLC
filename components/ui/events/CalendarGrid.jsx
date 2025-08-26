"use client";

import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { Badge } from "../badge";
import { parseISO } from "date-fns";

export default function CalendarGrid({ relatedEvents, selectedDate }) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = [];
  let day = gridStart;

  while (day <= gridEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="lg:px-16 py-4 lg:py-8 grid gap-4">
      <h2 className="text-2xl font-semibold mb-8">
        {format(selectedDate, "MMMM yyyy")}
      </h2>

      {/* Weekdays header */}
      <div className=" hidden sm:grid grid-cols-7 text-center font-bold mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="koh-santepheap ">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
        {" "}
        {days.map((date, idx) => {
          const inMonth = isSameMonth(date, selectedDate);
          const eventsToday = relatedEvents.filter((event) => {
            const eventDate = new Date(event.date).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC",
            });
            return isSameDay(eventDate, date);
          });

          return (
            <div
              key={idx}
              className={`hover:cursor-pointer h-34 border hover:border-2 hover:shadow-2xs border-neutral-200 rounded-xl flex flex-col items-center justify-center text-sm p-2 ${
                inMonth ? "bg-white text-black" : "bg-gray-100 text-gray-400"
              }`}
            >
              <span className={eventsToday.length > 0 ? `mx-auto` : ``}>
                {format(date, "d")}
              </span>

              {/* Event indicator badges */}
              <section className="flex flex-col 2xl:flex-row gap-0.5">
                {eventsToday.map((event, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className={`px-2 my-0.5 text-white text-xs italic font-bold rounded-full ${
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
                ))}
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}
