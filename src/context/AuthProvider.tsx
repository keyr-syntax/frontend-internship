import BASE_URL from "@/lib/api";
import { User } from "@/lib/types";
import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authenticateUser: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
import { ReactNode } from "react";

function ContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const authenticateUser = useCallback(async () => {
    setLoading(true);
    const internship = localStorage.getItem("internship");

    if (!internship) {
      setLoading(false);
      return;
    }

    try {
      const response = await BASE_URL.get("/user/authenticate_user");
      if (response.data.success) {
        console.log("Authentication response", response.data);
        setUser(response.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error while authenticating user", error);
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  const logout = async () => {
    try {
      const response = await BASE_URL.get("/user/logout_user");
      if (response.data.success) {
        toast(response.data.message || "Logout successful!");
        localStorage.removeItem("user");
        localStorage.removeItem("internship");
        setUser(response.data.user);
        setIsAuthenticated(response.data.isAuthenticated);
      } else {
        toast(response.data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Logout failed";

      toast(errorMessage);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        authenticateUser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default ContextProvider;
