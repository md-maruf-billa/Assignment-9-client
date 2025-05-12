/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IUser {
  id: string;
  email: string;
  status: Status;
  role: "USER" | "ADMIN" | "COMPANY";
  user: {
    id: string;
    accountId: string;
    name: string;
    bio: string | null;
    profileImage: string | null;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

  };
  isCompleteProfile:boolean;
  isPremium:boolean;
  admin: any | null;
  company: any | null;
  createdAt: string;
}

enum Status {
  ACTIVE,
  INACTIVE,
  SUSPENDED,
}


export const ACCOUNT_TYPE = {
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  USER: "USER",
};
