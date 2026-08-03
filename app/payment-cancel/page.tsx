import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <XCircle className="mx-auto mb-5 h-20 w-20 text-red-500" />

        <h1 className="text-3xl font-bold">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your payment was cancelled.
          <br />
          No money has been charged.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/dashboard/bookings">
            <Button className="w-full">
              Back to My Bookings
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}