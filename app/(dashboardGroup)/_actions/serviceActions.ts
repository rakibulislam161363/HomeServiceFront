"use server";

import { cookies } from "next/headers";

export interface CreateServicePayload {
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
}

export const createService = async (
  data: CreateServicePayload
) => {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not logged in",
      };
    }

    console.log("SEND DATA:", data);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
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

    console.log("STATUS:", response.status);
console.log("OK:", response.ok);

    const result = await response.json();

    console.log("RESULT:", result);

    if (!response.ok) {
      return {
        success: false,
        message:
          result?.message || "Failed to create service",
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error("CREATE SERVICE ERROR:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const updateService = async (
  id: string,
  data: Partial<CreateServicePayload>
) => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const deleteService = async (id: string) => {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    }
  );

  return response.json();
};

export const getServiceById = async (id: string) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
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