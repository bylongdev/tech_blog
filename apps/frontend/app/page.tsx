"use client";

import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lock, LockKeyhole } from "lucide-react";

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-dvh">
			<main className="flex flex-1 w-full max-w-xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start gap-8">
				{/* Welcome Back things */}
				<div className="flex flex-col items-center justify-center w-full gap-2">
					<h1 className="tracking-[0.3em] font-semibold uppercase dark:text-zinc-400/70">
						Techblog Dashboard
					</h1>
					<h3 className="text-3xl font-semibold">Welcome back</h3>
					<div className="text-sm  dark:text-zinc-400/60">
						Use your account credentials to continue.
					</div>
				</div>
				{/* Login section */}
				<div className="flex flex-col w-full p-6 gap-4 dark:bg-zinc-900/40 rounded-2xl border-2 dark:border-zinc-700/50 ">
					{/* Login header */}
					<div className="flex flex-col">
						<div className="mb-2 bg-zinc-50 w-fit p-2 rounded-full">
							<LockKeyhole className="text-black scale-90" />
						</div>
						<div className="text-3xl font-semibold">Log in</div>
						<div className="text-zinc-400/80 font-medium text-sm">
							Enter your username and password to access the dashboard.
						</div>
					</div>

					{/* Email input */}
					<div className="flex flex-col gap-4 my-2">
						<div className="flex flex-col gap-1">
							<FieldLabel className="">Email</FieldLabel>
							<Input
								placeholder="Enter your email"
								type="email"
							/>
						</div>
						{/* Password input */}
						<div className="flex flex-col gap-1">
							<FieldLabel className="">Password</FieldLabel>
							<Input
								placeholder="Enter your password"
								type="password"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2 mt-8">
						<Button className="btn btn-primary py-4">Log in</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
