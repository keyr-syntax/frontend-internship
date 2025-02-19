import BASE_URL from "./api";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
export interface User {
  username: string;
  email: string;
  password: string;
}

export async function getStoredUser(): Promise<User | null> {
  try {
    const response = await BASE_URL.get("/user/authenticate_user");

    if (response.data.success) {
      console.log("getStoredUser", response.data.user);
      return response.data.user as User;
    } else {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getStoredUser() !== null;
}

export const logout = async (): Promise<void> => {
  try {
    const response = await BASE_URL.get("/user/logout_user");

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
