import { getSingleBooking } from "@/app/(publicGroup)/_action/bookingActions";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  User,
  BadgeDollarSign,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const booking = await getSingleBooking(id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Booking Details
        </h1>

        <p className="text-muted-foreground">
          View complete booking information.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 space-y-5">
        <h2 className="text-2xl font-semibold">
          {booking.service.title}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <User size={18} />
            Technician: {booking.technician.name}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            {new Date(
              booking.bookingDate
            ).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            {booking.address}
          </div>

          <div className="flex items-center gap-2">
            <BadgeDollarSign size={18} />
            ৳ {booking.totalPrice}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">
            Status
          </h3>

          <p>{booking.status}</p>
        </div>

        {booking.note && (
          <div>
            <h3 className="font-semibold">
              Note
            </h3>

            <p className="text-muted-foreground">
              {booking.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}