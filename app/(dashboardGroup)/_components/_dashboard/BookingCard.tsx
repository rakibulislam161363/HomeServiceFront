"use client";

import Link from "next/link";
import { CalendarDays, MapPin, User, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cancelBooking } from "@/app/(publicGroup)/_action/bookingActions";
import ReviewForm from "@/app/(publicGroup)/_components/Review/ReviewForm";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({
  booking,
}: BookingCardProps) {
  const router = useRouter();
  

  const handleCancel = async () => {
  const result = await cancelBooking(
    booking.id
  );

  if (!result.success) {
    toast.error(result.message);
    return;
  }

  toast.success(result.message);

  router.refresh();
};
  const getStatusVariant = () => {
    switch (booking.status) {
      case "REQUESTED":
        return "secondary";

      case "ACCEPTED":
        return "default";

      case "COMPLETED":
        return "outline";

      case "CANCELLED":
        return "destructive";

      default:
        return "secondary";
    }
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            {booking.service.title}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {booking.service.category.name}
          </p>
        </div>

        <Badge variant={getStatusVariant()}>
          {booking.status}
        </Badge>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-primary" />

          <span>
            Technician:{" "}
            <strong>
              {booking.technician.name}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="h-4 w-4 text-primary" />

          <span>
            {new Date(
              booking.bookingDate
            ).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />

          <span>{booking.address}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4 text-primary" />

          <span>
            ৳ {booking.totalPrice}
          </span>
        </div>
      </div>

      {booking.note && (
        <div className="mt-5 rounded-lg bg-muted p-4">
          <p className="text-sm font-medium">
            Note
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {booking.note}
          </p>
        </div>
      )}
      {booking.status === "PAID" && (
  <ReviewForm bookingId={booking.id} />
)}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/dashboard/bookings/${booking.id}`}
        >
          <Button variant="outline">
            View Details
          </Button>
        </Link>

        {booking.status === "REQUESTED" && (
          <Button
  variant="destructive"
  onClick={handleCancel}
>
  Cancel Booking
</Button>
        )}
      </div>
    </div>
  );
}