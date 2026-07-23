"use client";

import { ArrowLeft, Edit, Trash2 } from "lucide-react";
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
			<div className="flex gap-2 space-y-3">
				{/* <div className="flex flex-wrap items-center gap-2">
					<Badge>{user.role}</Badge>
					<Badge variant="outline">{user.name}</Badge>
				</div> */}
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<h1 className="capitalize text-2xl font-semibold tracking-tight sm:text-3xl px-2">
					{user.name}
				</h1>
			</div>
		</header>
	);
}

export function UserProfile({ user }: { user: UserDetail }) {
	return (
		<div className="flex flex-col gap-2">
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
							className="col-span-2"
						>
							{user.email}
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
		</div>
	);
}
