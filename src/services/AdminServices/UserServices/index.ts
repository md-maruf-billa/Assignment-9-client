import { IUser } from "@/app/(WithDashboardLayout)/dashboard/admin/manageUsers/page";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getALlUser = async (): Promise<{
  success: boolean;
  data: IUser[] | null;
  message: string;
}> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
      next: {
        tags: ["USER"],
      },
    });
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

export const UpdateUser = async (
  updatedata: FormData,
  userId: string
): Promise<{ success: boolean; data: IUser | null; message: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${userId}`,
      {
        method: "PATCH",
        body: updatedata,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("USER");
    return res.json();
  } catch (error: unknown) {
    return {
      success: false,
      data: null,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
