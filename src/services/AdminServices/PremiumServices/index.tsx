"use server";
import { IReview } from "@/app/(WithDashboardLayout)/dashboard/admin/manageReviews/page";
import { cookies } from "next/headers";

export const getAllPremiumReview = async (): Promise<{
  success: boolean;
  data: IReview[] | null;
  message: string;
}> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    console.log("api call");
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/review`, {
      next: {
        tags: ["REVIEWS"],
      },
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

export const deleteReview = async (id: string) => {
  try {
    const accessToken = (await cookies())?.get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/delete-comment?commentId=${id}`,
      {
        method: "DELETE",
        next: { tags: ["REVIEWS"] },
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

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
