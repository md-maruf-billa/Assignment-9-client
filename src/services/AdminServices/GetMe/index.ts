"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: accessToken!,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
