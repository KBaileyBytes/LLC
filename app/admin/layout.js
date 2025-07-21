import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const isSignedIn = cookieStore.get("admin-auth")?.value;

  if (!isSignedIn) {
    redirect("/signIn");
  }

  return (
    <section>
      <>{children}</>
    </section>
  );
}
