import { getTechnicianBookings } from "@/app/(publicGroup)/_action/bookingActions";
import { Booking } from "@/lib/types";
import BookingCard from "@/app/(dashboardGroup)/_components/_technician/bookingCard";


export default async function TechnicianBookingsPage() {
  const bookings: Booking[]  = await getTechnicianBookings();

  console.log("Bookings:", bookings);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Booking Requests
      </h1>

      {bookings.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          No booking requests found.
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map((booking: Booking) => (
            <div
              key={booking.id}
              className="rounded-xl border p-6"
            >
              <h2 className="text-xl font-semibold">
                {booking.service.title}
              </h2>

              <p>{booking.customer.name}</p>

              <p>{booking.address}</p>

              <p>{booking.status}</p>

              <div className="mt-5 flex gap-3">
                <BookingCard booking={booking} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
            