"use client";

import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/home/Footer";

export default function LayoutWrapper({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
