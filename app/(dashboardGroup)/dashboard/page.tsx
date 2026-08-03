import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CreditCard,
  Star,
  User,
} from "lucide-react";

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Customer Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage your bookings, payments and profile.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardContent className="pt-6 text-center">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h2 className="text-lg font-semibold">
              My Bookings
            </h2>

            <Link href="/dashboard/bookings">
              <Button className="mt-5 w-full">
                View
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <CreditCard className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h2 className="text-lg font-semibold">
              Payments
            </h2>

            <Link href="/dashboard/payments">
              <Button className="mt-5 w-full">
                View
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <Star className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h2 className="text-lg font-semibold">
              Reviews
            </h2>

            <Link href="/dashboard/reviews">
              <Button className="mt-5 w-full">
                View
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* <Card>
          <CardContent className="pt-6 text-center">
            <User className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h2 className="text-lg font-semibold">
              Profile
            </h2>

            <Link href="/dashboard/profile">
              <Button className="mt-5 w-full">
                View
              </Button>
            </Link>
          </CardContent>
        </Card> */}

      </div>
    </div>
  );
}