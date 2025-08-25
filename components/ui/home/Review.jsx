import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export default function CustomerReview({ review, name, initials, handle }) {
  return (
    <Card className="w-full px-8 border-neutral-400 shadow-none">
      <section className="flex gap-1">
        <Avatar className="border-neutral-200 border-1 rounded-full w-fit p-3 self-center">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <section>
          <p className="font-bold">{name}</p>
          <p className="text-neutral-400">@ {handle}</p>
        </section>
      </section>
      <p className="text-neutral-700 break-words">{review}</p>
    </Card>
  );
}
