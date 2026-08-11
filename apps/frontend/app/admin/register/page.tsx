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
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be at most 120 characters long"),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(72, "Password must be at most 72 characters long"),
});

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Submitting registration data:", data);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }

      toast.success("Registration successful!");

      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!loginResponse.ok) {
        throw new Error("Login failed after registration");
      }

      toast.success("Login successful!");

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
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
          <CardTitle className="text-3xl font-semibold">
            Hello there! 👋
          </CardTitle>
          <div className="text-sm dark:text-zinc-400/60">
            Create an account to get started with Techblog.
          </div>
        </div>
        {/* Register section */}
        <Card className="flex w-full flex-col gap-4 rounded-2xl border-2 dark:border-zinc-700/50 dark:bg-zinc-900/40">
          {/* Register header */}
          <CardHeader className="flex flex-col px-6 pt-2">
            <div className="mb-2 w-fit rounded-full bg-zinc-50 p-2">
              <LockKeyhole className="scale-90 text-black" />
            </div>
            <CardTitle className="text-3xl font-semibold">
              Create an account
            </CardTitle>
            <div className="text-sm font-medium text-zinc-400/80">
              Enter your details to create an account.
            </div>
          </CardHeader>

          {/* Email input */}
          <CardContent className="px-6">
            <form
              id="register-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FieldLabel className="">Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                      {...field}
                      aria-invalid={
                        form.formState.errors.name ? "true" : "false"
                      }
                      autoComplete="name"
                    />
                  </div>
                )}
              />

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
                      className={
                        form.formState.errors.email ? "border-red-500" : ""
                      }
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
                      className={
                        form.formState.errors.password ? "border-red-500" : ""
                      }
                    />
                  </div>
                )}
              />
            </form>
            <div className="mt-8 flex flex-col">
              <Button
                className="btn btn-primary py-4 text-lg font-bold hover:cursor-pointer"
                type="submit"
                form="register-form"
              >
                Submit
              </Button>
            </div>
          </CardContent>
          <CardFooter className="mt-2">
            <CardContent className="flex flex-col gap-4 text-sm text-zinc-400/80">
              <div className="">
                Already have an account? We&apos;ve probably got more bugs to
                show you.{" "}
                <span>
                  <Link
                    href="/admin/login"
                    className="text-zinc-300/80 underline underline-offset-2 hover:text-zinc-300/90"
                  >
                    Log in
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
