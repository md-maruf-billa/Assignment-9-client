export interface IUser {
  id: string;
  name: string;
  email: string;
  isActive?: ActiveStatus;
  role: "USER" | "ADMIN" | "COMPANY";
  status: Status;
  iat?: number;
  exp?: number;
}

enum Status {
  ACTIVE,
  INACTIVE,
  SUSPENDED,
}

enum ActiveStatus {
  ACTIVE,
  INACTIVE,
}

export const ACCOUNT_TYPE = {
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  USER: "USER",
};
