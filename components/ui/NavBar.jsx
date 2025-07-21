import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CartContainer from "./CartContainer";

export default function NavBar() {
  const pathname = usePathname();
  const isShop = pathname === "/shop";

  return (
    <div
      className={`relative w-full h-auto
      `}
    >
      {/* Background gradient or image */}
      {isShop ? (
        <>
          {/* Gradient + subtle blobs */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-cyan-300 blur-3xl to-green-200"></div>
          <div className="absolute -top-10 -left-10 w-42 h-42 bg-purple-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        </>
      ) : null}

      {/* Nav content overlays image */}
      <div className="flex flex-col md:flex-row justify-between align-bottom px-4 md:px-16 py-6 gap-6 md:gap-0 h-full">
        {/* Left side: LLC */}
        <div className="flex justify-center md:self-start md:justify-start">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-8">
              <NavigationMenuItem>
                <Link
                  href="/"
                  className={`koh-santepheap text-3xl font-bold ${
                    isShop && "text-white"
                  }`}
                >
                  LLC
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side: Full nav */}
        <div className="md:w-max flex justify-center md:self-start">
          <NavigationMenu className="w-fit">
            <NavigationMenuList className="flex flex-col text-center w-full gap-12 md:flex-row">
              <NavigationMenuItem>
                <Link
                  href="/events"
                  className={`cursor-pointer font-semibold text-neutral-700`}
                >
                  Upcoming Events
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/shop"
                  className={`cursor-pointer font-semibold text-neutral-700`}
                >
                  Shop
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/about"
                  className={`cursor-pointer font-semibold text-neutral-700`}
                >
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="/contact"
                  className={`cursor-pointer font-semibold text-neutral-700`}
                >
                  Contact Me
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <CartContainer>Cart</CartContainer>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
