"use server";

import { cookies } from "next/headers";

export const createReview = async (payload: {
  bookingId: string;
  rating: number;
  comment?: string;
}) => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please login first",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    return result;
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getMyReview = async (
  bookingId: string
) => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/booking/${bookingId}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  return result.data;
};
export const getMyReviews = async () => {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/my-reviews`,
    {
      headers: {
        Cookie: `accessToken=${token}`,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  return result.data;
};