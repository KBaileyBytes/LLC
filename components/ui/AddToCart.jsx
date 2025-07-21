import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { CheckIcon } from "lucide-react";

export default function AddToCart({ product, ...props }) {
  const { addToCart, itemCount, subtotal } = useCart();

  return (
    <Button
      variant="outline"
      size="lg"
      className={`rounded-4xl hover:cursor-pointer group hover:border-teal-500 hover:border-2 ${props.className}`}
      onClick={() => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`, {
          description: `${itemCount + 1} items totalling $${(
            parseFloat(subtotal) + parseFloat(product.price)
          ).toFixed(2)}`,
          duration: 10000,
          icon: <CheckIcon />,
        });
      }}
    >
      <ShoppingCart className="w-10 h-10 mx-2 text-neutral-700 transition-colors group-hover:text-teal-600 group-active:text-teal-800" />
    </Button>
  );
}
