"use server";

import { IResponse } from "@/types/respones";
import { cookies } from "next/headers";

export const register_user_action = async (userData: {
  role: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Error(error.message);
    }
    return Error("An unknown error occurred");
  }
};

export const login_user_action = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result.data.refreshToken);
    }
    return result as IResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Error(error.message);
    }
    return Error("An unknown error occurred");
  }
};

export const get_current_user_action = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("Access token not found");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, {
    headers: {
      "Authorization": accessToken,
      "Content-Type": "application/json"
    },
    cache: "no-store",
  });
  return await res.json();
};


export const log_out_user_action = async () => {
  try {
    (await cookies()).delete("accessToken");
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Error(error.message);
    }
    return Error("An unknown error occurred");
  }
};

// get new access token

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Error(error.message);
    }
    return Error("An unknown error occurred");
  }
};


export const change_password_action= async (payload:{ oldPassword: string; newPassword: string }) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/change-password`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken!,
    },
    body: JSON.stringify(payload)
  })
  return await res.json();
}
export const forget_password_action = async (email:string) => {
  const res =  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot-password`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email})
  })
  return await res.json();
}

export const reset_password_action = async (email:string,token:string,password:string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email,token,newPassword:password})
  })
  return await res.json();
}

export const change_profile_status_action = async (payload:{email?:string,status:string}) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/change-account-status`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token || "",
    },
    body: JSON.stringify(payload)
  })
  return await res.json();
}