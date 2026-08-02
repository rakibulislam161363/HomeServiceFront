import { getBookingStats } from "@/app/(publicGroup)/_action/bookingActions";

export default async function CustomerDashboardPage() {
  const stats = await getBookingStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Customer Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value={stats.total}
        />

        <StatCard
          title="Requested"
          value={stats.requested}
        />

        <StatCard
          title="Accepted"
          value={stats.accepted}
        />

        <StatCard
          title="Completed"
          value={stats.completed}
        />

        <StatCard
          title="Cancelled"
          value={stats.cancelled}
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <p className="text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>
    </div>
  );
}