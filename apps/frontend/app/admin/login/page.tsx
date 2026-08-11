"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password must be at most 72 characters long"),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      toast.success("Login successful!");

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-8 bg-white px-16 py-32 sm:items-start dark:bg-black">
        {/* Welcome Back things */}
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <h1 className="font-semibold tracking-[0.3em] uppercase dark:text-zinc-400/70">
            Techblog Dashboard
          </h1>
          <CardTitle className="text-3xl font-semibold">Welcome back</CardTitle>
          <div className="text-sm dark:text-zinc-400/60">
            Use your account credentials to continue.
          </div>
        </div>
        {/* Login section */}
        <Card className="flex w-full flex-col gap-4 rounded-2xl border-2 dark:border-zinc-700/50 dark:bg-zinc-900/40">
          {/* Login header */}
          <CardHeader className="flex flex-col px-6 pt-2">
            <div className="mb-2 w-fit rounded-full bg-zinc-50 p-2">
              <LockKeyhole className="scale-90 text-black" />
            </div>
            <CardTitle className="text-3xl font-semibold">Log in</CardTitle>
            <div className="text-sm font-medium text-zinc-400/80">
              Enter your username and password to access the dashboard.
            </div>
          </CardHeader>

          {/* Email input */}
          <CardContent className="px-6">
            <form
              id="login-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FieldLabel className="">Email</FieldLabel>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      aria-invalid={
                        form.formState.errors.email ? "true" : "false"
                      }
                      autoComplete="email"
                    />
                  </div>
                )}
              />
              {/* Password input */}

              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <div className="flex w-full justify-between">
                      <FieldLabel className="">Password</FieldLabel>

                      {/* Reset password link */}
                      <Link
                        href="#"
                        className="inline-block text-sm underline-offset-4 hover:underline"
                        hidden
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      aria-invalid={
                        form.formState.errors.password ? "true" : "false"
                      }
                      autoComplete="current-password"
                    />
                  </div>
                )}
              />
            </form>
            <div className="mt-8 flex flex-col">
              <Button
                className="btn btn-primary py-4 text-lg font-bold hover:cursor-pointer"
                type="submit"
                form="login-form"
              >
                Submit
              </Button>
            </div>
          </CardContent>
          <CardFooter className="mt-2">
            <CardContent className="flex flex-col text-sm text-zinc-400/80">
              <div className="">
                Your backlog is big enough. Let us handle the news.
              </div>
              <div className="">
                Ready to stay ahead?{" "}
                <span>
                  <Link
                    href="/admin/register"
                    className="text-zinc-300/80 underline underline-offset-2 hover:text-zinc-300/90"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </CardContent>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
