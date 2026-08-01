"use server";

import { cookies } from "next/headers";

interface TechnicianProfileFormData {
  bio: string;
  experience: number;
  address: string;
}

export const createTechnicianProfile = async (
  data: TechnicianProfileFormData
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians/profile`,
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
          result?.message || "Failed to create profile",
      };
    }

    return {
      success: true,
      message: "Profile created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Create profile error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const updateTechnicianProfile = async (
  data: TechnicianProfileFormData
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians/profile`,
      {
        method: "PATCH",
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
          result?.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      message: "Profile updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Update profile error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};