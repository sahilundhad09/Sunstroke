import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
