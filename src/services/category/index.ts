"use server";

import { cookies } from "next/headers";

// get all category
export const allCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`);

  return await res.json();
};

// get category by id
export const getCategoryById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/category/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const result = await res.json();
  return {
    data: result.data,
  };
};

export const createCategory = async (payload: any) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/category/create-category`,
    {
      method: "POST",
      headers: {
        Authorization: token!,
      },
      body: payload,
    }
  );

  return await res.json();
};
