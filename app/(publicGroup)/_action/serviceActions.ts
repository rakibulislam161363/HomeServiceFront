"use server";

import { Service } from "@/lib/types";

export const getAllServices = async (): Promise<Service[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return [];
  }

  return result.data.data;
};