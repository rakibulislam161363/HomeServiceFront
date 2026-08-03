import {
  CalendarDays,
  MapPin,
  User,
  BadgeDollarSign,
} from "lucide-react";

import { getTechnicianBookings } from "@/app/(publicGroup)/_action/bookingActions";
import BookingCard from "@/app/(dashboardGroup)/_components/_technician/bookingCard";
import { Booking } from "@/lib/types";

export default async function TechnicianBookingsPage() {
  const bookings: Booking[] =
    await getTechnicianBookings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Booking Requests
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage customer booking requests.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border bg-card p-12 text-center">
          <h2 className="text-xl font-semibold">
            No Booking Requests
          </h2>

          <p className="mt-2 text-muted-foreground">
            Customers haven&apos;t booked any services yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {booking.service.title}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    {booking.service.category.name}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium
                  ${
                    booking.status === "REQUESTED"
                      ? "bg-yellow-100 text-yellow-700"
                      : booking.status === "ACCEPTED"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  {booking.customer.name}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {new Date(
                    booking.bookingDate
                  ).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {booking.address}
                </div>

                <div className="flex items-center gap-2">
                  <BadgeDollarSign className="h-4 w-4 text-primary" />
                  ৳ {booking.totalPrice}
                </div>
              </div>

              {booking.note && (
                <div className="mt-5 rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium">
                    Customer Note
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.note}
                  </p>
                </div>
              )}

              <div className="mt-6">
                <BookingCard booking={booking} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}