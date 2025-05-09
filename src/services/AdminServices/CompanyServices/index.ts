import { IUser } from "@/app/(WithDashboardLayout)/dashboard/admin/manageUsers/page";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllCompany = async (): Promise<{
  success: boolean;
  data: IUser[] | null;
  message: string;
}> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company`, {
      next: {
        tags: ["COMPANY"],
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

export const UpdateCompany = async (
  updatedata: FormData,
  companyId: string
): Promise<{ success: boolean; data: IUser | null; message: string }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/company/${companyId}`,
      {
        method: "PATCH",
        body: updatedata,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("COMPANY");
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
