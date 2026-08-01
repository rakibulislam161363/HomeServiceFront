"use server";

export const getCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return [];
    }

    return result.data || [];
  } catch {
    return [];
  }
};