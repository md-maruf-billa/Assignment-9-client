"use server";

import { cookies } from "next/headers";

export const create_review_action = async (
  palyad: Record<string, string | number | boolean>
) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/review/create-review`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(palyad),
    }
  );

  return await res.json();
};

export const create_voter_action = async ({
  reviewId,
  type,
}: {
  reviewId: string;
  type: string;
}) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/vote/cast`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify({ reviewId, type }),
    }
  );

  return await res.json();
};

export const getALlReview = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/review`, {
    method: "GET",
    cache: "no-store",
  });
  return await res.json();
};

export const approveReviewAction = async ({
  reviewId,
  status,
}: {
  reviewId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}) => {
  const token = (await cookies()).get("accessToken")?.value;
  console.log("Approving review with data:", { reviewId, status, token });
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/review/approve-review`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify({ reviewId, status }),
    }
  );

  const data = await res.json();
  console.log("Review approval API response:", data);
  return data;
};

export const unvoteAction = async (reviewId: string) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/vote/unvote?reviewId=${reviewId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    }
  );

  return await res.json();
};

export const getAllVotesAction = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/vote`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    }
  );

  return await res.json();
};
