"use server";

import { cookies } from "next/headers";

export const getAllUsers = async () => {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
    {
      headers: {
        Cookie: `accessToken=${token}`,
      },
      cache: "no-store",
    }
  );

  return res.json();
};

export const updateUserStatus = async (
  id: string,
  status: string
) => {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  return res.json();
};

export const deleteUser = async (
  id: string
) => {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${token}`,
      },
    }
  );

  return res.json();
};

export const getUserStats = async () => {

  const cookieStore = await cookies();


  const cookie = cookieStore
    .getAll()
    .map(
      (item) => `${item.name}=${item.value}`
    )
    .join("; ");



  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/stats`,
    {
      headers:{
        Cookie: cookie,
      },

      cache:"no-store",
    }
  );


  return res.json();

};