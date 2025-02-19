import api from "./api";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
export interface User {
  username: string;
  email: string;
  password: string;
}

export function getStoredUser(): User | null {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getStoredUser() !== null;
}

export const logout = async (): Promise<void> => {
  try {
    const response = await api.get("/user/logout_user");

    if (response.data.success) {
      toast(response.data.message || "Logout successful!");
      localStorage.removeItem("user");
    } else {
      toast(response.data.message || "Logout failed");
    }
  } catch (error) {
    console.error("LOgout  error:", error);
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Logout failed";

    toast(errorMessage);
  }
};
