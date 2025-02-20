import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/lib/api";
import { AuthContext } from "@/context/AuthProvider";

interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const authContext = useContext(AuthContext);
  const setUser = authContext?.setUser;
  const setIsAuthenticated = authContext?.setIsAuthenticated;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await BASE_URL.post<LoginResponse>("/user/login_user", {
        email,
        password,
      });
      if (response.data.success) {
        if (setUser) setUser(response.data.user);
        if (setIsAuthenticated) setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast(response.data.message || "Login successful!");
        navigate("/chat");
      } else {
        setError(response.data.message || "Login failed");
        toast(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Invalid email or password";

      setError(errorMessage);
      toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6 max-h-screen", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="ml-auto text-sm text-primary underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-black hover:text-white/80"
          variant="default"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
