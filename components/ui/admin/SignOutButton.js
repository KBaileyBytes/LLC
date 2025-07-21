"use client";

import { useRouter } from "next/navigation";
import { Button } from "../button";

export default function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await fetch("/api/admin/signout", {
      method: "GET",
    });

    router.push("/signIn");
  };
  return (
    <Button
      onClick={() => handleSignOut()}
      className="my-4 border-1 border-neutral-500 mx-4 hover:cursor-pointer"
    >
      Sign Out
    </Button>
  );
}
