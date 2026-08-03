"use server";
import { cookies } from "next/headers";


interface PaymentActionResponse {
  success: boolean;
  message: string;
  data?: {
    checkoutUrl: string;
  };
}
export const createPayment = async (
  bookingId: string
): Promise<PaymentActionResponse> => {
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ bookingId }),
      }
    );

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      return {
        success: false,
        message: result.message,
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

export const getMyPayments = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) return [];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return [];
    }

    return result.data ?? [];
  } catch {
    return [];
  }
};