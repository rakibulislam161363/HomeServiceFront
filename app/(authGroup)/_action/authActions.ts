"use server";

import { cookies } from "next/headers";
import { LoginFormValues } from "../login/schema";
import { RegisterFormValues } from "../register/schema";

export const registrationForm = async (
  data: RegisterFormValues
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Registration failed",
      };
    }

    return {
      success: true,
      message: "Registration successful!",
    };
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};

export const loginUser = async (
  data: LoginFormValues
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Login failed",
      };
    }

    // Check backend response
    console.log("LOGIN RESULT:", result);

    const accessToken = result?.data?.accessToken;
    const refreshToken = result?.data?.refreshToken;

    if (!accessToken) {
      return {
        success: false,
        message: "Access token not found",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return {
      success: true,
      message: "Login successful!",
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};