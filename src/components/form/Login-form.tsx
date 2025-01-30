import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password,
  //     });

  //     if (result?.error) {
  //       setError("Invalid email or password");
  //       toast({
  //         title: "Error",
  //         description: "Invalid email or password",
  //         variant: "destructive",
  //       });
  //     } else {
  //       toast({
  //         title: "Success",
  //         description: "You have successfully logged in!",
  //       });
  //       router.push("/chat");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during login:", error);
  //     setError("An error occurred. Please try again.");
  //     toast({
  //       title: "Error",
  //       description: "An error occurred. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleSubmit = () => {};

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
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
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
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-black hover:text-white/80"
          variant="default"
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
