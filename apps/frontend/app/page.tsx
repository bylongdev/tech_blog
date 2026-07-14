"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string(),
});

export default function Home() {
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

			// Handle successful login (e.g., redirect, show a message, etc.)
		} catch (error) {
			console.error("Error during login:", error);
			toast.error("Login failed. Please try again.");
		}
	};
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-dvh">
			<main className="flex flex-1 w-full max-w-xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start gap-8">
				{/* Welcome Back things */}
				<div className="flex flex-col items-center justify-center w-full gap-2">
					<h1 className="tracking-[0.3em] font-semibold uppercase dark:text-zinc-400/70">
						Techblog Dashboard
					</h1>
					<CardTitle className="text-3xl font-semibold">Welcome back</CardTitle>
					<div className="text-sm  dark:text-zinc-400/60">
						Use your account credentials to continue.
					</div>
				</div>
				{/* Login section */}
				<Card className="flex flex-col w-full p-6 gap-4 dark:bg-zinc-900/40 rounded-2xl border-2 dark:border-zinc-700/50 ">
					{/* Login header */}
					<CardHeader className="flex flex-col">
						<div className="mb-2 bg-zinc-50 w-fit p-2 rounded-full">
							<LockKeyhole className="text-black scale-90" />
						</div>
						<CardTitle className="text-3xl font-semibold">Log in</CardTitle>
						<div className="text-zinc-400/80 font-medium text-sm">
							Enter your username and password to access the dashboard.
						</div>
					</CardHeader>

					{/* Email input */}
					<CardContent className="">
						<form
							id="login-form"
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-4"
						>
							{/* <div className="flex flex-col gap-1">
								<FieldLabel className="">Email</FieldLabel>
								<Input
									id="email"
									placeholder="Enter your email"
									type="email"
									{...form.register("email")}
								/>
							</div> */}
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
						<div className="flex flex-col mt-8">
							<Button
								className="btn btn-primary py-4 font-bold text-lg hover:cursor-pointer"
								type="submit"
								form="login-form"
							>
								Submit
							</Button>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
