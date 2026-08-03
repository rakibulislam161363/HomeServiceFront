"use client";

import { Button } from "@/components/ui/button";
import { createPayment } from "@/app/(publicGroup)/_action/paymentActions";
import { toast } from "sonner";

interface Props {
  bookingId: string;
}

export default function PayNowButton({
  bookingId,
}: Props) {
  const handlePayment = async () => {
    const result = await createPayment(
      bookingId
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    window.location.href =
      result.data.checkoutUrl;
  };

  return (
    <Button
      onClick={handlePayment}
      className="w-full"
    >
      Pay Now
    </Button>
  );
}