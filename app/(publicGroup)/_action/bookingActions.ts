"use server";

import { cookies } from "next/headers";

export interface CreateBookingPayload {
  serviceId: string;
  bookingDate: string;
  address: string;
  note?: string;
}

export const createBooking = async (
  data: CreateBookingPayload
) => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please login first",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message:
          result.message || "Booking failed",
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getMyBookings = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) return [];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/booking`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    console.log("Booking API Result:", result);

    if (!response.ok) {
      return [];
    }

    return result?.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: "ACCEPTED" | "CANCELLED"
) => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please login",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/booking/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getTechnicianBookings = async () => {
  const bookings = await getMyBookings();

  console.log("Technician Bookings:", bookings);

  return bookings ?? [];
};
