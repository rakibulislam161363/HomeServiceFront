import { Booking } from "@/lib/types";
import { getMyBookings } from "../_action/bookingActions";

export default async function MyBookingsPage() {
  const bookings = await getMyBookings();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          No bookings found.
        </div>
      ) : (
        <div className="grid gap-5">
          {bookings.map((booking: Booking) => (
            <div
              key={booking.id}
              className="rounded-xl border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {booking.service.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {booking.service.category.name}
                  </p>
                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm">
                  {booking.status}
                </span>
              </div>

              <div className="mt-5 grid gap-2 text-sm">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    booking.bookingDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {booking.address}
                </p>

                <p>
                  <strong>Total:</strong> ৳
                  {booking.totalPrice}
                </p>

                {booking.note && (
                  <p>
                    <strong>Note:</strong>{" "}
                    {booking.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}