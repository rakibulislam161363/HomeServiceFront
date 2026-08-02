import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
} from "lucide-react";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto grid min-h-screen grid-cols-12 gap-8 py-8">
      <aside className="col-span-3 rounded-2xl border bg-card p-6">
        <h2 className="mb-8 text-2xl font-bold">
          Customer Panel
        </h2>

        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
          >
            <CalendarDays className="h-5 w-5" />
            My Bookings
          </Link>

          {/* <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
          >
            <User className="h-5 w-5" />
            Profile
          </Link> */}
        </nav>
      </aside>

      <main className="col-span-9">
        {children}
      </main>
    </div>
  );
}