import { cookies } from "next/headers";
import Link from "next/link";
import { LayoutDashboard, ArrowLeft, LogOut } from "lucide-react";

export const metadata = {
  title: "Sunstroke - Admin",
  description: "Management portal for Sunstroke AI tools, products, and articles.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-black">
      {isAuthenticated && (
        <header className="sticky top-0 z-40 w-full border-b-3 border-black bg-white shadow-gumroad-sm">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#ffc700] shadow-gumroad-sm">
                <LayoutDashboard className="h-5 w-5 text-black stroke-[2.5]" />
              </div>
              <span className="font-heading text-lg font-black text-black">Sunstroke Admin</span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="btn-gumroad bg-white px-4 py-2 text-xs uppercase font-black tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5 stroke-[2.5]" /> View Site
              </Link>
              <form action="/api/admin/logout" method="POST" className="inline">
                <button
                  type="submit"
                  className="btn-gumroad bg-[#ff90e8] px-4 py-2 text-xs uppercase font-black tracking-wider flex items-center gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5 stroke-[2.5]" /> Logout
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
