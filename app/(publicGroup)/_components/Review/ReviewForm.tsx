"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/app/(publicGroup)/_action/reviewActions";
import { useRouter } from "next/navigation";

interface Props {
  bookingId: string;
}

export default function ReviewForm({
  bookingId,
}: Props) {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const result = await createReview({
      bookingId,
      rating,
      comment,
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.refresh();
  };

  return (
    <div className="rounded-xl border p-6 space-y-5">
      <h2 className="text-xl font-semibold">
        Leave a Review
      </h2>

      <div className="flex gap-2">
        {[1,2,3,4,5].map((star)=>(
          <Star
            key={star}
            onClick={()=>setRating(star)}
            className={`cursor-pointer ${
              star<=rating
                ? "fill-yellow-400 text-yellow-400"
                : ""
            }`}
          />
        ))}
      </div>

      <Textarea
        placeholder="Write your experience..."
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
      />

      <Button onClick={handleSubmit}>
        Submit Review
      </Button>
    </div>
  );
}