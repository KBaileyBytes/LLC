"use client";

import { Card, CardContent } from "../card";
import { Skeleton } from "../skeleton";
import { useState, useEffect } from "react";

export default function InfoGrid() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Skeleton className="p-8 my-16 grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-4">
        <Card className="border border-cyan-200 bg-cyan-50 py-8 px-6 w-full">
          <CardContent className="my-auto flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-cyan-700 font-medium uppercase tracking-wide"></p>
            <span className="text-5xl font-bold text-cyan-900"></span>
          </CardContent>
        </Card>

        <Card className="border border-green-200 bg-green-50 py-8 px-6 w-full">
          <CardContent className="my-auto flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-green-700 font-medium uppercase tracking-wide"></p>
            <span className="text-5xl font-bold text-green-900"></span>
          </CardContent>
        </Card>

        <Card className="border border-yellow-200 bg-yellow-50 py-8 px-6 w-full">
          <CardContent className="my-auto flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-yellow-700 font-medium uppercase tracking-wide"></p>
            <span className="text-5xl font-bold text-yellow-900"></span>
          </CardContent>
        </Card>

        <Card className="border border-blue-200 bg-blue-50 py-8 px-6 w-full">
          <CardContent className="my-auto flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-blue-700 font-medium uppercase tracking-wide"></p>
            <span className="text-5xl font-bold text-blue-900"></span>
            <p className="text-sm text-blue-700"></p>
          </CardContent>
        </Card>
      </Skeleton>
    );
  }

  return (
    <section className="p-8 my-16 grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-4">
      <Card className="border border-cyan-200 bg-cyan-50 py-8 px-6 w-full">
        <CardContent className="my-auto flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-cyan-700 font-medium uppercase tracking-wide">
            Products
          </p>
          <span className="text-5xl font-bold text-cyan-900">
            {stats.products}
          </span>
        </CardContent>
      </Card>

      <Card className="border border-green-200 bg-green-50 py-8 px-6 w-full">
        <CardContent className="my-auto flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-green-700 font-medium uppercase tracking-wide">
            Orders
          </p>
          <span className="text-5xl font-bold text-green-900">
            {stats.orders}
          </span>
        </CardContent>
      </Card>

      <Card className="border border-yellow-200 bg-yellow-50 py-8 px-6 w-full">
        <CardContent className="my-auto flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-yellow-700 font-medium uppercase tracking-wide">
            Pending Orders
          </p>
          <span className="text-5xl font-bold text-yellow-900">
            {stats.pendingOrders}
          </span>
        </CardContent>
      </Card>

      <Card className="border border-blue-200 bg-blue-50 py-8 px-6 w-full">
        <CardContent className="my-auto flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-blue-700 font-medium uppercase tracking-wide">
            Last Order
          </p>
          <span className="text-5xl font-bold text-blue-900">
            {stats.lastOrder}
          </span>
        </CardContent>
      </Card>
    </section>
  );
}
