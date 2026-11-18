import { USER_ROLES } from "@/constants/auth";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: UserRole;
  createdAt: string;
}

export interface AdminCreateUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
}

export interface AdminUpdateUserInput {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: UserRole;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
