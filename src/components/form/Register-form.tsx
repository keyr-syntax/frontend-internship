import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const res = await fetch("/api/auth/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name, email, password }),
  //     });

  //     if (res.ok) {
  //       const result = await signIn("credentials", {
  //         redirect: false,
  //         email,
  //         password,
  //       });

  //       if (result?.error) {
  //         setError("Error signing in after signup. Please try logging in.");
  //         toast({
  //           title: "Error",
  //           description: "Error signing in after signup. Please try logging in.",
  //           variant: "destructive",
  //         });
  //       } else {
  //         toast({
  //           title: "Success",
  //           description: "You have successfully signed up!",
  //           variant: "default",
  //         });
  //         router.push("/chat");
  //       }
  //     } else {
  //       const data = await res.json();
  //       toast({
  //         title: "Error",
  //         description: data.message || "An error occurred during signup.",
  //         variant: "destructive",
  //       });
  //       setError(data.message || "An error occurred during signup.");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during signup:", error);
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
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-black hover:text-white/80"
          variant="default"
        >
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
