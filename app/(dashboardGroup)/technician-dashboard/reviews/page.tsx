import { getMyReviews } from "@/app/(publicGroup)/_action/reviewActions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export default async function ReviewsPage() {
  const reviews = await getMyReviews();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Customer Reviews
        </h1>

        <p className="text-muted-foreground">
          See what customers are saying about
          your services.
        </p>
      </div>

      {reviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold">
              No Reviews Yet
            </h2>

            <p className="text-muted-foreground mt-2">
              Complete more jobs to receive
              customer reviews.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5">
          {reviews.map((review: any) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {review.customer.name}
                  </CardTitle>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star
                      className="fill-yellow-500"
                      size={18}
                    />

                    <span className="font-semibold">
                      {review.rating}/5
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium">
                    Service:
                  </span>{" "}
                  {review.booking.service.title}
                </div>

                {review.comment && (
                  <div>
                    <span className="font-medium">
                      Review:
                    </span>

                    <p className="text-muted-foreground mt-1">
                      {review.comment}
                    </p>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}