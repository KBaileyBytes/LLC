import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div className="mt-32 flex flex-col items-start sm:flex-row justify-between mx-4 sm:mx-16 py-14 gap-6 sm:gap-0 border-t-neutral-200 border-t-2">
      <div className="w-full sm:w-fit flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex-col gap-8 py-8">
            <NavigationMenuItem>
              <Link href="/" className="koh-santepheap text-3xl font-bold">
                LLC
              </Link>
            </NavigationMenuItem>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.instagram.com/leeleescreationz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 text-neutral-700 hover:text-purple-500 transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/leeleescreationz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 text-neutral-700 hover:text-blue-600 transition-colors" />
              </a>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* Right side: Full nav */}
      <div className="w-full sm:w-fit flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col text-center w-full gap-8">
            <NavigationMenuItem className="cursor-pointer">
              <Link href="/events" className=" font-semibold">
                Upcoming Events
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <Link href="/shop" className=" font-semibold">
                Shop
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <Link href="/about" className=" font-semibold">
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="cursor-pointer">
              <Link href="/contact" className=" font-semibold">
                Contact Me
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
