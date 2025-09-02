import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { CldImage } from "next-cloudinary";

export default function LayoutGroup({ products, title }) {
  return (
    <Card className="border-neutral-300 shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          {products.length} Products in this section
        </CardDescription>
      </CardHeader>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product, i) => (
          <li key={i}>
            <CardContent>
              <p className="text-lg font-semibold">{product.name}</p>
              <CldImage
                src={product.image}
                alt={product.name}
                width={300}
                height={400}
                className="rounded-xl"
              />
            </CardContent>
          </li>
        ))}
      </ul>
    </Card>
  );
}
