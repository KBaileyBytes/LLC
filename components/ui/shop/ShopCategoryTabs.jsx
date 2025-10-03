import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShopCategoryTabs({ categories }) {
  return (
    <TabsList className="flex flex-col gap-8 lg:flex-row self-center mt-0 sm:mt-20 w-full h-fit md:mt-0">
      {categories.map((category, i) => (
        <TabsTrigger
          key={i}
          value={category.name}
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
          {category.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
