"use server";
import { cookies } from "next/headers";

export const create_comment_action = async (payload: {
  reviewId: string;
  accountId: string;
  content: string;
}) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/create-comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token!,
      },
      body: JSON.stringify(payload),
    }
  );
  return await res.json();
};
