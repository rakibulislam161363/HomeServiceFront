"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/app/(publicGroup)/_action/bookingActions";


interface Service {
  id: string;
  title: string;
  price: number;
  location?: string;
  category: {
    name: string;
  };
}

interface BookingFormProps {
  service: Service;
}

export default function BookingForm({
  service,
}: BookingFormProps) {
  const router = useRouter();

  const [bookingDate, setBookingDate] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [note, setNote] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!bookingDate) {
      toast.error("Select booking date");
      return;
    }

    if (!address.trim()) {
      toast.error("Address is required");
      return;
    }

    setLoading(true);

    const result = await createBooking({
      serviceId: service.id,
      bookingDate,
      address,
      note,
    });

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.push("/my-bookings");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-card p-8"
    >
      <div>
        <h1 className="text-3xl font-bold">
          Book Service
        </h1>

        <p className="text-muted-foreground mt-2">
          Complete the form below.
        </p>
      </div>

      {/* Service Information */}

      <div className="rounded-xl border bg-muted/40 p-5 space-y-2">
        <h2 className="text-xl font-semibold">
          {service.title}
        </h2>

        <p className="text-sm text-muted-foreground">
          Category : {service.category.name}
        </p>

        {service.location && (
          <p className="text-sm text-muted-foreground">
            Location : {service.location}
          </p>
        )}

        <p className="text-3xl font-bold text-primary">
          ৳ {service.price}
        </p>
      </div>

      {/* Booking Date */}

      <div className="space-y-2">
        <label>Booking Date</label>

        <Input
          type="date"
          value={bookingDate}
          onChange={(e) =>
            setBookingDate(e.target.value)
          }
        />
      </div>

      {/* Address */}

      <div className="space-y-2">
        <label>Address</label>

        <Textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />
      </div>

      {/* Note */}

      <div className="space-y-2">
        <label>Note (Optional)</label>

        <Textarea
          placeholder="Additional information..."
          value={note}
          onChange={(e) =>
            setNote(e.target.value)
          }
        />
      </div>

      {/* Total */}

      <div className="rounded-xl border p-4 flex items-center justify-between">
        <span className="font-medium">
          Total Price
        </span>

        <span className="text-2xl font-bold text-primary">
          ৳ {service.price}
        </span>
      </div>

      <Button
  type="submit"
  className="w-full"
  disabled={loading}
>
  {loading ? "Booking..." : "Confirm Booking"}
</Button>
    </form>
  );
}