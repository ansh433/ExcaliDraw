"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signin, signup } from "@/draw/http";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const token = isSignin
        ? await signin(email, password)
        : await signup(email, password, name);
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (e: any) {
      setError(
        e?.response?.data?.message ?? "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-secondary-background border-2 border-border shadow-shadow rounded-base p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-heading mb-1">
          {isSignin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm font-base text-foreground/60 mb-6">
          {isSignin
            ? "Sign in to access your rooms."
            : "Sign up and start drawing for free."}
        </p>

        <div className="flex flex-col gap-4">
          {!isSignin && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {error && (
            <p className="text-sm font-base text-red-600 border-2 border-red-600 rounded-base px-3 py-2 bg-red-50">
              {error}
            </p>
          )}

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isSignin
                ? "Sign in"
                : "Create account"}
            </Button>
          </motion.div>
        </div>

        <p className="text-sm font-base text-foreground/60 mt-6 text-center">
          {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="font-heading underline underline-offset-2 text-foreground hover:text-main transition-colors"
            onClick={() => router.push(isSignin ? "/signup" : "/signin")}
          >
            {isSignin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}