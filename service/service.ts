
import { ServicesResponse } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetServicesParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const getServices = async (
  params: GetServicesParams = {}
): Promise<ServicesResponse> => {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.categoryId) {
    searchParams.set("categoryId", params.categoryId);
  }

  if (params.minPrice !== undefined) {
    searchParams.set("minPrice", String(params.minPrice));
  }

  if (params.maxPrice !== undefined) {
    searchParams.set("maxPrice", String(params.maxPrice));
  }

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 10));

  if (params.sortBy) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const response = await fetch(
    `${API_URL}/api/services?${searchParams.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  return response.json();
};