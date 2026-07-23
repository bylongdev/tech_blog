"use client";
import React from "react";

import { ArrowLeft, Copy, Check, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserDetail } from "./get-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function DisplayField({
	label,
	children,
	className,
}: {
	label: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={className}>
			<dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
				{label}
			</dt>
			<dd className="mt-1.5 wrap-break-words text-sm">{children}</dd>
		</div>
	);
}

function formatDateTime(value: string | null) {
	if (!value) {
		return "-";
	}

	return new Intl.DateTimeFormat("en-AU", {
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(value));
}

export function UserHeader({ user }: { user: UserDetail }) {
	return (
		<header className="space-y-4">
			<Button
				variant="ghost"
				size="sm"
				render={<Link href="/dashboard/users" />}
				nativeButton={false}
			>
				<ArrowLeft />
				Back to users
			</Button>
			<div className="flex flex-col space-y-2 gap-2">
				<div className="flex gap-2 flex-1">
					<div className="flex flex-1 items-center gap-2">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<h1 className="capitalize text-2xl font-semibold tracking-tight sm:text-3xl px-2">
							{user.name}
						</h1>
					</div>

					<div className="flex gap-2 self-end">
						<Button
							className="flex w-fit"
							render={<Link href={`#`} />}
							nativeButton={false}
						>
							<Edit />
							Edit
						</Button>
						<Button
							variant={"destructive"}
							className="flex w-fit"
							render={<Link href={`#`} />}
							nativeButton={false}
						>
							<Trash2 />
							Delete
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}

export function UserProfile({ user }: { user: UserDetail }) {
	const [isCopy, setIsCopy] = React.useState(false);

	return (
		<Card>
			<CardHeader>
				<CardTitle>User Profile</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
					<DisplayField
						label="Name"
						className="capitalize"
					>
						{user.name}
					</DisplayField>
					<DisplayField label="Role">{user.role}</DisplayField>
					<DisplayField
						label="Email"
						className=" transition-all duration-300 ease-in-out"
					>
						{user.email}
						{isCopy ? (
							<Check className="ml-2 inline-block w-4 h-4" />
						) : (
							<Copy
								className="ml-2 inline-block w-4 h-4 cursor-pointer"
								onClick={() => {
									navigator.clipboard.writeText(user.email);
									setIsCopy(true);
									setTimeout(() => setIsCopy(false), 2000);
								}}
							/>
						)}
					</DisplayField>

					<DisplayField label="Status">
						{user.isActive ? "Active" : "Inactive"}
					</DisplayField>
					<Separator className={"col-span-2"} />

					<DisplayField label="Created At">
						{formatDateTime(user.createdAt)}
					</DisplayField>
					<DisplayField label="Updated At">
						{formatDateTime(user.updatedAt)}
					</DisplayField>
				</dl>
			</CardContent>
		</Card>
	);
}
