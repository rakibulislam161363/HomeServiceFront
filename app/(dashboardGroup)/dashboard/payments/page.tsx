import { getMyPayments } from "@/app/(publicGroup)/_action/paymentActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PaymentsPage() {
  const payments = await getMyPayments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Payments
        </h1>

        <p className="text-muted-foreground">
          All your payment history.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          No payment history found.
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment: any) => (
            <div
              key={payment.id}
              className="rounded-xl border p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    ৳ {payment.amount}
                  </h2>

                  <p>
                    Status:
                    <span className="ml-2 font-semibold">
                      {payment.status}
                    </span>
                  </p>

                  <p>
                    Provider:
                    <span className="ml-2">
                      {payment.provider}
                    </span>
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Transaction:
                    {payment.transactionId}
                  </p>
                </div>

                <Link
                  href={`/dashboard/bookings/${payment.booking.id}`}
                >
                  <Button>
                    View Booking
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}