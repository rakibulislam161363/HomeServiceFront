export const dynamic = "force-dynamic";
import { getMyBookings } from "@/app/(publicGroup)/_action/bookingActions";
import { Booking } from "@/lib/types";
import BookingCard from "@/app/(dashboardGroup)/_components/_dashboard/BookingCard";

export default async function CustomerBookingsPage() {
  const bookings: Booking[] = await getMyBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Bookings
        </h1>

        <p className="text-muted-foreground">
          Track all your booked services.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          No bookings found.
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
            />
          ))}
        </div>
      )}
    </div>
  );
}
