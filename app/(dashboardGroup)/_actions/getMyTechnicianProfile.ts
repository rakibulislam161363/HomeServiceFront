"use server";

import { cookies } from "next/headers";

export const getMyTechnicianProfile = async () => {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    console.log("TECHNICIAN PROFILE TOKEN:", !!accessToken);

    if (!accessToken) {
      console.log("NO ACCESS TOKEN");
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/technicians/profile`,
      {
        method: "GET",
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      }
    );

    console.log(
      "TECHNICIAN PROFILE STATUS:",
      response.status
    );

    const result = await response.json();

    console.log(
      "TECHNICIAN PROFILE RESULT:",
      result
    );

    if (!response.ok) {
      return null;
    }

    return result.data ?? null;
  } catch (error) {
    console.error(
      "GET TECHNICIAN PROFILE ERROR:",
      error
    );

    return null;
  }
};