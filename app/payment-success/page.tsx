import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="rounded-2xl border p-10 text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>

        <p className="text-muted-foreground">
          Your payment has been completed successfully.
        </p>

        <Link href="/dashboard/bookings">
          <Button>Go to My Bookings</Button>
        </Link>
      </div>
    </div>
  );
}