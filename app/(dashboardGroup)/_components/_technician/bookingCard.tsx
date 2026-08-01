"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/app/(publicGroup)/_action/bookingActions";


interface BookingProps {
  booking: {
    id: string;
    status: string;
  };
}

export default function BookingCard({
  booking,
}: BookingProps) {
  const router = useRouter();

  const handleUpdate = async (
    status: "ACCEPTED" | "CANCELLED"
  ) => {
    const result = await updateBookingStatus(
      booking.id,
      status
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.refresh();
  };

  return (
    <div className="flex gap-3">
      <Button
        onClick={() =>
          handleUpdate("ACCEPTED")
        }
        disabled={booking.status !== "REQUESTED"}
      >
        Accept
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          handleUpdate("CANCELLED")
        }
        disabled={booking.status !== "REQUESTED"}
      >
        Reject
      </Button>
    </div>
  );
}