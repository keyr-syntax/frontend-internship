import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "@/lib/api";

interface RegisterResponse {
  success: boolean;
  message: string;
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export default function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await BASE_URL.post<RegisterResponse>(
        "/user/create_user",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log("Registration response:", response.data);
      if (response.data.success) {
        toast(response.data.message);
        navigate("/chat");
      } else {
        setError(response.data.message || "Registration failed");
        toast(error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred during registration";

      setError(errorMessage);
      toast("Something went wrong try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
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
          <Label htmlFor="password">Password</Label>
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
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Log in
        </Link>
      </div>
    </form>
  );
}
