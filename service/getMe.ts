"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    console.log("ACCESS TOKEN:", !!accessToken);

    if (!accessToken) {
      console.log("NO ACCESS TOKEN");
      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    console.log("ME API STATUS:", res.status);

    const result = await res.json();

    console.log("ME API RESULT:", result);

    return result.data ?? result;
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return null;
  }
};