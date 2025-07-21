import SignInForm from "@/components/ui/admin/SignIn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminSignInPage() {
  const cookieStore = await cookies();
  const isSignedIn = cookieStore.get("admin-auth")?.value;

  if (isSignedIn) {
    redirect("/admin");
  }

  return (
    <section className="p-12">
      <SignInForm />
    </section>
  );
}
