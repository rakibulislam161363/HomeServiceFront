import { notFound } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  User,
  BadgeDollarSign,
  Briefcase,
  Star,
  Mail,
  Phone,
  StickyNote,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getSingleBooking } from "@/app/(publicGroup)/_action/bookingActions";
import { getMyReview } from "@/app/(publicGroup)/_action/reviewActions";
import ReviewForm from "@/app/(publicGroup)/_components/Review/ReviewForm";
import PayNowButton from "./PayNowButton";

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

  const review = await getMyReview(booking.id);

  const getStatusColor = () => {
    switch (booking.status) {
      case "REQUESTED":
        return "secondary";

      case "ACCEPTED":
        return "default";

      case "PAID":
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
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Booking Details
        </h1>

        <p className="text-muted-foreground">
          View complete booking information and manage your booking.
        </p>
      </div>

      {/* Service Information */}

      <Card>

        <CardHeader>

          <CardTitle>
            Service Information
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <h2 className="text-2xl font-bold">
                {booking.service.title}
              </h2>

              <p className="mt-2 text-muted-foreground">
                {booking.service.description}
              </p>

            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Category
                  </p>

                  <p className="font-medium">
                    {booking.service.category.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BadgeDollarSign className="h-5 w-5 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Price
                  </p>

                  <p className="font-semibold text-primary">
                    ৳ {booking.totalPrice}
                  </p>
                </div>
              </div>

              <div>

                <Badge variant={getStatusColor()}>
                  {booking.status}
                </Badge>

              </div>

            </div>

          </div>

        </CardContent>

      </Card>

      {/* Booking Information */}

      <Card>

        <CardHeader>

          <CardTitle>
            Booking Information
          </CardTitle>

        </CardHeader>

        <CardContent>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Booking Date
                </p>

                <p>
                  {new Date(
                    booking.bookingDate
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Address
                </p>

                <p>{booking.address}</p>
              </div>
            </div>

            {booking.note && (
              <div className="md:col-span-2 flex gap-3">

                <StickyNote className="h-5 w-5 text-primary mt-1" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Customer Note
                  </p>

                  <p>
                    {booking.note}
                  </p>

                </div>

              </div>
            )}

          </div>

        </CardContent>

      </Card>
            {/* Technician Information */}

      <Card>
        <CardHeader>
          <CardTitle>Technician Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2">

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Name
                </p>

                <p className="font-medium">
                  {booking.technician.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p>{booking.technician.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Phone
                </p>

                <p>{booking.technician.phone}</p>
              </div>
            </div>

            {booking.technician.technicianProfile && (
              <>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-primary" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Rating
                    </p>

                    <p>
                      ⭐{" "}
                      {booking.technician.technicianProfile.rating}
                      {" / 5"}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    Experience
                  </p>

                  <p>
                    {
                      booking.technician
                        .technicianProfile.experience
                    }{" "}
                    Years
                  </p>
                </div>

                {booking.technician.technicianProfile.bio && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      Bio
                    </p>

                    <p>
                      {
                        booking.technician
                          .technicianProfile.bio
                      }
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment */}

      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="flex items-center justify-between">
            <span>Status</span>

            <Badge variant={getStatusColor()}>
              {booking.status}
            </Badge>
          </div>

          {booking.status === "ACCEPTED" && (
            <PayNowButton
              bookingId={booking.id}
            />
          )}

          {booking.status === "PAID" && (
            <div className="rounded-lg border bg-green-50 p-4">
              <p className="font-medium text-green-700">
                ✅ Payment Completed Successfully
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review */}

      <Card>
        <CardHeader>
          <CardTitle>
            Customer Review
          </CardTitle>
        </CardHeader>

        <CardContent>

          {booking.status !== "PAID" && (
            <p className="text-muted-foreground">
              You can review this technician
              after completing payment.
            </p>
          )}

          {booking.status === "PAID" &&
            !review && (
              <ReviewForm
                bookingId={booking.id}
              />
            )}

          {review && (
            <div className="space-y-4">

              <div>
                <p className="text-sm text-muted-foreground">
                  Rating
                </p>

                <div className="flex gap-1 mt-2">
                  {Array.from({
                    length: review.rating,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Comment
                </p>

                <p className="mt-1 rounded-lg bg-muted p-3">
                  {review.comment ||
                    "No comment"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}