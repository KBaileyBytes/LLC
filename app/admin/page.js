import { ProductTable } from "@/components/ui/admin/ProductTable";
import { EventsTable } from "@/components/ui/admin/EventsTable";
import { OrderTable } from "@/components/ui/admin/OrderTable";
import SignOutButton from "@/components/ui/admin/SignOutButton";
import InfoGrid from "@/components/ui/admin/InfoGrid";
import HelpForm from "@/components/ui/admin/HelpForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function AdminDashboard() {
  const pages = ["Products", "Orders", "Events", "Help"];

  return (
    <section className="p-6">
      <p className="koh-santepheap text-neutral-800 text-4xl font-bold px-4">
        Admin Dashboard
      </p>
      <SignOutButton />
      <InfoGrid />
      <section>
        <Tabs defaultValue="Products" className="px-8 flex flex-col gap-6">
          <TabsList className="flex flex-col w-full gap-8 sm:flex-row self-center lg:mt-20 h-fit md:mt-0">
            {pages.map((category, i) => (
              <TabsTrigger
                key={i}
                value={category}
                className=" rounded-none koh-santepheap text-lg transition-all
           data-[state=active]:text-teal-500
           data-[state=active]:border-b-teal-500
           data-[state=active]:border-2
           data-[state=active]:font-semibold
           data-[state=active]:shadow-none
           hover:border-b-teal-200
           hover:border-b-2
           hover:cursor-pointer"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Products" className="mb-4 pb-4">
            <ProductTable />
          </TabsContent>

          <TabsContent value="Events" className="mb-4 pb-4">
            <EventsTable />
          </TabsContent>

          <TabsContent value="Orders" className="mb-4 pb-4">
            <OrderTable />
          </TabsContent>

          <TabsContent value="Help" className="mb-4 pb-4">
            <HelpForm />
          </TabsContent>
        </Tabs>
      </section>
    </section>
  );
}
